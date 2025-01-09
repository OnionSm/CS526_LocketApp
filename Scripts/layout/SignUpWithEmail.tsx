import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import sign_in_with_email_styles from './styles/SignInWithEmailStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import sign_in_with_email from './frontend_logic/sign_in_with_email';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from './instance/AxiosInstance';
import { CONNECTION_IP } from '@env';

console.log(CONNECTION_IP);

function SignUpWithEmail({navigation}: {navigation: any})
{
    const [sign_up_email, setEmail] = useState("");

    // Regex kiểm tra định dạng email
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };
    
    // Kiểm tra định dạng form
    const isFormValid = isValidEmail(sign_up_email);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('sign_up_email', sign_up_email);
            console.log('Email đã được lưu');
        } catch (error) {
            console.error('Lỗi khi lưu email:', error);
        }
    };

    return(
        <View style={sign_in_with_email_styles.main_view}>

            <TouchableOpacity
                style={sign_in_with_email_styles.backbutton}
                onPress={() => navigation.navigate("SignInScreen")}
            >
                <Icon name="arrow-back-ios" size={22} color="#FFFFFF"/>
            </TouchableOpacity>

            {/* Get Phone Number Zone */}
            <Text style={sign_in_with_email_styles.getphonezonetitle}>Email của bạn là gì?</Text>

            <TextInput  
                style={sign_in_with_email_styles.input}
                onChangeText={setEmail}
                placeholder="Địa chỉ email"
                placeholderTextColor="#888888"
            />     

            {/* Guideline Zone */}
            <View style={sign_in_with_email_styles.textView}>
            <Text style={sign_in_with_email_styles.text}>Bằng cách nhấn vào nút Tiếp tục bạn đã đồng ý với chúng tôi</Text>

            <Text style={[sign_in_with_email_styles.text, {fontWeight: 'bold'} ]}>Điều khoản dịch vụ và Chính sách quyền riêng tư</Text>
            </View>

            {/* Button Zone */}
            <TouchableOpacity 
                style={[sign_in_with_email_styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
                disabled={!isFormValid}
                onPress={async() =>
                {
                    try
                    {
                        var result = await CheckEmail(sign_up_email);
                        if(!result)
                        {
                            saveData();
                            navigation.navigate("SignUpChoosePassword");
                        }
                        else
                        {
                            Alert.alert("Lỗi", "Email đã có người sữ dụng, vui lòng nhập email kh")
                        }
                    }
                    catch(error)
                    {
                        console.log(`Có lỗi khi nhập email`);
                    }
                }
                }>
                    <Text style = {[isFormValid ? sign_in_with_email_styles.buttonTextActive : sign_in_with_email_styles.buttonTextInactive]}>Tiếp tục</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignUpWithEmail


async function CheckEmail(email: string) {
    const formData = new FormData();
    formData.append('email', email);

    try {
        console.log(CONNECTION_IP);
        const response = await fetch(`http://${CONNECTION_IP}:5115/api/user/email`, {
            method: 'POST',
            body: formData, 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();  // Chờ phản hồi JSON
        console.log(data);  // Xử lý kết quả nhận được từ response.json()
        if(!data)
        {
            return false;
        }
        return true;
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


