import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import message_screen_style from "./styles/MessageScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as signalR from "@microsoft/signalr";
import AxiosInstance from "./instance/AxiosInstance";

const MessageItem = ()=>
{
    return(
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
    );
}

export default MessageItem