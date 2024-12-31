import React, { useEffect } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import change_password_styles from './styles/ChoosePasswordStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserData = async (data: any) => {
    try {
        await AsyncStorage.setItem("first_name", data.user.firstName);
        await AsyncStorage.setItem("last_name", data.user.lastName);
        await AsyncStorage.setItem("email", data.user.email);
        await AsyncStorage.setItem("public_user_id", data.user.publicUserId);
        await AsyncStorage.setItem("phone_number", data.user.phoneNumber);
        await AsyncStorage.setItem("user_avatar_url", data.user.userAvatarURL);
        await AsyncStorage.setItem("list_friends", JSON.stringify(data.user.friends));
        await AsyncStorage.setItem('access_token', data.token.accessToken);
        await AsyncStorage.setItem("refresh_token", data.token.refreshToken);
        console.log("Lưu token thành công");
    } 
    catch (error) 
    {
        console.log("Không thể lưu token", error);
    }
}

function ChoosePassword({ navigation }: {navigation: any })
{
    const [login_email, setEmail] = useState("");
    const [input_password, SetPassword] = useState("");
    
    useEffect(() =>{
        const LoadEmail = async () =>
        {
            const savedEmail = await AsyncStorage.getItem('login_email');
            if(savedEmail)
            {
                setEmail(savedEmail);
            }
        }
        LoadEmail();
    }, []);

    
    

    return(
        <View style={change_password_styles.main_view}>
            {/* Back Zone */}
            <View style={change_password_styles.backzone}>
                <TouchableOpacity style={change_password_styles.backbutton}
                onPress={() => navigation.navigate("SignInWithEmail")}>
                    <Icon name="arrow-back-ios" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Type Password Zone */}
            <View style={change_password_styles.getpasswordzone}>
                <Text style={change_password_styles.getpasswordzonetitle}>Chọn mật khẩu đăng nhập</Text>

                <View style ={change_password_styles.inputzone}>
                    <TextInput  style={change_password_styles.inputzonetext}
                        value={input_password} 
                        onChangeText={e => SetPassword(e)}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#888888"
                        secureTextEntry={true}>

                    </TextInput>
                    
                </View>
                <Text style={change_password_styles.passwordguide}>Mật khẩu phải có ít nhất 8 kí tự</Text>
            </View>

            {/* Button Zone */}
            <View style={change_password_styles.buttonzone}>
                <TouchableOpacity style={change_password_styles.continuebutton}
                onPress={async() => 
                {
                    var data = await Login(login_email, input_password);
                    if(!data)
                    {
                        console.log("Mật khẩu không chính xác xin vui lòng thử lại");
                    }
                    else
                    {
                        navigation.navigate("MainScreen");
                    }
                    
                }
                }>
                    <Text style ={change_password_styles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChoosePassword

async function Login(email: string, password : string) 
{
    const formData = new FormData();
    formData.append('Email', email);
    formData.append("Password",password);

    console.log(formData);

    try {
        const response = await fetch('http://10.0.2.45:5115/api/login/email', 
            {
            method: 'POST',
            body: formData, 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();  // Chờ phản hồi JSON
        if(data != null)
        {
            console.log(data.token.accessToken);
            console.log(data.token.refreshToken);
            await saveUserData(data);
        }
        return data;
    } 
    catch (error) 
    {
        console.error('Error fetching data:', error);
    }
}



