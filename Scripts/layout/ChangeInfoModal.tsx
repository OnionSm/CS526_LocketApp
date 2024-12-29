import { useEffect, useState, useRef, useCallback } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, StyleSheet, Dimensions} from 'react-native';
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

function ChangeInfoModal({set_username, modal_refs, modal_name, handleCloseModal} : {set_username: (username : string) => void ;  modal_refs : any, modal_name: string, handleCloseModal : (key: string) => void })
{

    const [first_name, SetFirstName] = useState("");
    const [last_name, SetLastName] = useState("");


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
        set_username(first_name + " " + last_name);
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

   
    // renders
    return (
        <BottomSheetModal
            ref={(ref) => (modal_refs.current[modal_name] = ref)}
            backgroundStyle={{ backgroundColor: '#242424' }}
            handleStyle={{height:10}}
            handleIndicatorStyle={[{ backgroundColor: '#505050' }, {width: 45}, {height: 5}]}
        >
            <BottomSheetView style={styles.contentContainer}>
            <View style={change_info_style.main_view}>

                {/* Type Password Zone */}
                <View style={change_info_style.getusernamezone}>
                    <Text style={change_info_style.getusernamezonetitle}>Sửa tên của bạn</Text>

                    <View style ={change_info_style.inputzone}>
                        <TextInput  style={change_info_style.inputzonetext}
                            placeholder="Họ"
                            placeholderTextColor="#888888"
                            value={first_name}
                            onChangeText={n => SetFirstName(n)}>

                        </TextInput>
                        
                    </View>
                    <View style ={change_info_style.inputzone}>
                        <TextInput  style={change_info_style.inputzonetext}
                            placeholder="Tên"
                            placeholderTextColor="#888888"
                            value={last_name}
                            onChangeText={n => SetLastName(n)}>

                        </TextInput>
                    </View>
                </View>

                {/* Button Zone */}
                <View style={change_info_style.buttonzone}>
                    <TouchableOpacity style={change_info_style.continuebutton}
                    onPress={async () => 
                    {
                        if(CanSaveUserName(first_name, last_name))
                        {
                            await SaveUserName();
                            handleCloseModal(modal_name);
                        }
                        else
                        {
                            console.log("Có lỗi trong quá trình xử lí");
                        }
                    }
                    }>
                        <Text style ={change_info_style.continuetext}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default ChangeInfoModal

function CanSaveUserName(first_name: string , last_name: string)
{
    return first_name.length > 0 && last_name.length > 0;
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderTopLeftRadius: 45,
      borderTopRightRadius:45,
      backgroundColor: '#050505',
    },
    contentContainer: 
    {
      flex: 1,
      alignItems: 'center',
      borderTopLeftRadius: 45,
      borderTopRightRadius:45,
      backgroundColor: "#242424"
    },
  });