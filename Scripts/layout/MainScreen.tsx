import { useRef, useState } from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import main_screen_styles from './styles/MainScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import general_user_profile_styles from './styles/GeneralUserprofileStyle';


function MainScreen()
{
    const [modalVisible, setModalVisible] = useState(false);

    const scrollViewRef = useRef(null); 

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent; // Lấy contentOffset từ sự kiện
        const offsetY = contentOffset.y;

        // Kiểm tra vị trí cuộn
        if (offsetY < 0) {
            setModalVisible(false); // Đóng modal khi ở đầu trang
        }
    };

    return(
        <View style={main_screen_styles.main_view}>

            {/* Upper Zone */}
            <View style={main_screen_styles.upper_zone}>
                <TouchableOpacity style={main_screen_styles.button}
                                onPress={() => setModalVisible(true)}>
                     <Icon name="account-circle" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={main_screen_styles.addfriend_button}>
                    <Icon name="group" size={25} color="#FFFFFF" /> 
                    <Text style={main_screen_styles.add_friend_text}>Thêm bạn bè</Text>
                </TouchableOpacity>
                <TouchableOpacity style={main_screen_styles.button}>
                    <IconFeather name="zap" size={30} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Image Zone */}
            <View style={main_screen_styles.image_zone}>

            </View>

            {/* Button Zone */}
            <View style={main_screen_styles.button_zone}>
                <TouchableOpacity style={main_screen_styles.centre_button}>
                     <Icon name="bolt" size={45} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={main_screen_styles.centre_button}>
                    <Image source={require("./GUI/CaptureImageButton.png")}
                    style={main_screen_styles.capture_image_button}></Image>  
                </TouchableOpacity>
                <TouchableOpacity style={main_screen_styles.centre_button}>
                    <Icon name="photo-camera" size={45} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* History Zone */}
            <View style={main_screen_styles.history_zone}>
                <View style={main_screen_styles.history_child_zone}>
                    <View style={main_screen_styles.history_icon_background}>
                        <Icon name="photo-library" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={main_screen_styles.history_text}>Lịch sử</Text>
                </View>
                <Icon name="keyboard-arrow-down" size={45} color="#FFFFFF" /> 
            </View>

            {/* General User Profile */}
            <Modal animationType="slide"         
                transparent={true}              
                visible={modalVisible}          
                onRequestClose={() => {setModalVisible(false);}}>
                <View style={general_user_profile_styles.background}>
                    <View style={general_user_profile_styles.upper_zone}>
                        <View style={general_user_profile_styles.upper_line}></View>
                    </View>
                    <ScrollView style={general_user_profile_styles.scroll_view}
                        ref={scrollViewRef}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        // refreshControl={
                        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        // }
                        >
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_avatar_zone}>
                            {/* Avatar */}
                            <View style={general_user_profile_styles.user_avatar_child_zone}>
                                <Image source={require("./GUI/AvatarBorder.png")}
                                style={general_user_profile_styles.avatar_border}>
                                     
                                </Image>
                            </View>

                            {/* Username */}
                            <View style={general_user_profile_styles.username_zone}>
                                <Text style={general_user_profile_styles.username_text}>Onion</Text>
                            </View>

                            {/* User Id and Change Profile */}
                            <View style={general_user_profile_styles.userid_zone}>
                                <View style={general_user_profile_styles.userid_background}>
                                    <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                                </View>

                                <TouchableOpacity style={general_user_profile_styles.user_setting_background}>
                                    <Text style= {general_user_profile_styles.user_setting_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        

                    </ScrollView>

                </View>
            </Modal>
        </View>
    )
}

export default MainScreen