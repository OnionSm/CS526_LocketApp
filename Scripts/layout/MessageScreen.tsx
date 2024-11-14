import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import message_screen_style from "./styles/MessageScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";
import AxiosInstance from "./instance/AxiosInstance";

function MessageScreen({navigation}: {navigation: any})
{
    
    const [messages, setMessages] = useState([]);

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
                <View style={message_screen_style.message_item}> 
                    <View style={message_screen_style.avatar_zone}>
                        <View style={message_screen_style.story_border}>
                            <View style={message_screen_style.invisible_zone}>
                                <Image style={message_screen_style.avatar}
                                source={require('./GUI/DefaultAvatar.jpg')}>
                                </Image> 
                            </View>
                        </View>
                    </View>
                    
                    <View style={message_screen_style.message_item_zone}>
                        <Text style={[{color:"#FFFFFF"}, , {fontSize: 18}, {fontFamily: "SF-Pro-Rounded-Semibold" }, {marginLeft: 10}]}>
                            OnionSm
                        </Text>
                        <Text style={[{color:"#FFFFFF"}, , {fontSize: 16}, {fontFamily: "SF-Pro-Rounded-Semibold"},{marginLeft: 10}]}>
                            This is test message
                        </Text>
                    </View>

                    <View style={message_screen_style.forward_button}>
                        <TouchableOpacity>
                            <Icon name="chevron-right" size={24} color="#FFFFFF" /> 
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            </ScrollView>
        </View>
    )
}

export default MessageScreen