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
import { FriendData } from './types/FriendData';
import UserAvatar from 'react-native-user-avatar';
import { FlatList } from 'react-native-gesture-handler';

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


function MainScreen({navigation, hasPermission, setHasPermission, isTakingPhoto, setIsTakingPhoto, go_to_page_story_tab, data_friend}: 
    {hasPermission: boolean; setHasPermission: (state: boolean) => void; navigation: any; isTakingPhoto: boolean; 
    setIsTakingPhoto: (state: boolean) => void, go_to_page_story_tab: () => void, data_friend: Array<FriendData>})
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
    const [use_back_camera, set_use_back_camera] = useState(false);
    if (!devices || devices.length === 0) {
    console.error("Không tìm thấy thiết bị camera");
    }

    const device = devices.find((d) => d.position === (use_back_camera ? "back" : "front"));
    if (!device) {
    console.error("Không tìm thấy camera sau");
    }
    const format = useCameraFormat(device, [
        { photoResolution: { width: 1080, height: 1080 }},
        { videoAspectRatio: 1 },
        { videoResolution: { width: 1080, height: 1080 } },
        { fps: 30 }
      ]);
    const [flash_state, set_flash_state] = useState(false);
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
            const photo = await current_camera.current.takePhoto({flash: (flash_state === true  && use_back_camera ) ? "on" : "off" });
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
                            <Icon name="bolt" size={45} color = {flash_state === true ? "#F1B202" : "#FFFFFF" }/>
                        </TouchableOpacity>
                        <TouchableOpacity style={main_screen_styles.centre_button}
                        onPress={()=>{takePhoto()}}>
                            <Image source={require("./GUI/CaptureImageButton.png")}
                            style={main_screen_styles.capture_image_button}></Image>  
                        </TouchableOpacity>
                        <TouchableOpacity style={main_screen_styles.centre_button}
                        onPress={() => {set_use_back_camera(!use_back_camera)}}>
                            <Icon name="photo-camera" size={45} color="#FFFFFF" /> 
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* History Zone */}
            {!isTakingPhoto ? (
                <TouchableOpacity style={main_screen_styles.history_zone} 
                onPress={() => {go_to_page_story_tab()}}>
                    <View style={main_screen_styles.history_child_zone}>
                        <View style={main_screen_styles.history_icon_background}>
                            <Icon name="photo-library" size={24} color="#FFFFFF" />
                        </View>
                        <Text style={main_screen_styles.history_text}>Lịch sử</Text>
                    </View>
                    <Icon name="keyboard-arrow-down" size={45} color="#FFFFFF" /> 
                </TouchableOpacity>
            ) : (
                <View style={main_screen_styles.history_zone_2}>
                    <View style={{display: "flex", flexDirection: "column", marginLeft: width * 0.2, marginRight: 10 ,
                        justifyContent: "center", alignItems: "center"}}>
                        <View style={[main_screen_styles.mini_avatar_border]}>
                            <Icon name="group" size={24} color="#B6B6B6" />
                        </View>
                        <Text style={{fontFamily: "SF-Pro-Rounded-Bold", color: "#7B7B7B"}}>Tất cả</Text>
                    </View>

                    <FlatList
                        data={data_friend}
                        horizontal={true} 
                        keyExtractor={(item: FriendData) => item.id}
                        renderItem={({ item }) => (  
                            <View style={{display: "flex", flexDirection: "column",
                                justifyContent: "center", alignItems: "center"
                            }}>
                                <View style={[main_screen_styles.mini_avatar_border_2]}>
                                    {item.userAvatarURL !== "" ? (
                                        <Image 
                                            style={main_screen_styles.main_avt} 
                                            source={{ uri: item.userAvatarURL }} 
                                        />
                                    ) : (
                                        <UserAvatar size={36} name={`${item.first_name} ${item.last_name}`} />
                                    )}
                                </View>
                                <Text style={{fontFamily: "SF-Pro-Rounded-Bold", color: "#7B7B7B"}}>{item.first_name}</Text>
                            </View>
                        )}
                    />
                </View>
            )}
            
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