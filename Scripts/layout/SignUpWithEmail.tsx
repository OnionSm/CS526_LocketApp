import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import sign_in_with_email_styles from './styles/SignInWithEmailStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import sign_in_with_email from './frontend_logic/sign_in_with_email';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONNECTION_IP } from '@env';

console.log(CONNECTION_IP);

function SignUpWithEmail({navigation}: {navigation: any})
{
    const [sign_up_email, setEmail] = useState("");

    useEffect(() => {
        // Load dữ liệu email khi màn hình mở
        const loadData = async () => {
            const savedEmail = await AsyncStorage.getItem('sign_up_email');
            if (savedEmail) 
            {
                setEmail(savedEmail);
            }
        };
        loadData();
    }, []);

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
            {/* Back Zone */}
            <View style={sign_in_with_email_styles.backzone}>
                <TouchableOpacity style={sign_in_with_email_styles.backbutton}
                    onPress={() => navigation.navigate("SignInScreen")}>
                    <Icon name="arrow-back-ios" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Get Phone Number Zone */}
            <View style={sign_in_with_email_styles.getphonezone}>
                <Text style={sign_in_with_email_styles.getphonezonetitle}>Nhập Email đăng ký?</Text>

                <View style ={sign_in_with_email_styles.inputzone}>
                    <FlagIcon name="vietnam" style={sign_in_with_email_styles.inputzoneicon} />
                    <TextInput  style={sign_in_with_email_styles.inputzonetext}
                        value={sign_up_email} 
                        onChangeText={e => setEmail(e)}
                        placeholder="Địa chỉ email"
                        placeholderTextColor="#888888">
                            
                    </TextInput>
                </View>
            </View>

            {/* Guideline Zone */}
            <View style={sign_in_with_email_styles.guidelinezone}>
                <Text style={sign_in_with_email_styles.guidelinetext}>Nhấn tiếp tục nghĩa là bạn đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của chúng tôi</Text>
            </View>

            {/* Button Zone */}
            <View style={sign_in_with_email_styles.buttonzone}>
                <TouchableOpacity style={sign_in_with_email_styles.continuebutton}
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
                            console.log("Email đã có người sử dụng");
                        }
                    }
                    catch(error)
                    {
                        console.log(`Có lỗi khi nhập email`);
                    }
                }
                }>
                    <Text style ={sign_in_with_email_styles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpWithEmail


async function CheckEmail(email: string) {
    const formData = new FormData();
    formData.append('email', email);

    console.log(formData);

    try {
        console.log(CONNECTION_IP);
        const response = await fetch(`  ail`, {
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


