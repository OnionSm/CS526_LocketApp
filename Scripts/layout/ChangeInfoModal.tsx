import { useEffect, useState, useRef, useCallback } from "react";
import React from 'react';
import { Alert, Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import change_info_style from "./styles/ChangeInfoModalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import AxiosInstance from "./instance/AxiosInstance";
import Toast from 'react-native-toast-message';

export default function ChangeInfoModal({ set_first_name, set_last_name, modalRef} : 
    {set_first_name: (first_name : string) => void; set_last_name: (last_name : string) => void ;  modalRef : any})
{

    const [first_name, SetFirstName] = useState("");
    const [last_name, SetLastName] = useState("");

    const isFormValid = first_name.trim() !== '' && last_name.trim() !== '';


    const form_data = new FormData();
    form_data.append("first_name", first_name);
    form_data.append("last_name", last_name);
    const update_user_to_server = async (first_name : string, last_name : string) =>
    {
        var response = await AxiosInstance.put(`api/user/change_user_name`,form_data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (response.status !== 200)
        {
            return false;
        }
        set_first_name(first_name);
        set_last_name(last_name);
        return true;
    }


    const SaveUserName = async () =>
    {
        try
        {
            var res = update_user_to_server(first_name, last_name);
            if (!res)
            {
                Toast.show({
                    type: 'error',
                    text1: 'Thay đổi tên người dùng không thành công!',
                    });
            }
            else
            {
            await AsyncStorage.setItem("first_name", first_name);
            await AsyncStorage.setItem("last_name", last_name);
            Toast.show({
                type: 'success',
                text1: 'Thay đổi tên người dùng thành công',
                });
            }
        }
        catch(error)
        {
            console.log("Không thể thay đổi tên người dùng");
        }
    }

    const HandlePress = () => {
        try {
            SaveUserName();
            Alert.alert('Thành công',`Tên của bạn đã được thay đổi`);
            SetFirstName('');
            SetLastName('');
            modalRef?.current?.dismiss();
        }
        catch{
            Alert.alert('Lỗi', 'Không thể thực hiện thay đổi');
            SetFirstName('');
            SetLastName('');
            modalRef?.current?.dismiss();
        }
    }

    // renders
    return (
        <BottomSheetModal
            ref={modalRef}
            snapPoints={['100%']}
            backgroundStyle={{ backgroundColor: '#1F1F1F' }}
            handleStyle={{ height: 10 }}
            containerStyle={{
                zIndex: 16,
            }}
            handleIndicatorStyle={[{ backgroundColor: '#505050', width: 45, height: 5 }]}
        >
        <BottomSheetView style={change_info_style.container}>

            {/* Tiêu đề */}
            <Text style={change_info_style.header}>Sửa tên của bạn</Text>

            {/* Nhập họ */}
            <TextInput
                style={change_info_style.input}
                placeholder="Họ"
                placeholderTextColor="#AAAAAA"
                keyboardType="email-address"
                onChangeText={SetFirstName}
            />

            {/* Nhập tên */}
            <TextInput
                style={[change_info_style.input]}
                placeholder="Tên"
                placeholderTextColor="#AAAAAA"
                onChangeText={SetLastName}
            />
        
            {/* Button Zone */}
            <TouchableOpacity 
                style={[change_info_style.button, isFormValid && {backgroundColor: '#F1B202'}]}
                onPress={HandlePress}
                disabled={!isFormValid}
            >
                <Text style ={[isFormValid ? change_info_style.buttonTextActive : change_info_style.buttonTextInactive]}>Lưu</Text>
            </TouchableOpacity>

        </BottomSheetView>
        </BottomSheetModal>
    );
};

function CanSaveUserName(first_name: string , last_name: string)
{
    return first_name.length > 0 && last_name.length > 0;
}