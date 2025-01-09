import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch} from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect , createContext, useContext, useCallback} from 'react';
import AxiosInstance from './instance/AxiosInstance';
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function ShowUerModal ({modalRef} : {modalRef : any}) {

    // State để lưu trạng thái của switch
    const [isEnabled, setIsEnabled] = useState();

    // Lấy trạng thái Show user từ AsyncStorage
    useEffect(() => {
        const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('show_user');
            const bool_value = value !== null ? JSON.parse(value) : false; 
            setIsEnabled(bool_value); 
        } catch (error) {
            console.error('Error retrieving data', error);
        }
        };
        getData();
    }, []);
    console.log("show", isEnabled);

    // Hàm thay đổi trạng thái khi nhấn vào switch
    const handlePress = async (value: boolean) => {
        try {
            const new_value = !isEnabled;
            console.log("new", new_value)

            const formData = new FormData();
            formData.append('show_user', String(new_value));
        
            const response = await AxiosInstance.put("api/user/show_user", formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
        
            if (response.status !== 200) {
                throw new Error('Failed to update user visibility');
            }

            setIsEnabled(new_value); 
        
            
            } catch (error) {
                setIsEnabled(!isEnabled)
            }
        };
        

    return (
        <BottomSheetModal
            ref = {modalRef}
            snapPoints={['100%']}
            backgroundStyle={{ backgroundColor: '#1F1F1F' }}
            handleStyle={{ height: 10 }}
            containerStyle={{
                zIndex: 16,
            }}
            handleIndicatorStyle={[{ backgroundColor: '#505050', width: 45, height: 5 }]}>

        <BottomSheetView style={style.container}>

            <Text style={style.header}>Hiển thị tài khoản</Text>

            <View style={style.view_container}>

                <Text style = {style.textArea}>
                    Cho phép bạn bè thêm tôi qua qua tên người dùng
                </Text>

                <Switch style = {style.switchArea}
                    trackColor={{ false: '#767577', true: '#fcba03' }}
                    thumbColor={'#f4f3f4'}  
                    value={isEnabled}               
                    onValueChange={async (value) => {await handlePress(value)} }                    
                />
            </View>

            <Text style={style.text}>
                Khi tắt, những người dùng Locket khác sẽ không thể tìm thấy tài khoản của bạn bằng tên người dùng hoặc thêm bạn qua link chia sẻ.
            </Text>

            <Text style={style.text}>
                Thay vào đó, chỉ những người đã lưu bạn trong Danh bạ của họ hoặc bạn đã chia sẻ một liên kết thư mời với họ sẽ có thể gửi cho bạn yêu cầu kết bạn.
            </Text>

        </BottomSheetView>

        </BottomSheetModal>
    )
};




const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F', 
    },
    header: {
        marginTop: 0.05*height,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF', 
        textAlign: 'center',
    },
    view_container: {
        backgroundColor: '#474747',
        marginHorizontal: 0.05*width,
        marginVertical: 0.04*height,
        width: 0.9*width,
        height: 0.1*height,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',

    },
    textArea:{
        marginLeft:0.05*width,
        flex: 5,
        width: 0.5*width,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
    },
    switchArea:{
        flex: 1,
        transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
        marginRight: 0.06*width,
    },
    text: {
        marginHorizontal: 0.1*width,
        color: '#a3a3a0',
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 25,
        marginBottom: 0.02*height,
    },
})

