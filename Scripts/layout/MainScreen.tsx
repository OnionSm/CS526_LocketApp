import { useRef, useState, useEffect , createContext, useContext} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet} from 'react-native';
import main_screen_styles from './styles/MainScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import general_user_profile_styles from './styles/GeneralUserprofileStyle';
import { Camera, useCameraDevices, useCameraPermission, getCameraDevice, useCameraFormat, getCameraFormat, PhotoFile } from 'react-native-vision-camera';
import PermissionsPage from './components/PermissionsPage';
import CameraDenied from './components/CameraDenied';
import * as signalR from "@microsoft/signalr";


function MainScreen({navigation}: {navigation: any})
{
    const [signalR_connection, SetConnection] = useState<signalR.HubConnection | null>(null);
    useEffect(() => {
        const GetUserMessage = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://10.0.2.2:5115/chathub")
                .withAutomaticReconnect()
                .build();
            SetConnection(connection);
            // Lắng nghe sự kiện 'SendMessage' từ server
            connection.on("SendMessage", (user, message) => {
                console.log("Received message from server:", message);  
            });
    
            try {
                await connection.start();
                console.log("SignalR connected");
            } catch (err) {
                console.error("Connection failed:", err);
            }
    
            // Dọn dẹp kết nối khi component tháo dỡ
            return () => {
                if (connection) {
                    connection.stop();  // Dừng kết nối SignalR
                    console.log("SignalR connection stopped");
                }
            };
        };
    
        GetUserMessage();
    }, []);  // [] đảm bảo useEffect chỉ chạy 1 lần khi component mount


    
    const devices = Camera.getAvailableCameraDevices();
    const device = getCameraDevice(devices, 'back');
    const format = useCameraFormat(device, [
        { videoAspectRatio: 1 }, // Tỷ lệ 1:1
        { videoResolution: { width: 1080, height: 1080 } },
        { fps: 30 }
      ])
    console.log("format", format);
    const [hasPermission, setHasPermission] = useState(false);
    const getPermission = async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === "granted");
        return;
    };

    if(!hasPermission)
    {
        getPermission();
    }
    console.log(hasPermission);

    // Định nghĩa kiểu PhotoFile dựa trên thông tin ảnh trả về


    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const [photoImg, setPhoto] = useState<PhotoFile | null>(null); // Lưu ảnh chụp
    const current_camera = useRef<Camera>(null);

    
    const takePhoto = async () => {
        if (!current_camera.current) {
            console.error("Camera is not initialized");
            return;
        }

        setIsTakingPhoto(true); // Đặt trạng thái chụp ảnh thành true

        try {
            
            const photo = await current_camera.current.takePhoto();
            // setPhoto(photo); // Lưu ảnh vào state photoImg
            console.log("Photo: ", photo); // Kiểm tra ảnh đã chụp
        } 
        catch (error) {
            console.error("Failed to take photo:", error);
        } 
        // finally {
        //     setIsTakingPhoto(false); // Đặt lại trạng thái chụp ảnh về false
        // }
    };
    
    
    const resetTakingPhoto = () => {
        setIsTakingPhoto(false);
    };

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
            
            <View style={[main_screen_styles.upper_zone] }>
            {isTakingPhoto ? (
                <View style={[
                    {display: "flex"}, 
                    {flexDirection: "row"},
                    {alignItems: "center"},
                    {alignContent: "flex-end"},
                    {justifyContent: "flex-end"},
                    {width: "100%"}
                ]}>
                    
                    <Text style={[main_screen_styles.add_friend_text,
                        {fontSize: 20},
                        {marginLeft: width * 0.25},
                        {marginRight: width* 0.25}]}>Gửi đến...</Text>
                    <TouchableOpacity style={[ {marginRight: width*0.05}]}>
                        <Icon name="download" size={30} color="#FFFFFF" /> 
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={main_screen_styles.upper_zone}> 
                    <TouchableOpacity style={main_screen_styles.button} onPress={() => setModalVisible(true)}>
                        <Icon name="account-circle" size={30} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={main_screen_styles.addfriend_button}>
                        <Icon name="group" size={25} color="#FFFFFF" /> 
                        <Text style={main_screen_styles.add_friend_text}>Thêm bạn bè</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={main_screen_styles.button} onPress={()=>{navigation.navigate("MessageScreen")}}>
                        <Icon name="chat-bubble" size={30} color="#FFFFFF" /> 
                    </TouchableOpacity>
                </View> 
            )}
            </View>


            {/* Image Zone */}
            <View style={main_screen_styles.image_zone}>
            {isTakingPhoto ? (
                <View style={main_screen_styles.image_zone}>
                {photoImg ? (
                <Image 
                    source={{ uri: photoImg.path }} 
                    style={{ width: 200, height: 200 }} />
            ) : (
                <Text>No photo taken</Text>
            )}
                </View>
            ):(
                <View style={main_screen_styles.image_zone}>
                    {hasPermission === false ? (
                <CameraDenied />
            ) : hasPermission === true && device ? (
                <Camera
                    style={[StyleSheet.absoluteFill]}
                    device={device}
                    ref={current_camera}
                    isActive={true}
                    photo={true}
                    format={format}
                />
            ) : (
                <Text>Không tìm thấy thiết bị camera</Text>
            )}
                </View>
            )}
            </View>

            {/* Button Zone */}
            <View style={main_screen_styles.button_zone}>
                {isTakingPhoto ? 
                (
                    <View style={main_screen_styles.button_zone}>
                        <TouchableOpacity style={main_screen_styles.centre_button}
                            onPress={()=>{resetTakingPhoto()}}>
                            <Icon name="close" size={45} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[main_screen_styles.button, 
                            {width: 100},
                            {height: 100},
                            {borderRadius: 50}]}>
                            <Icon name="send" size={50} color="#FFFFFF"></Icon>
                            {/* <Image source={require("./GUI/CaptureImageButton.png")}
                            style={main_screen_styles.capture_image_button}></Image>   */}
                        </TouchableOpacity>
                        <TouchableOpacity style={main_screen_styles.centre_button}>
                            <Icon name="edit-note" size={45} color="#FFFFFF" /> 
                        </TouchableOpacity>
                    </View>
                ):(
                    <View style={main_screen_styles.button_zone}>
                        <TouchableOpacity style={main_screen_styles.centre_button}>
                            <Icon name="bolt" size={45} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={main_screen_styles.centre_button}
                        onPress={()=>{takePhoto()}}>
                            <Image source={require("./GUI/CaptureImageButton.png")}
                            style={main_screen_styles.capture_image_button}></Image>  
                        </TouchableOpacity>
                        <TouchableOpacity style={main_screen_styles.centre_button}>
                            <Icon name="photo-camera" size={45} color="#FFFFFF" /> 
                        </TouchableOpacity>
                    </View>
                )}
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