import React, { useEffect } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import change_password_styles from './styles/ChoosePasswordStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';


function SignUpChoosePassword({ navigation }: {navigation: any })
{
    const [sign_up_password, SetPassword] = useState("");
    
    const SavePassword = async () => {
        try {
            await AsyncStorage.setItem("sign_up_password", sign_up_password);
            console.log("Lưu password đăng kí thành công");
        } catch (error) {
            console.log("Không thể lưu password đăng kí", error);
        }
    }
    
    

    return(
        <View style={change_password_styles.main_view}>
            {/* Back Zone */}
            <View style={change_password_styles.backzone}>
                <TouchableOpacity style={change_password_styles.backbutton}
                onPress={() => navigation.navigate("SignInWithEmail")}>
                    <Icon name="arrow-back-ios" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Type Password Zone */}
            <View style={change_password_styles.getpasswordzone}>
                <Text style={change_password_styles.getpasswordzonetitle}>Chọn mật khẩu</Text>

                <View style ={change_password_styles.inputzone}>
                    <TextInput  style={change_password_styles.inputzonetext}
                        value={sign_up_password} 
                        onChangeText={e => SetPassword(e)}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#888888"
                        secureTextEntry={true}>

                    </TextInput>
                    
                </View>
                <Text style={change_password_styles.passwordguide}>Mật khẩu phải có ít nhất 8 kí tự</Text>
            </View>

            {/* Button Zone */}
            <View style={change_password_styles.buttonzone}>
                <TouchableOpacity style={change_password_styles.continuebutton}
                onPress={async () => 
                {
                    if(IsValidPassword(sign_up_password))
                    {
                        await SavePassword();
                        navigation.navigate("ChooseUserName");
                    }
                    else
                    {
                        console.log("Mật khẩu không hợp lệ, phải có đủ chữ hoa, chữ thường, số và kí tự đặc biệt");
                    }
                }
                }>
                    <Text style ={change_password_styles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpChoosePassword

function IsValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}


