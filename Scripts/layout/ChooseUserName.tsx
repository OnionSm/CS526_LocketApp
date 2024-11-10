import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import choose_username_style from './styles/ChooseUserNameStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChooseUserName({navigation}: {navigation: any})
{

    const [first_name, SetFirstName] = useState("");
    const [last_name, SetLastName] = useState("");

    const SaveUserName = async () =>
    {
        try
        {
            await AsyncStorage.setItem("first_name", first_name);
            await AsyncStorage.setItem("last_name", last_name);
            console.log("Lưu tên người dùng thành công");
        }
        catch(error)
        {
            console.log("Không thể lưu tên người dùng");
        }
    }

    return(
        <View style={choose_username_style.main_view}>
            {/* Back Zone */}
            <View style={choose_username_style.backzone}>
                {/* <TouchableOpacity style={choose_username_style.backbutton}>
                    <Icon name="left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity> */}
            </View>

            {/* Type Password Zone */}
            <View style={choose_username_style.getusernamezone}>
                <Text style={choose_username_style.getusernamezonetitle}>Tên bạn là gì?</Text>

                <View style ={choose_username_style.inputzone}>
                    <TextInput  style={choose_username_style.inputzonetext}
                        placeholder="Họ"
                        placeholderTextColor="#888888"
                        value={first_name}
                        onChangeText={n => SetFirstName(n)}>

                    </TextInput>
                    
                </View>
                <View style ={choose_username_style.inputzone}>
                    <TextInput  style={choose_username_style.inputzonetext}
                        placeholder="Tên"
                        placeholderTextColor="#888888"
                        value={last_name}
                        onChangeText={n => SetLastName(n)}>

                    </TextInput>
                    
                </View>
            </View>

            {/* Button Zone */}
            <View style={choose_username_style.buttonzone}>
                <TouchableOpacity style={choose_username_style.continuebutton}
                onPress={async () => 
                {
                    if(CanSaveUserName(first_name, last_name))
                    {
                        await SaveUserName();
                        navigation.navigate("ChooseUserIdName");
                    }
                    else
                    {
                        console.log("Có lỗi trong quá trình xử lí");
                    }
                }
                }>
                    <Text style ={choose_username_style.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChooseUserName

function CanSaveUserName(first_name: string , last_name: string)
{
    return first_name.length > 0 && last_name.length > 0;
}