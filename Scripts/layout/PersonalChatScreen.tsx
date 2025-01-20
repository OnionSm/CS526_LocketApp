import { useEffect, useState, useContext} from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";
import AxiosInstance from "./instance/AxiosInstance";
import personal_chat_style from "./styles/PersonalChatStyle";
import { UserMessageContext } from "./context/UserMessageContext";
import { Conversation } from "./types/Conversation";
import { jwtDecode } from "jwt-decode";
import { FriendDataContext } from "./context/FriendDataContext";
import { FriendData } from "./types/FriendData";
import { UserDataContext } from "./context/UserDataContext";
import UserAvatar from 'react-native-user-avatar';
import MessageItem from "./components/MessageItem";
import { Message } from "./types/Message";
import { GET_LIST_LATEST_MESSAGE_COOLDOWN } from "@env";
import { networkService } from './common/networkService';
import { StoryDataContext } from "./context/StoryDataContext";
import { Story } from "./types/Story";
import { SqliteDbContext } from "./context/SqliteDbContext";

const data = {
  friend_avatar: "https://cdn.vinaenter.edu.vn/wp-content/uploads/2024/10/meme-meo-liec-1.jpg",
  list_message: [
    { id: '1', title: 'Item 1', sender:"0" },
    { id: '2', title: 'Đây là tin nhắn thử nghiệm cho tính năng chat của locket', sender:"1" },
    { id: '3', title: 'Item 3', sender:"0" },
    { id: '4', title: 'Item 3', sender:"0" },
    { id: '5', title: 'Đây là tin nhắn thử nghiệm cho tính năng chat của locket', sender:"0" },
  ]
};


type ItemProps = 
{
  title: string,
  sender: string,
  friend_avt : string,
  user_id: string
};

interface CustomJwtPayload 
{
  UserId: string;  // Thêm các thuộc tính khác nếu cần
  iat?: number;    // Thời gian phát hành token
  exp?: number;    // Thời gian hết hạn token
}
// Hàm sắp xếp theo sendAt
const sortMessagesBySendAt = (messages: any[]) => {
  return messages.sort((a, b) => {
    const dateA = a?.sendAt ? new Date(a.sendAt).getTime() : 0;
    const dateB = b?.sendAt ? new Date(b.sendAt).getTime() : 0;
    return dateA - dateB;
  });
};

function PersonalChatScreen({navigation}: {navigation: any})
{
  const user_message_context = useContext(UserMessageContext);
  const friend_data_context = useContext(FriendDataContext);
  const user_data_context = useContext(UserDataContext);
  const story_data_context = useContext(StoryDataContext);
  const sqlite_db_context = useContext(SqliteDbContext);

// ----------------------------- GET FRIEND DATA ---------------------------------------
  const [friend_avt, set_friend_avt] = useState("");
  const [friend_first_name, set_friend_first_name] = useState("");
  const [friend_last_name, set_friend_last_name] = useState("");

  useEffect(() => 
  {
    const get_friend_data = async () =>
    {
      if (!user_message_context.conversation_choosen?.participants) 
      {
        console.error("Participants not available.");
        return;
      }
  
      let friend_id = "";
      user_message_context.conversation_choosen.participants.forEach((participant: any) => {
        if (participant !== user_data_context.user_id) 
        {
          friend_id = participant;
        }
      });
  
      const friend = friend_data_context.data_friend.find((u: FriendData) => u.id === friend_id);
      if (friend) 
      {
        set_friend_avt(friend.avatar);
        set_friend_first_name(friend.first_name);
        set_friend_last_name(friend.last_name);
      }
    };
    get_friend_data();
  }, [user_message_context.conversation_choosen, friend_data_context.data_friend, user_data_context.user_id]); 

// ------------------------------------------------------------------------------------------------------------------

// Hàm này dùng để lấy các tin nhắn mới nhất của user dựa trên tin nhắn mới nhất hiện tại trên locallocal
const get_list_latest_message = async () => 
  {
    try 
    {
      if (!user_message_context.conversation_choosen) 
      {
        console.error("No conversation chosen.");
        return;
      }

      const form_data = new FormData();
      var latest_message_id = "all";
      if(user_message_context.conversation_choosen?.id === null)
      {
        console.log("Nothing");
        return;
      }
      else
      {
        console.log("CURRENT ALL MESSAGE", user_message_context.all_user_message);
        const selectedConversation = user_message_context.all_user_message?.userConversations?.find(
          (c: Conversation) => c.id === user_message_context.conversation_choosen?.id
        );

        // console.log("----------------- SELECTED CONVERSATION", selectedConversation);
        if(selectedConversation !== null && selectedConversation !== undefined)
        {
          latest_message_id = selectedConversation?.lastMessage?.id;
        }
        else
        {
          latest_message_id = "all";
        }
      }
      form_data.append("conversation_id", user_message_context.conversation_choosen.id);
      form_data.append(
        "message_id",
        latest_message_id        
      );
      console.log("FORM DATA", form_data);
      
      const res = await AxiosInstance.post("api/userconversation/get_list_latest_message", form_data, 
      {
        headers: 
        {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.status === 200) 
      {
        console.log("------------ DATA RESPONE", res.data.userConversations[0].lastMessage);
        const newConversation = res.data.userConversations[0]; // Lấy cuộc hội thoại từ kết quả API
        const existingConversations = user_message_context.all_user_message?.userConversations || [];
        let isExisting = false;
      
        // Kiểm tra và cập nhật danh sách hội thoại
        const updatedConversations = existingConversations.map((conversation: Conversation) => {
          if (conversation.id === newConversation.id) 
          {
            isExisting = true;
      
            // Thêm tin nhắn mới và sắp xếp lại theo sendAt
            const updatedMessages = [
              ...conversation.listMessages,
              ...newConversation.listMessages,
            ];
      
            return {
              ...conversation,
              listMessages: sortMessagesBySendAt(updatedMessages),
              lastMessage: res.data.userConversations[0].lastMessage
            };
          }
          return conversation;
        });
      
        // Nếu cuộc hội thoại chưa tồn tại, thêm vào danh sách
        if (!isExisting) 
        {
          updatedConversations.push({
            ...newConversation,
            listMessages: sortMessagesBySendAt(newConversation.listMessages), // Sắp xếp tin nhắn
          });
        }
        else
        {
          console.log("--------- TIN NHẮN KHÔNG KHÁC NHAU --------");
        }
      
        // Cập nhật lại danh sách hội thoại (đảm bảo danh sách hội thoại cũng sắp xếp theo tin nhắn gần nhất)
        const sortedConversations = updatedConversations.sort((a: any, b: any) => {
          const lastMessageA = a.listMessages[a.listMessages.length - 1]?.sendAt;
          const lastMessageB = b.listMessages[b.listMessages.length - 1]?.sendAt;
        
          // Nếu không có tin nhắn, đưa cuộc hội thoại đó xuống cuối
          if (!lastMessageA) return -1;
          if (!lastMessageB) return 1;
        
          // Sắp xếp sao cho tin nhắn mới nhất nằm ở cuối danh sách
          return new Date(lastMessageA).getTime() - new Date(lastMessageB).getTime();
        });
      
        console.log("-------------------------- UPDATED CONVERSATIONS", sortedConversations);
        const check = JSON.stringify(user_message_context.all_user_message?.userConversations) !== JSON.stringify(sortedConversations)
        if (check) 
        {
          user_message_context.set_all_user_message({
            ...user_message_context.all_user_message,
            userConversations: sortedConversations,
          });

          sqlite_db_context.db.transaction((tx: any) =>
          {
            // Chèn hoặc cập nhật từng bản ghi
            res.data.userConversations.forEach((conversation: any) => {
              const {
                  id: conversation_id,
                  lastMessage,
                  createdAt,
                  updatedAt,
                  participants,
              } = conversation;

              // Chèn dữ liệu vào bảng Conversation
              tx.executeSql(
                  `INSERT OR REPLACE INTO Conversation 
                      (user_id, conversation_id, last_message_id, created_at, updated_at) 
                      VALUES (?, ?, ?, ?, ?)`,
                  [
                      user_data_context.user_id,
                      conversation_id,
                      lastMessage?.id || null,
                      createdAt,
                      updatedAt,
                  ],
                  () => console.log(`Conversation ${conversation_id} processed.`),
                  (error: any) =>
                      console.error(`Error adding/updating conversation ${conversation_id}:`, error)
              );
              
              res.data.userConversations?.listMessages.forEach((message: any) =>
              {
                tx.executeSql(
                    `INSERT OR REPLACE INTO Message
                        (user_id, message_id, conversation_id, sender_id, content, status, send_at, reply_to_story_id)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        user_data_context.user_id,
                        message.id,
                        message.conversationId,
                        message.senderId,
                        message.content,
                        message.status,
                        message.sendAt,
                        message.replyToStoryId || null,
                    ],
                    () => console.log(`Message ${message.id} processed.`),
                    (error: any) =>
                        console.error(`Error adding/updating message ${message.id}:`, error)
                );
              });

              // Chèn dữ liệu vào bảng ConversationParticipant
              participants.forEach((participant: string) => {
                  tx.executeSql(
                      `INSERT OR REPLACE INTO ConversationParticipant
                          (user_id, conversation_id, participant_id)
                          VALUES (?, ?, ?)`,
                      [user_data_context.user_id, conversation_id, participant],
                      () =>
                          console.log(
                              `Participant ${participant} added to conversation ${conversation_id}.`
                          ),
                      (error: any) =>
                          console.error(
                              `Error adding participant ${participant} to conversation ${conversation_id}:`,
                              error
                          )
                  );
              });
          });
          });
        }
      } 
      else 
      {
        console.log("RES STATUS", res.status);
      }
    } 
    
    catch (error) 
    {
      console.error("Failed to fetch latest messages:", error);
    }
  };
  
  useEffect(() => 
  {
    const intervalListMessage = setInterval(async () => 
    {
      const network_check = await networkService.checkNetwork();
      if (network_check) 
      {
        await get_list_latest_message();
      }
    }, Number(GET_LIST_LATEST_MESSAGE_COOLDOWN));
  
    return () => clearInterval(intervalListMessage);
  }, [
    user_message_context.conversation_choosen, 
    user_message_context.all_user_message,
    friend_data_context.data_friend
  ]); // Add all required dependencies


  const [messages, setMessages] = useState<Conversation | null> (null);
  const [input_message, setInputMessage] = useState("");
  const [send_button_state, set_send_button_state] = useState(false); 

  useEffect(() => 
  {
    set_send_button_state(input_message.length > 0);
  }, [input_message]);

  const send_message = async () =>
  {
    try
    {
      var form_data = new FormData();
      form_data.append("ConversationId", user_message_context.conversation_choosen.id);
      form_data.append("Content", input_message);
      var res = await AxiosInstance.post("api/message", form_data,
        {
          headers: 
          {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if(res.status === 201)
      {
        console.log("Gửi tin nhắn thành công");
      }
      else
      {
        Alert.alert("Lỗi", "Không thể gửi tin nhắn.");
      }
    }
    catch(error)
    {
      Alert.alert("Lỗi", "Không thể gửi tin nhắn.");
    }
  }

  const getStoryById = (id: string | undefined) => 
  {
    if (!id) return null; // Trả về null nếu id không tồn tại
    return story_data_context.list_story?.find((story: Story) => story.story_id === id) || null;
  };

  return(
      <View style={personal_chat_style.main_view}>
          <View style={personal_chat_style.header_zone}>
              <TouchableOpacity style={personal_chat_style.backbutton} onPress={()=>{
                      navigation.pop()}}>
                      <Icon name="chevron-left" size={24} color="#FFFFFF" /> 
              </TouchableOpacity>
              <View style={personal_chat_style.avatar_and_name}>
                {friend_avt === undefined && friend_avt === null && friend_avt !== "" ? (
                  <Image 
                  source={{uri: friend_avt}}
                  style={personal_chat_style.avatar}/>
                ) : (
                  <UserAvatar size={35} name={`${friend_first_name} ${friend_last_name}`} 
                  style={[
                  personal_chat_style.avatar, 
                  {marginTop: 5}, {marginLeft: 5}, {marginRight: 5}
                  ]}/>
                )}
                
                <Text style={personal_chat_style.name}>
                  {friend_first_name} {friend_last_name}
                </Text>
              </View>
              
              <Text style={[personal_chat_style.name, {opacity:0}]}>
                  Onion
              </Text>
          </View>

          <View style={personal_chat_style.message_container_view}>
          {
            user_message_context.all_user_message?.userConversations?.find(
              (c: Conversation) => c.id === user_message_context.conversation_choosen?.id
            )?.listMessages?.length > 0 ? (
              <FlatList
                data={
                  (() => {
                    const selectedConversation = user_message_context.all_user_message?.userConversations?.find(
                      (c: Conversation) => c.id === user_message_context.conversation_choosen?.id
                    );
                    return selectedConversation ? selectedConversation.listMessages : [];
                  })()
                }
                renderItem={({ item }) => (
                  <MessageItem
                    sender_id={item.senderId}
                    friend_avt={friend_avt}
                    friend_first_name={friend_first_name}
                    friend_last_name={friend_last_name}
                    story={getStoryById(item.replyToStoryId)} // Tìm story theo id
                    message={item.content}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text style={[{color: "#FFFFFF"}, {fontFamily: "SF-Pro-Rounded-Semibold"}, {fontSize: 18}, {alignSelf: "center"}]}>Không có tin nhắn</Text>
            )
          }
          </View>
          
          <View style={personal_chat_style.send_message_zone}>
              <View style={personal_chat_style.smz_background}>
                <TextInput style = {personal_chat_style.message_text} placeholder="Gửi tin nhắn" 
                placeholderTextColor={"#AAAAAA"}
                value={input_message}
                onChangeText={setInputMessage}></TextInput>
                <TouchableOpacity style={[personal_chat_style.send_button, send_button_state ? personal_chat_style.background_enable: personal_chat_style.background_unenable]} 
                onPress={ async ()=>{ 
                  send_message();
                  setInputMessage("");
                }}
                disabled={!send_button_state}>
                    <Icon name="send" size={24} color = {send_button_state ? personal_chat_style.icon_enable.color : personal_chat_style.icon_unenable.color}/> 
                </TouchableOpacity>
              </View>
          </View>
      </View>
  )
}

export default PersonalChatScreen