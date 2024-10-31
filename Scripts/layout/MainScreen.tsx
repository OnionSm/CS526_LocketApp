import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import main_screen_styles from './styles/MainScreenStyle';
import Icon from 'react-native-vector-icons/EvilIcons';

function MainScreen()
{
    return(
        <View style={main_screen_styles.main_view}>

            {/* Upper Zone */}
            <View style={main_screen_styles.upper_zone}>
                <TouchableOpacity style={main_screen_styles.userbutton}>
                    <Icon name="user" size={35} color="#FFFFFF" /> 
                </TouchableOpacity>
                <TouchableOpacity style={main_screen_styles.userbutton}>
                    <Icon name="left" size={35} color="#FFFFFF" /> 
                </TouchableOpacity>
                <TouchableOpacity style={main_screen_styles.userbutton}>
                    <Icon name="left" size={35} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Image Zone */}
            <View style={main_screen_styles.image_zone}>

            </View>

            {/* Button Zone */}
            <View style={main_screen_styles.button_zone}>

            </View>

            {/* History Zone */}
            <View style={main_screen_styles.history_zone}>

            </View>
        </View>
    )
}

export default MainScreen