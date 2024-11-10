import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import official_story_style from "./styles/OfficialStoryStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OfficialStory({navigation}: {navigation: any})
{

    const [user_id_name, SetUserIdName] = useState("");
    
    const SaveUserName = async () =>
    {
        try
        {
            await AsyncStorage.setItem("first_name", user_id_name);
            console.log("Lưu tên người dùng thành công");
        }
        catch(error)
        {
            console.log("Không thể lưu tên người dùng");
        }
    }

    return(
        <View style={official_story_style.main_view}>
            <View style={official_story_style.main_zone}>
            <View style={official_story_style.user_id_zone}>
                <Text style={official_story_style.user_id_text}>OnionSm</Text>
            </View>
                <Text style={official_story_style.main_title}>Tin chính thức!</Text>
                <Text style={[{color : "#949494"},
                    {fontFamily: "SF-Pro-Rounded-Semibold"},
                    {fontSize :18},
                    {marginLeft: 30},
                    {marginRight: 30},
                    {marginTop: 15},
                    {marginBottom: 20}
                ]}>Bạn bè của bạn hiện đã có thể thêm bạn bằng cách tìm tên người dùng của bạn</Text>
                <TouchableOpacity style ={official_story_style.share_button_zone}>
                    <Icon style={official_story_style.share_icon} name="share" size={24} color="#FFFFFF" /> 
                    <Text style={official_story_style.share_zone_text}>Chia sẻ tên người dùng</Text>
                </TouchableOpacity>     
            </View>

            {/* Button Zone */}
            <View style={official_story_style.buttonzone}>
                <TouchableOpacity style={official_story_style.continuebutton}
                onPress={async () => 
                {
                    // if(CanSaveUserName(first_name, last_name))
                    // {
                    //     await SaveUserName();
                    // }
                    // else
                    // {
                    //     console.log("Có lỗi trong quá trình xử lí");
                    // }
                }
                }>
                    <Text style ={official_story_style.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OfficialStory

function CanSaveUserName(first_name: string , last_name: string)
{
    return first_name.length > 0 && last_name.length > 0;
}