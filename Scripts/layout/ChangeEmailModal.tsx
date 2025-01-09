import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect , createContext, useContext, useCallback} from 'react';
import AxiosInstance from './instance/AxiosInstance';
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');


export default function ChangeEmailModal ({ modalRef}: { modalRef: any}) {

    const [presentEmail, setpresentEmail] = useState('');

    // Lấy dữ liệu từ AsyncStorage
    useEffect(() => {
        const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                setpresentEmail(value);
            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
        };
        getData();
    }, []);


    const [email, setEmail] = useState(presentEmail);
    const [loading, setLoading] = useState(false);

    // Regex kiểm tra định dạng email
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };   

    // Kiểm tra định dạng form
    const isFormValid = isValidEmail(email);
    const ischangeEmail = email.trim() !== "";

    // Hàm gửi báo cáo sự cố
    const handlePress = async () => {
        setLoading(true);
    
        const formData = new FormData();
            formData.append('email', email);
        
        const checkValidEmail = await AxiosInstance.post("api/login/valid-email", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(checkValidEmail.data);

        if( checkValidEmail.data ){
            Alert.alert("Lỗi", "Email đã tồn tại, vui lòng nhập Email khác.");
        }
        else{
            try {
                const response = await AxiosInstance.put("api/user/change_email", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        
                // Nếu HTTP status không phải 200, báo lỗi
                if (response.status !== 200) { 
                    const errorMessage = response.data;
                    throw new Error(`Failed to send report: ${errorMessage}`);
                    setEmail('');
                }
        
                const result = response.data;
                Alert.alert('Thành công', `Đề xuất của bạn đã được gửi.`);
                setEmail('');
                modalRef.current?.dismiss();
            } catch (error) {
                const err = error as Error;
                Alert.alert('Lỗi', 'Không thể gửi đề xuất.');
                setEmail('');
            } finally {
                setLoading(false); 
                setEmail('');
            }
    }
    };   

    return (
    
    /* Màn hình dạng Modal */
    <BottomSheetModal
        ref={modalRef}
        snapPoints={['100%']}
        backgroundStyle={{ backgroundColor: '#1F1F1F' }}
        handleStyle={{ height: 10 }}
        containerStyle={{
            zIndex: 16,
        }}
        handleIndicatorStyle={[{ backgroundColor: '#505050', width: 45, height: 5 }]}>

    <BottomSheetView style={styles.container}>
        {/* Tiêu đề */}
        <Text style={styles.header}>Địa chỉ Email mới của bạn</Text>

        {/* Nhập email */}
        <TextInput
            style={styles.input}
            placeholder="Nhập Email"
            placeholderTextColor="#AAAAAA"
            keyboardType="email-address"
            onChangeText={setEmail}
        />

        {/* Nút gửi */}
        <TouchableOpacity onPress={handlePress}
            style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
            disabled={!isFormValid} // Vô hiệu hóa button khi form không hợp lệ
        >
            <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>
                Lưu
            </Text>
        </TouchableOpacity>

        </BottomSheetView>
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F', 
    },
    header: {
        marginTop: 0.3*height,
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FFFFFF', 
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        marginHorizontal: 20,
        height: 60,
    },
    textArea: {
        height: 150, 
    },
    button: {
        position: 'absolute',
        bottom: 20, // Đặt nút cách đáy màn hình 20px
        left: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F2F2F',
        borderRadius: 25,
        paddingVertical: 20,
        marginTop: 20,
    },
    buttonTextActive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#242424',
    },
    buttonTextInactive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#999999',
    },
});