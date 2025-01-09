import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity} from 'react-native';
import signinstyles from './styles/SignInScreenStyle'


function SignInScreen({navigation}: {navigation: any})
{
    return (
        
        <View style={signinstyles.main_view}>
            <View>
                {/* Widget zone */}
                <View style={signinstyles.widgetzone}>
                    <Image source={require('./GUI/Locket_image.jpg')}
                            style = {signinstyles.widget}/>
                </View>

                {/* Locket Descript */}
                <View style={signinstyles.locketdescriptzone}>
                    <Text style= {signinstyles.locketdescript}>Ảnh trực tiếp từ bạn bè ngay trên man hình chính</Text>
                </View>

                {/* Button zone */}
                <View style={signinstyles.buttonzone}>
                    <TouchableOpacity
                        style={signinstyles.registerbutton}
                        onPress={() => navigation.navigate("SignUpWithEmail")}
                    >
                        <Text style ={signinstyles.registertext}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                    <Text style={signinstyles.signin}  onPress={() => navigation.navigate("SignInWithEmail")}>Đăng nhập</Text>
                </View>
            </View>
        </View>
    );
}

export default SignInScreen