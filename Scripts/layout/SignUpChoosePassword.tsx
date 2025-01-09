import React, { useEffect } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import styles from './styles/SignInWithEmailStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


function SignUpChoosePassword({ navigation }: {navigation: any })
{
    const [sign_up_password, SetPassword] = useState("");
    const [isTextVisible, setIsTextVisible] = useState(false);

    const isFormValid = sign_up_password.trim() !== '';
    
    const SavePassword = async () => {
        try {
            await AsyncStorage.setItem("sign_up_password", sign_up_password);
            console.log("Lưu password đăng kí thành công");
        } catch (error) {
            console.log("Không thể lưu password đăng kí", error);
        }
    }

    // Handle Eye Button
    const handleEyeButtonPress = () => {
        setIsTextVisible(!isTextVisible);
    }
    

    return(
        <View style={styles.main_view}>
            {/* Back Zone */}
            <TouchableOpacity
                style={styles.backbutton}
                onPress={() => navigation.navigate("SignInScreen")}
            >
                <Icon name="arrow-back-ios" size={22} color="#FFFFFF"/>
            </TouchableOpacity>

            {/* Type Password Zone */}
            <Text style={styles.getphonezonetitle}>Chọn mật khẩu đăng kí</Text>

            <View style={local_styles.inputzone}>
            <TextInput  style={local_styles.input}
                        onChangeText={SetPassword}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#888888"
                        secureTextEntry={!isTextVisible}/>

            
            <Icon.Button onPress={handleEyeButtonPress} color={isTextVisible ? "#ffffff" : "#1F1F1F"}
            name="remove-red-eye" size={30} backgroundColor="#2F2F2F" style={local_styles.eyebutton}/>

            </View>


            <Text style={styles.text}>Mật khẩu phải có ít nhất 8 kí tự, chữ hoa và kí tự đặc biệt.</Text>

            {/* Button Zone */}
            <TouchableOpacity 
                style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
                disabled={!isFormValid} // Vô hiệu hóa button khi form không hợp lệ
                onPress={async () => 
                {
                    if(IsValidPassword(sign_up_password))
                    {
                        await SavePassword();
                        navigation.navigate("ChooseUserName");
                    }
                    else
                    {
                        Alert.alert("Lỗi", "Mật khẩu không hợp lệ.");
                    }
                }
                }>
                    <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpChoosePassword

function IsValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}

const local_styles = StyleSheet.create({
    inputzone: {
        backgroundColor: '#2F2F2F',
        borderRadius: 10,
        height: 60,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 0.05*width,
        marginVertical: 0.02*height,
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
})

