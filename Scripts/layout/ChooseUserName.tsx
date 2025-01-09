import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/SignInWithEmailStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChooseUserName({navigation}: {navigation: any})
{

    const [first_name, SetFirstName] = useState("");
    const [last_name, SetLastName] = useState("");

    const isFormValid = first_name.trim() !== '' && last_name.trim() !== '';

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
        <View style={styles.main_view}>

            {/* Back Zone */}
            <TouchableOpacity
                style={styles.backbutton}
                onPress={() => navigation.navigate("SignInScreen")}
            >
                <Icon name="arrow-back-ios" size={22} color="#FFFFFF"/>
            </TouchableOpacity>

            {/* Type Password Zone */}
                <Text style={[styles.getphonezonetitle, {textAlign: 'center'}, {fontSize: 28}]}>Tên bạn là gì?</Text>

                <TextInput  style={styles.input}
                    placeholder="Họ"
                    placeholderTextColor="#888888"
                    onChangeText={SetFirstName}>

                </TextInput>
                    
                <TextInput  style={styles.input}
                    placeholder="Tên"
                    placeholderTextColor="#888888"
                    onChangeText={SetLastName}>

                </TextInput>
                    

            {/* Button Zone */}
            <TouchableOpacity  
                style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
                disabled={!isFormValid}
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
                    <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChooseUserName

function CanSaveUserName(first_name: string , last_name: string)
{
    return first_name.length > 0 && last_name.length > 0;
}