import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import getphonenumberstyles from './styles/GetPhoneNumberStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import FlagIcon from 'react-native-ico-flags';

function GetPhoneNumber()
{
    return(
        <View style={getphonenumberstyles.main_view}>
            {/* Back Zone */}
            <View style={getphonenumberstyles.backzone}>
                <TouchableOpacity style={getphonenumberstyles.backbutton}>
                    <Icon name="left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Get Phone Number Zone */}
            <View style={getphonenumberstyles.getphonezone}>
                <Text style={getphonenumberstyles.getphonezonetitle}>Nhập số điện thoại ?</Text>

                <View style ={getphonenumberstyles.inputzone}>
                    <FlagIcon name="vietnam" style={getphonenumberstyles.inputzoneicon} />
                    <TextInput  style={getphonenumberstyles.inputzonetext}>
                         0123456789
                    </TextInput>
                </View>
                <TouchableOpacity style={getphonenumberstyles.useemailbutton}>
                        <Text style ={getphonenumberstyles.useemailtext}>Tiếp tục với Email</Text>
                    </TouchableOpacity>
            </View>

            {/* Guideline Zone */}
            <View style={getphonenumberstyles.guidelinezone}>
                <Text style={getphonenumberstyles.guidelinetext}>Nhấn tiếp tục nghĩa là bạn đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của chúng tôi</Text>
            </View>

            {/* Button Zone */}
            <View style={getphonenumberstyles.buttonzone}>
                <TouchableOpacity style={getphonenumberstyles.continuebutton}>
                    <Text style ={getphonenumberstyles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GetPhoneNumber