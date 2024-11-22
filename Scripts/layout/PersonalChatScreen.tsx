import { useEffect, useState, useContext} from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";
import AxiosInstance from "./instance/AxiosInstance";
import personal_chat_style from "./styles/PersonalChatStyle";
import { UserMessageContext } from "./context/UserMessageContext";
import { Conversation } from "./types/Conversation";
import { jwtDecode } from "jwt-decode";



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



  type ItemProps = {
    title: string,
    sender: string,
    friend_avatar : string,
    user_id: string
  };

  const MessageItem = ({title, sender , friend_avatar, user_id}: ItemProps) => (
    <View style={[personal_chat_style.message_item, {justifyContent : sender === user_id ? "flex-end" : "flex-start"}]}>
      {sender !== user_id ? (
      <Image 
          source={{ uri: friend_avatar }}
          style={[personal_chat_style.avatar, {marginTop: 5}, {marginLeft : 5}, {marginRight: 5}]}
      />
      ) : null}
      <View style={sender === user_id ? personal_chat_style.message_background_user : personal_chat_style.message_background_friend}>
        <Text style={[sender === user_id ? personal_chat_style.messsage_style_user : personal_chat_style.messsage_style_friend]}>{title}</Text>
      </View>
      
    </View>
  );

  interface CustomJwtPayload {
    UserId: string;  // Thêm các thuộc tính khác nếu cần
    iat?: number;    // Thời gian phát hành token
    exp?: number;    // Thời gian hết hạn token
  }

function PersonalChatScreen({navigation}: {navigation: any})
{
    const user_message_context = useContext(UserMessageContext);
    const [AvatarUrl, setAvatarUrl] = useState("https://cdn.vinaenter.edu.vn/wp-content/uploads/2024/10/meme-meo-liec-1.jpg");
    const [messages, setMessages] = useState<Conversation | null> (null);
    const [user_id, setUserId] = useState<string|null>();
    const [friend_name, setFriendName] = useState();
    const [input_message, setInputMessage] = useState("");

    useEffect(()=>{
      const GetUserId = async () =>
      {
        try
        {
          let access_token = await AsyncStorage.getItem("access_token");
          if (access_token) 
          {
              const new_decodedToken = jwtDecode<CustomJwtPayload>(access_token);
              setUserId(new_decodedToken.UserId.toString());
          }
        }
        catch(error)
        {
          console.log("Error when get user id", "")
        }
      }
      GetUserId();
    }, []);

    const SendMessage = async () =>
    {
      try
      {
        const formData = new FormData();
        formData.append("ConversationId", user_message_context?.friend);
        formData.append("Content", input_message)
        var response = await AxiosInstance.post(`api/message`,formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      });
        if (response.status === 200) 
          {
              //console.log("Respone data when send messsage", response.data);
          }
      }
      catch(error)
      {
        console.log("error khi gửi tin nhắn : ", error);
        return;
      }
    }

    useEffect(()=>
    {
      const GetMessages = async () =>
      {
        try 
        {
          if(user_message_context == null)
          {
            return;
          }
          var response = await AxiosInstance.get(`/api/userconversation/conversation/${user_message_context.friend}`);

          if (response.status === 200) 
          {
              //console.log("Message : ", response.data);
              setMessages(response.data);
          }
          else
          {
              //console.log(response.status);
          }
        } 
        catch (error) 
        {
            console.error('Error fetching messages:', error);
        }
      }
      GetMessages();
    }, [messages])
    return(
        <View style={personal_chat_style.main_view}>
            <View style={personal_chat_style.header_zone}>
                <TouchableOpacity style={personal_chat_style.backbutton} onPress={()=>{
                        navigation.pop()}}>
                        <Icon name="chevron-left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
                <View style={personal_chat_style.avatar_and_name}>
                    <Image 
                    source={{uri: AvatarUrl}}
                    style={personal_chat_style.avatar}/>
                    <Text style={personal_chat_style.name}>
                        {user_message_context?.friend_name}
                    </Text>
                </View>
                
                <Text style={[personal_chat_style.name, {opacity:0}]}>
                    Onion
                </Text>
                
            </View>
            {messages != null && user_id != null? 
            (
            <FlatList
              data={messages.listMessages} 
              renderItem={({ item }) => (
                <MessageItem 
                  title={item.content} 
                  sender={item.senderId} 
                  friend_avatar={data.friend_avatar} 
                  user_id={user_id}
                />
              )}
              keyExtractor={item => item.id} 
            />
            ) : (
              <Text>No messages available</Text>
            )}
            <View style={personal_chat_style.send_message_zone}>
                <View style={personal_chat_style.smz_background}>
                  <TextInput style = {personal_chat_style.message_text} placeholder="Gửi tin nhắn" 
                  placeholderTextColor={"#AAAAAA"}
                  value={input_message}
                  onChangeText={setInputMessage}></TextInput>
                  <TouchableOpacity style={personal_chat_style.send_button} onPress={async ()=>{ await SendMessage()
                       }}>
                        <Icon name="send" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

export default PersonalChatScreen