import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import sign_in_with_email_styles from './styles/SignInWithEmailStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import FlagIcon from 'react-native-ico-flags';

function SignInWithEmail()
{
    return(
        <View style={sign_in_with_email_styles.main_view}>
            {/* Back Zone */}
            <View style={sign_in_with_email_styles.backzone}>
                <TouchableOpacity style={sign_in_with_email_styles.backbutton}>
                    <Icon name="left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Get Phone Number Zone */}
            <View style={sign_in_with_email_styles.getphonezone}>
                <Text style={sign_in_with_email_styles.getphonezonetitle}>Nhập Email ?</Text>

                <View style ={sign_in_with_email_styles.inputzone}>
                    <FlagIcon name="vietnam" style={sign_in_with_email_styles.inputzoneicon} />
                    <TextInput  style={sign_in_with_email_styles.inputzonetext}
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
                <TouchableOpacity style={sign_in_with_email_styles.continuebutton}>
                    <Text style ={sign_in_with_email_styles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignInWithEmail