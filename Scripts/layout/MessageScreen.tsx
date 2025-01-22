import { useEffect, useState , useContext} from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import message_screen_style from "./styles/MessageScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";
import AxiosInstance from "./instance/AxiosInstance";
import { UserMessageContext } from "./context/UserMessageContext";
import { Message } from "./types/Message";
import { ConversationRespone } from "./types/ConversationRespone";
import ConversationItem from "./components/ConversationItem";
import { FriendDataContext } from "./context/FriendDataContext";
import { FriendData } from "./types/FriendData";
import { UserDataContext } from "./context/UserDataContext";


function MessageScreen({navigation}: {navigation: any})
{
    const user_message_context = useContext(UserMessageContext);
    const friend_data_context = useContext(FriendDataContext);
    const user_data_context = useContext(UserDataContext);
    const [messages, setMessages] = useState<Array<ConversationRespone> | null>(null);

    const choose_conversation = (item : any) =>
    {
        user_message_context.set_conversation_choosen(item);
        console.log("CHOOSE", item);
        navigation.navigate("PersonalChatScreen");
    }
    


    // useEffect(() => {
    //     // Tạo hàm async để sử dụng getItem
    //     const fetchRefreshToken = async () => {
    //       try {
    //         const refreshToken = await AsyncStorage.getItem("access_token");
    //         console.log("access_Token", refreshToken);
    //       } catch (error) {
    //         console.error("Error fetching refresh token:", error);
    //       }
    //     };
    
    //     // Gọi hàm async bên trong useEffect
    //     fetchRefreshToken();
    //   }, []); // Chạy chỉ một lần khi component mount
    
    // const GetMessages = async () => {
    //     try 
    //     {
    //         var response = await AxiosInstance.get("/api/userconversation");
    //         if (response.status === 200) 
    //         {
    //             console.log("message data : ", response.data);
    //             setMessages(response.data);
    //         }
    //         else
    //         {
    //             console.log(response.status);
    //         }
    
            
    //     } catch (error) {
    //         console.error('Error fetching messages:', error);
    //     }
    // };

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         await GetMessages(); 
    //     };
    //     fetchMessages();
    // }, []);

    
    

    return(
        <View style={message_screen_style.main_view}>
            <View style={message_screen_style.title_zone}>
                <TouchableOpacity style={message_screen_style.backbutton} onPress={()=>{
                    navigation.pop()}}>
                    <Icon name="chevron-left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
                <Text style={[{color:"#FFFFFF"}, , {fontSize: 20}, {fontFamily: "SF-Pro-Rounded-Semibold"}]}>Messages</Text>
                <TouchableOpacity style={[message_screen_style.backbutton, {opacity:0}]}>
                    <Icon name="chevron-left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>
            
            <View style={message_screen_style.message_zone}>
                {user_message_context.user_conversations !== null && 
                user_message_context.user_conversations !== undefined ? (
                    <FlatList
                    data={user_message_context.user_conversations.userConversations} // Dữ liệu đầu vào
                    keyExtractor={(item) => item.id} // Khóa duy nhất cho từng mục
                    renderItem={({ item }) => {
                        // Tìm friend_id
                        let friend_id = "";
                        item.participants.forEach((participant: any) => 
                        {
                            if (participant !== user_data_context.user_id) 
                            {
                                friend_id = participant;
                            }
                        });

                        let userAvatarURL = "";
                        let first_name = "";
                        let last_name = "";

                        // Tìm thông tin bạn bè từ `us` (giả sử `us` là một mảng chứa thông tin người dùng)
                        const friend = friend_data_context.data_friend.find((u: FriendData) => u.id === friend_id);
                        if (friend) 
                        {
                        userAvatarURL = friend.avatar;
                        first_name = friend.first_name;
                        last_name = friend.last_name;
                        }

                        return (
                        <ConversationItem
                            user_avt_uri={userAvatarURL}
                            firstname={first_name}
                            lastname={last_name}
                            message={item?.lastMessage?.content}
                            time={item?.lastMessage?.sendAt}
                            choose_conversation={()=> {choose_conversation(item)}}
                        />
                        );
                    }}
                    />
                ) : (
                    <Text style={[{color: "#FFFFFF"}, {fontFamily: "SF-Pro-Rounded-Semibold"}, {fontSize: 18}, {alignSelf: "center"}]}>Không có tin nhắn</Text>
                )}
                
            </View>
            



        </View>
    )
}

export default MessageScreen