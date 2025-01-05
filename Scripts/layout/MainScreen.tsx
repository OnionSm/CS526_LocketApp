import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList} from 'react-native';
import main_screen_styles from './styles/MainScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera, useCameraDevices, useCameraPermission, getCameraDevice, useCameraFormat, getCameraFormat, PhotoFile } from 'react-native-vision-camera';
import CameraDenied from './components/CameraDenied';
import DeleteAccountModal from './modals/DeleteAccountModal';
import { CONNECTION_IP } from '@env';
import RNFS from 'react-native-fs'; 
import StoryItem from './components/StoryItem';

const getMimeType = (path: any) => {
    const extension = path.split('.').pop().toLowerCase();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        default:
            return 'image/jpeg'; // Mặc định nếu không xác định được
    }
};
    type SectionData =
  | string // Cho Camera Section
  | { id: string;  content: string }; // Cho FriendNew Section


function MainScreen({navigation, hasPermission, setHasPermission, isTakingPhoto, setIsTakingPhoto}: 
    {hasPermission: boolean; setHasPermission: (state: boolean) => void; navigation: any; isTakingPhoto: boolean; setIsTakingPhoto: (state: boolean) => void})
{      

    const { width, height } = Dimensions.get('window');

    const [isModalVisible, setModalVisible] = useState(false);
    const [delete_account_modal_state, set_delete_account_modal] = useState(false);
    const toggle_delete_account_modal = () => 
    {
        set_delete_account_modal(!delete_account_modal_state);
    }

    // const modalRefs = useRef<Record<string, BottomSheetModal | null>>({});
    // const handlePresentModal = useCallback((key: string) => {
    //     modalRefs.current[key]?.present();
    // }, []);
    // const handleCloseModal = useCallback((key: string) =>{
    //     modalRefs.current[key]?.close()
    // }, []);
    

    const devices = Camera.getAvailableCameraDevices();
    const device = getCameraDevice(devices, 'back');
    const format = useCameraFormat(device, [
        { photoResolution: { width: 1080, height: 1080 }},
        { videoAspectRatio: 1 },
        { videoResolution: { width: 1080, height: 1080 } },
        { fps: 30 }
      ]);
    const [flash_state, set_flash_state] = useState(false);
    const getPermission = async () => 
    {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === "granted");
        return;
    };
    if(!hasPermission)
    {
        getPermission();
    }
    console.log("Camera Permission " ,hasPermission);

    const [photoImg, setPhoto] = useState<string | null>(null); 
    const current_camera = useRef<Camera>(null);

    
    const takePhoto = async () => 
    {
        try 
        {
            if (!current_camera.current) 
            {
                console.error("Camera is not initialized");
                return;
            }
            const photo = await current_camera.current.takePhoto({flash: flash_state === true ? "on" : "off"});
            setIsTakingPhoto(true);
            console.log("Photo: ", photo); 
            const base64Image = await RNFS.readFile(photo.path, 'base64');
            const mimeType = getMimeType(photo.path); 
            const imageBase64WithPrefix = `data:${mimeType};base64,${base64Image}`;
            setPhoto(imageBase64WithPrefix)
        } 
        catch (error) 
        {
            console.error("Failed to take photo:", error);
        } 
    };

    const resetTakingPhoto = () => 
    {
        setIsTakingPhoto(false);
        setPhoto(null);
    };

    return(
        <View style={main_screen_styles.main_view}>

            {/* Image Zone */}
            <View style={main_screen_styles.image_zone}>
            {isTakingPhoto ? (
                <View style={main_screen_styles.image_zone}>
                {photoImg ? (
                    <Image 
                        source={{uri: photoImg}} 
                        style={{ width: "100%", height: "100%" }} />
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
                        <TouchableOpacity style={main_screen_styles.centre_button}
                        onPress={() => {set_flash_state(!flash_state)}}>
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