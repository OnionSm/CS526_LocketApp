import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FlagIcon from 'react-native-ico-flags';
import change_password_styles from './styles/ChoosePasswordStyle';

function ChoosePassword()
{
    return(
        <View style={change_password_styles.main_view}>
            {/* Back Zone */}
            <View style={change_password_styles.backzone}>
                <TouchableOpacity style={change_password_styles.backbutton}>
                    <Icon name="left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Type Password Zone */}
            <View style={change_password_styles.getpasswordzone}>
                <Text style={change_password_styles.getpasswordzonetitle}>Chọn mật khẩu</Text>

                <View style ={change_password_styles.inputzone}>
                    <TextInput  style={change_password_styles.inputzonetext}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#888888"
                        secureTextEntry={true}>

                    </TextInput>
                    
                </View>
                <Text style={change_password_styles.passwordguide}>Mật khẩu phải có ít nhất 8 kí tự</Text>
            </View>

            {/* Button Zone */}
            <View style={change_password_styles.buttonzone}>
                <TouchableOpacity style={change_password_styles.continuebutton}>
                    <Text style ={change_password_styles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChoosePassword