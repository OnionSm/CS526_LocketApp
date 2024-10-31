import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import choose_username_style from './styles/ChooseUserNameStyle';

function ChooseUserName()
{
    return(
        <View style={choose_username_style.main_view}>
            {/* Back Zone */}
            <View style={choose_username_style.backzone}>
                <TouchableOpacity style={choose_username_style.backbutton}>
                    <Icon name="left" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Type Password Zone */}
            <View style={choose_username_style.getusernamezone}>
                <Text style={choose_username_style.getusernamezonetitle}>Tên bạn là gì?</Text>

                <View style ={choose_username_style.inputzone}>
                    <TextInput  style={choose_username_style.inputzonetext}
                        placeholder="Họ"
                        placeholderTextColor="#888888"
                        secureTextEntry={true}>

                    </TextInput>
                    
                </View>
                <View style ={choose_username_style.inputzone}>
                    <TextInput  style={choose_username_style.inputzonetext}
                        placeholder="Tên"
                        placeholderTextColor="#888888"
                        secureTextEntry={true}>

                    </TextInput>
                    
                </View>
            </View>

            {/* Button Zone */}
            <View style={choose_username_style.buttonzone}>
                <TouchableOpacity style={choose_username_style.continuebutton}>
                    <Text style ={choose_username_style.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChooseUserName