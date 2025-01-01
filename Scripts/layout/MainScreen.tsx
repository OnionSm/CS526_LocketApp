import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet} from 'react-native';
import main_screen_styles from './styles/MainScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import general_user_profile_styles from './styles/GeneralUserprofileStyle';
import { Camera, useCameraDevices, useCameraPermission, getCameraDevice, useCameraFormat, getCameraFormat, PhotoFile } from 'react-native-vision-camera';
import PermissionsPage from './components/PermissionsPage';
import CameraDenied from './components/CameraDenied';
import * as signalR from "@microsoft/signalr";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModal from './UserModal';
import ChangeInfoModal from './ChangeInfoModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import DeleteAccountModal from './modals/DeleteAccountModal';


function MainScreen({navigation}: {navigation: any})
{      

    const[first_name, set_first_name] = useState("");
    const[last_name, set_last_name] = useState("");
    const [delete_account_modal_state, set_delete_account_modal] = useState(false);
    
    const toggle_delete_account_modal = () => 
    {
        set_delete_account_modal(!delete_account_modal_state);
    }

    useEffect(()=>{
        const get_user_name_from_storage = async () => {
            var first_name = await AsyncStorage.getItem("first_name");
            var last_name = await AsyncStorage.getItem("last_name");
            if (first_name === null)
            {
                first_name = "";
            }
            if (last_name === null)
            {
                last_name = "";
            }
            const _user_name = first_name + " " + last_name;
            set_first_name(first_name);
            set_last_name(last_name);
        };
        get_user_name_from_storage();
    }, [first_name, last_name])


    const [signalR_connection, SetConnection] = useState<signalR.HubConnection | null>(null);
    useEffect(() => {
        const GetUserMessage = async () => {
            if(signalR_connection != null)
            {
                console.log("has connect")
                return;
            }
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://10.0.2.2:5115/chathub")
                .withAutomaticReconnect()
                .build();
            SetConnection(connection);
            // Lắng nghe sự kiện 'SendMessage' từ server
            connection.on("SendMessage", (message) => {
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

    // Object ref to manage multiple modals
    const modalRefs = useRef<Record<string, BottomSheetModal | null>>({});

    const handlePresentModal = useCallback((key: string) => {
        modalRefs.current[key]?.present();
    }, []);
    
    const handleCloseModal = useCallback((key: string) =>{
        modalRefs.current[key]?.close()
    }, []);
    
    const resetTakingPhoto = () => {
        setIsTakingPhoto(false);
    };

    const { width, height } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);

    return(
        <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider >
                <View style={main_screen_styles.main_view}>
                <UserModal navigation={navigation} first_name={first_name} last_name={last_name} modal_refs={modalRefs} modal_name = "user_modal" change_info_modal_name="change_info_modal" onClickChangeInfo={handlePresentModal} />
                <ChangeInfoModal set_first_name={set_first_name} set_last_name={set_last_name} modal_refs={modalRefs} modal_name = "change_info_modal" handleCloseModal={handleCloseModal}></ChangeInfoModal>
                {/* <DeleteAccountModal isVisible={delete_account_modal_state} toggleModal={toggle_delete_account_modal}></DeleteAccountModal> */}
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
                            <TouchableOpacity style={main_screen_styles.button} onPress={() => {handlePresentModal("user_modal")}}>
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
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderTopLeftRadius: 45,
      borderTopRightRadius:45,
      backgroundColor: '#050505',
    },
    contentContainer: 
    {
      flex: 1,
      alignItems: 'center',
      borderTopLeftRadius: 45,
      borderTopRightRadius:45,
      backgroundColor: "#242424"
    },
  });