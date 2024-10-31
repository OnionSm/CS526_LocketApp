import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity} from 'react-native';
import signinstyles from './styles/SignInScreenStyle'


function SignInScreen()
{
    return (
        
        <View style={signinstyles.main_view}>
            <View>
                {/* Widget zone */}
                <View style={signinstyles.widgetzone}>
                    <Image source={require('./GUI/SignInWidget.png')}
                    style = {signinstyles.widget}>
                    </Image>
                </View>

                {/* Title zone */}
                <View style={signinstyles.titlezone}>
                    <Image source={require('./GUI/LocketLogo.png')}
                    style = {signinstyles.locketlogo}>
                    </Image>
                    <Text  style = {signinstyles.locket_title}>Locket</Text>
                </View>

                {/* Locket Descript */}
                <View style={signinstyles.locketdescriptzone}>
                    <Text style= {signinstyles.locketdescript}>Live pics from your friend, on your homescreen</Text>
                </View>

                {/* Button zone */}
                <View style={signinstyles.buttonzone}>
                    <TouchableOpacity
                        style={signinstyles.registerbutton}
                        
                    >
                        <Text style ={signinstyles.registertext}>Nhấn vào đây</Text>
                    </TouchableOpacity>
                    <Text style={signinstyles.signin}>Đăng nhập</Text>
                </View>
            </View>
        </View>
    );
}

export default SignInScreen