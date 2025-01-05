import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect , createContext, useContext, useCallback, useRef} from 'react';
import AxiosInstance from './instance/AxiosInstance';
import ChangeEmailModal from './ChangeEmailModal';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export default function CheckPasswordModal({modalRef}: { modalRef: any}) {

    const [password, setPassword] = useState('');
    const [isTextVisible, setIsTextVisible] = useState(false);
    const changeEmailModalRef = useRef<BottomSheetModal>(null);

    // Kiểm tra định dạng form
    const isFormValid = password.trim() !== '';

    const handleEyeButtonPress = () => {
        setIsTextVisible(!isTextVisible);
    }

    const handleContinuePress = () => {
        changeEmailModalRef.current?.present();
        setPassword('');
    }

    return (
    
    /* Màn hình dạng Modal */
    <BottomSheetModal
        ref={modalRef}
        snapPoints={['100%']}
        backgroundStyle={{ backgroundColor: '#1F1F1F' }}
        handleStyle={{ height: 10 }}
        handleIndicatorStyle={[{ backgroundColor: '#505050', width: 45, height: 5 }]}>

        <BottomSheetView style={styles.container}>
        {/* Tiêu đề */}
        <Text style={styles.header}>Điền mật khẩu của bạn</Text>

        

        {/* Nút gửi */}
        <TouchableOpacity 
            onPress={handleContinuePress}
            style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
            disabled={!isFormValid} // Vô hiệu hóa button khi form không hợp lệ
        >
            <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>
                Tiếp tục
            </Text>
        </TouchableOpacity>
        <ChangeEmailModal modalRef={changeEmailModalRef}/>

        {/* Nhập mật khẩu */}
        <View style={styles.inputzone}>
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mật khẩu"
            secureTextEntry={!isTextVisible} // Hiển thị dưới dạng ****
        />
        <Icon.Button onPress={handleEyeButtonPress} color={isTextVisible ? "#ffffff" : "#1F1F1F"}
            name="remove-red-eye" size={30} backgroundColor="#2F2F2F" style={styles.eyebutton}/>
        </View>

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
    inputzone: {
        marginTop: 20,
        backgroundColor: '#2F2F2F',
        borderRadius: 10,
        height: 60,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 0.05*width,
    },
    input: {
        marginLeft:0.03*width,
        flex: 7,
        width: 0.7*width,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textArea: {
        height: 150, 
    },
    eyebutton:{
        flex: 1,
        backgroundColor: '#2F2F2F',
        width: 0.15*width,
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
