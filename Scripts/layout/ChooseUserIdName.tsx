import { useEffect, useState } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import choose_username_style from './styles/ChooseUserNameStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONNECTION_IP } from '@env';


const saveToken = async (access_token: string, refresh_token: string) => {
    try {
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        console.log("Lưu token thành công");
    } catch (error) {
        console.log("Không thể lưu token", error);
    }
}


function ChooseUserIdName({navigation}: {navigation: any})
{

    const [user_id_name, SetUserIdName] = useState("");
    const [register_email, SetEmail] = useState("");
    const [register_password, SetPassword] = useState("");
    const [register_firstname, SetFirstName] = useState("");
    const [register_lastname, SetLastName] = useState("");

    useEffect(() =>{
        const LoadRegisterData = async () =>
        {
            try
            {
                const r_email = await AsyncStorage.getItem("sign_up_email");
                const r_password = await AsyncStorage.getItem("sign_up_password");
                const r_first_name = await AsyncStorage.getItem("first_name");
                const r_last_name = await AsyncStorage.getItem("last_name");
                if(r_email == null || r_password == null || r_first_name == null || r_last_name == null)
                {
                    console.log("Không thể lấy data đăng kí người dùng")
                }
                else
                {
                    SetEmail(r_email);
                    SetPassword(r_password);
                    SetFirstName(r_first_name);
                    SetLastName(r_last_name);
                    console.log("Lấy data đăng kí thành công");
                }
            }
            catch(error)
            {
                console.log("Không thể lấy dữ liệu đăng kí tài khoản");
            }
        };
        LoadRegisterData();
    }, []);
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
                <Text style={choose_username_style.getusernamezonetitle}>Thêm một tên người dùng</Text>

                <View style ={choose_username_style.inputzone}>
                    <TextInput  style={[choose_username_style.inputzonetext]}
                        placeholder="Tên người dùng"
                        placeholderTextColor="#888888"
                        value={user_id_name}
                        onChangeText={n => SetUserIdName(n)}>

                    </TextInput>
                    
                </View>
            </View>

            {/* Button Zone */}
            <View style={choose_username_style.buttonzone}>
                <TouchableOpacity style={choose_username_style.continuebutton}
                onPress={async () => 
                {
                    try
                    {
                        const result = await CreateAccount(user_id_name,
                            register_firstname,
                            register_lastname,
                            register_email, 
                            register_password
                        )
                        console.log(result);
                        if(result)
                        {
                            const result_login = await Login(register_email, register_password);
                            if(result_login)
                            {
                                navigation.navigate("AddFriendScreen");
                            }
                            else
                            {
                                console.log("Xác thực tài khoản đã đăng kí thất bại");
                            }
                        }
                        else
                        {
                            console.log("Không thể tạo tài khoản");
                        }
                    }
                    catch(error)
                    {
                        console.log(`Có lỗi xảy ra trong quá trình đăng kí, ${error}`);
                    }
                    
                }
                }>
                    <Text style ={choose_username_style.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChooseUserIdName

async function CreateAccount(
    public_user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
): Promise<boolean> {
    
        // Tạo FormData và thêm các trường dữ liệu vào form
        const formData = new FormData();
        formData.append('PublicUserId', public_user_id);
        formData.append('FirstName', first_name);
        formData.append('LastName', last_name);
        formData.append('Email', email);
        formData.append('Password', password);
        console.log(formData)

    try
    {
        // Gửi yêu cầu POST với FormData
        const response = await fetch(`http://${CONNECTION_IP}:5115/api/user/create`, {
            method: 'POST',
            body: formData,
        });

        // Kiểm tra phản hồi từ server
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Phân tích JSON phản hồi từ server
        const responseData = await response.json();

        // Trả về true nếu phản hồi chứa thông tin thành công
        if (responseData) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`Có lỗi xảy ra trong quá trình đăng ký: ${error}`);
        return false;
    }
}



async function Login(email: string, password : string) 
{
    const formData = new FormData();
    formData.append('Email', email);
    formData.append("Password",password);

    console.log(formData);

    try {
        const response = await fetch(`http://${CONNECTION_IP}:5115/api/login/email`, 
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
            console.log(data.accessToken);
            console.log(data.refreshToken);
            await saveToken(data.accessToken, data.refreshToken);
        }
        return data;
    } 
    catch (error) 
    {
        console.error('Error fetching data:', error);
    }
}
