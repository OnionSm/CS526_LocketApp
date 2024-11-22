import { useEffect, useState , useContext} from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import message_screen_style from "./styles/MessageScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";
import AxiosInstance from "./instance/AxiosInstance";
import { UserMessageContext } from "./context/UserMessageContext";
import { Message } from "./types/Message";
import { ConversationRespone } from "./types/ConversationRespone";

function MessageScreen({navigation}: {navigation: any})
{
    const user_message_context = useContext(UserMessageContext);
    const [messages, setMessages] = useState<Array<ConversationRespone> | null>(null);


    useEffect(() => {
        // Tạo hàm async để sử dụng getItem
        const fetchRefreshToken = async () => {
          try {
            const refreshToken = await AsyncStorage.getItem("access_token");
            console.log("access_Token", refreshToken);
          } catch (error) {
            console.error("Error fetching refresh token:", error);
          }
        };
    
        // Gọi hàm async bên trong useEffect
        fetchRefreshToken();
      }, []); // Chạy chỉ một lần khi component mount
    
    const GetMessages = async () => {
        try {
            var response = await AxiosInstance.get("/api/userconversation");
            if (response.status === 200) 
            {
                console.log("message data : ", response.data);
                setMessages(response.data);
            }
            else
            {
                console.log(response.status);
            }
    
            
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            await GetMessages(); 
        };
        fetchMessages();
    }, []);

    

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
            <ScrollView contentContainerStyle={message_screen_style.message_zone}
            >

                {user_message_context != null && Array.isArray(messages) && messages.length > 0 ? (
                messages
                .sort((a, b) => {
                    const dateA = new Date(a.updatedAt).getTime();  // Chuyển đổi thành số
                    const dateB = new Date(b.updatedAt).getTime();  // Chuyển đổi thành số
                    return dateB - dateA; // Thực hiện phép trừ giữa các giá trị thời gian
                })
                .map((message, index) => (
                    <View key={message.id} style={message_screen_style.message_item}>
                        <View style={message_screen_style.avatar_zone}>
                            <View style={message_screen_style.story_border}>
                                <View style={message_screen_style.invisible_zone}>
                                    <Image style={message_screen_style.avatar} source={require('./GUI/DefaultAvatar.jpg')} />
                                </View>
                            </View>
                        </View>
                        
                        <View style={message_screen_style.message_item_zone}>
                            <Text style={[{ color: "#FFFFFF" }, { fontSize: 18 }, { fontFamily: "SF-Pro-Rounded-Semibold" }, { marginLeft: 10 }]}>
                                {message.groupName.toString()}
                            </Text>
                            <Text style={[{ color: "#FFFFFF" }, { fontSize: 16 }, { fontFamily: "SF-Pro-Rounded-Semibold" }, { marginLeft: 10 }]}>
                                {message.lastMessage && message.lastMessage.content ? message.lastMessage.content : "No message"}
                            </Text>
                        </View>

                        <View style={message_screen_style.forward_button}>
                            <TouchableOpacity onPress={() => {
                                user_message_context.ChooseFriendMessage(message.id, message.groupName);
                                navigation.navigate("PersonalChatScreen");
                            }}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
                ) : (
                <Text>No messages available</Text>  // Optional fallback if messages is empty or not an array
                )}

                
            </ScrollView>
        </View>
    )
}

export default MessageScreen