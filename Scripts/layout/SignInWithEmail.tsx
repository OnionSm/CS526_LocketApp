import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import styles from './styles/SignInWithEmailStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import sign_in_with_email from './frontend_logic/sign_in_with_email';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONNECTION_IP } from '@env';
import { CommonActions } from '@react-navigation/native';

function SignInWithEmail({navigation}: {navigation: any})
{
    // Regex kiểm tra định dạng email
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };
    
    const resetToCurrentScreen = (navigation: any, currentScreenName: string, params?: any) => {
        navigation.dispatch(
        CommonActions.reset({
            index: 0, 
            routes: [{ name: currentScreenName, params }],
        })
        );
    };
    
    useEffect(() => 
    {
        const handleReset = () => {
            resetToCurrentScreen(navigation, 'SignInWithEmail'); 
        };
    }, [])
    

    const [login_email, setEmail] = useState("");

    const isFormValid = isValidEmail(login_email) && login_email.trim() !== '';

    useEffect(() => {
        // Load dữ liệu email khi màn hình mở
        const loadData = async () => {
            const savedEmail = await AsyncStorage.getItem('login_email');
            if (savedEmail) 
            {
                setEmail(savedEmail);
            }
        };
        loadData();
    }, []);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('login_email', login_email);
            console.log('Email đã được lưu');
        } catch (error) {
            console.error('Lỗi khi lưu email:', error);
        }
    };




    return(
        <View style={styles.main_view}>
            {/* Back Zone */}

            <TouchableOpacity style={styles.backbutton}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-ios" size={24} color="#FFFFFF" /> 
            </TouchableOpacity>

            {/* Get Phone Number Zone */}
            <Text style={styles.getphonezonetitle}>Nhập địa chỉ Email của bạn?</Text>

            <TextInput  style={styles.input}
                        value={login_email}
                        onChangeText={setEmail}
                        placeholder="Địa chỉ email"
                        placeholderTextColor="#888888">
                            
            </TextInput>

            {/* Guideline Zone */}
            <View style={styles.textView}>
            <Text style={styles.text}>Bằng cách nhấn vào nút Tiếp tục bạn đã đồng ý với chúng tôi</Text>

            <Text style={[styles.text, {fontWeight: 'bold'} ]}>Điều khoản dịch vụ và Chính sách quyền riêng tư</Text>
            </View>

            {/* Button Zone */}
                <TouchableOpacity 
                style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
                disabled={!isFormValid}
                onPress={async() =>
                {
                    try
                    {
                        var result = await CheckEmail(login_email);
                        if(result)
                        {
                            saveData();
                            navigation.navigate("ChoosePassword");
                        }
                        else
                        {
                            Alert.alert("", "Tài khoản không tồn tại");
                        }
                    }
                    catch(error)
                    {
                        console.log(`Có lỗi khi nhập email`);
                    }
                }
                }>
                    <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>Tiếp tục</Text>
                </TouchableOpacity>
        </View>
    )
}

export default SignInWithEmail


async function CheckEmail(email: string) {
    const formData = new FormData();
    formData.append('email', email);

    console.log(formData);

    try {
        const response = await fetch(`http://${CONNECTION_IP}:5115/api/login/valid-email`, {
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


