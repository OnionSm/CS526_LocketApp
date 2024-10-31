import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import general_user_profile_styles from './styles/GeneralUserprofileStyle';
function GeneralUserProfile()
{
    return(
        <View style={general_user_profile_styles.main_view}>
            <View style={general_user_profile_styles.main_view_2}>
                <View style={general_user_profile_styles.upper_line}></View>
            </View>
        </View>
    )
}

export default GeneralUserProfile