import { useRef, useState, useEffect } from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions} from 'react-native';
import main_screen_styles from './styles/MainScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import general_user_profile_styles from './styles/GeneralUserprofileStyle';
import { Camera, useCameraDevices, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';
import PermissionsPage from './components/PermissionsPage';
import CameraDenied from './components/CameraDenied';
function MainScreen()
{
    
    const devices = Camera.getAvailableCameraDevices();
    const device = getCameraDevice(devices, 'back');
    const [hasPermission, setHasPermission] = useState(false);
    const getPermission = async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === "granted");
        console.log(status);
        return;
    };

//   // Kiểm tra và yêu cầu quyền truy cập camera
//   useEffect(() => {
//     const getPermission = async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === "granted");
//     console.log(status);
//     return;
//     };

//     getPermission();
//   }, []);
    getPermission();

    console.log(hasPermission);
  
    const { width, height } = Dimensions.get('window');
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
            {hasPermission === false ? (
                <CameraDenied />
            ) : hasPermission === true && device ? (
                <Camera
                    style={{ flex: 1 }}
                    device={device}
                    isActive={true}
                />
            ) : (
                <Text>Không tìm thấy thiết bị camera</Text>
            )}
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
                    <ScrollView contentContainerStyle={general_user_profile_styles.scroll_view}
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
                                    <Text style= {general_user_profile_styles.general_text}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={general_user_profile_styles.user_locket_share_zone}>
                            <View style={general_user_profile_styles.locket_share_background}>
                                <View style={general_user_profile_styles.locket_share_background_zone1}>
                                    <View style={general_user_profile_styles.mini_avatar_zone}>
                                        <Image source={require("./GUI/AvatarBorder.png")}
                                        style={general_user_profile_styles.avatar_border}>
                                            
                                        </Image>
                                    </View>

                                    <View style={general_user_profile_styles.locket_share_text_zone}>
                                        <Text style={[general_user_profile_styles.general_text ,{fontSize:15}]}
                                        >Mời bạn bè tham gia Locket</Text>
                                        <Text style={[general_user_profile_styles.general_text2, {fontSize:15}]}
                                        >locket.cam/onion</Text>
                                    </View>
                                </View>

                                <View style={general_user_profile_styles.locket_share_background_zone2}>
                                <TouchableOpacity style={general_user_profile_styles.share_button_background}>
                                    <Icon name="share" size={24} color="#FFFFFF" /> 
                                </TouchableOpacity>
                                </View>
                            </View> 
                        </View>
                        
                        <View style={general_user_profile_styles.button_wrapper}>
                            <View style={general_user_profile_styles.extension_setting_zone}>
                                <View style={general_user_profile_styles.text_option_zone}>
                                    <Icon name="add-box" size={24} color="#AAAAAA" />
                                    <Text style={{
                                        fontFamily: 'SF-Pro-Rounded-Bold',
                                        fontSize: 16,
                                        color: "#AAAAAA",
                                        marginLeft: 5 
                                    }}>
                                        Thiết lập tiện ích
                                    </Text>
                                </View>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                                    {marginBottom: 1},
                                    {borderTopLeftRadius : 20},
                                    {borderTopRightRadius: 20},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="add-box" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Thêm tiện ích
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1},
]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button,
                                    {borderBottomLeftRadius: 20},
                                    {borderBottomRightRadius: 20},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="help" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Hướng dẫn về tiện ích
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1}]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={general_user_profile_styles.button_wrapper}>
                            <View style={general_user_profile_styles.extension_setting_zone}>
                                <View style={general_user_profile_styles.text_option_zone}>
                                    <Icon name="person" size={24} color="#AAAAAA" />
                                    <Text style={{
                                        fontFamily: 'SF-Pro-Rounded-Bold',
                                        fontSize: 16,
                                        color: "#AAAAAA",
                                        marginLeft: 5 
                                    }}>
                                        Tổng quát
                                    </Text>
                                </View>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                                    {marginBottom: 1},
                                    {borderTopLeftRadius : 20},
                                    {borderTopRightRadius: 20},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="mail" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Thay đổi địa chỉ email
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1}]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button,  
                                    {marginBottom: 1},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="send" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Chia sẻ phản hồi
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1}]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button,
                                    {borderBottomLeftRadius: 20},
                                    {borderBottomRightRadius: 20},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="report" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Báo cáo sự cố
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1}]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        

                        <View style={general_user_profile_styles.button_wrapper}>
                            <View style={general_user_profile_styles.extension_setting_zone}>
                                <View style={general_user_profile_styles.text_option_zone}>
                                    <Icon name="lock" size={24} color="#AAAAAA" />
                                    <Text style={{
                                        fontFamily: 'SF-Pro-Rounded-Bold',
                                        fontSize: 16,
                                        color: "#AAAAAA",
                                        marginLeft: 5 
                                    }}>
                                        Riêng tư & bảo mật
                                    </Text>
                                </View>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                                    {marginBottom: 1},
                                    {borderTopLeftRadius : 20},
                                    {borderTopRightRadius: 20},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="person" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Tổng quát
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1}]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[general_user_profile_styles.medium_button,  
                                    {marginBottom: 1},
                                    {display: "flex"},
                                    {justifyContent: "space-evenly"},
                                    {alignItems: "center"},
                                    {flexDirection: "row"}]}>
                                    <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                        {marginLeft: 20},
                                        {marginRight: 20}]}>
                                        <Icon name="person" size={24} color="#AAAAAA" />
                                        <Text style={{
                                            fontFamily: 'SF-Pro-Rounded-Bold',
                                            fontSize: 16,
                                            color: "#AAAAAA",
                                            marginLeft: 5 
                                        }}>
                                            Tổng quát
                                        </Text>
                                    </View>
                                    <View style={[{flex: 1}]}>
                                        <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                                    </View>
                                </TouchableOpacity>
                                <View style={[general_user_profile_styles.medium_button,
                                    {borderBottomLeftRadius: 20},
                                    {borderBottomRightRadius: 20}]}>
                                </View>
                            </View>
                        </View>
                        
                        
                        
                    </ScrollView>

                </View>
            </Modal>
        </View>
    )
}

export default MainScreen