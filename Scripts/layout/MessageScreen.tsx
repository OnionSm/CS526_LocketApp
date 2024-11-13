import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import message_screen_style from "./styles/MessageScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";

function MessageScreen({navigation}: {navigation: any})
{
    
    
    const [messages, setMessages] = useState([]);

   
    const GetMessages = async () => {
        try {

            const token = await AsyncStorage.getItem("access_token");
    
            const response = await fetch('http://10.0.2.2:5115/api/userconversation', {
                method: 'GET', // Hoặc 'POST' tùy theo API
                headers: {
                    'Authorization': `Bearer ${token}`, // Thêm token vào header
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


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