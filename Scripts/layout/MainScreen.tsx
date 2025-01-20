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
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from './instance/AxiosInstance';
import { FriendDataContext } from './context/FriendDataContext';

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


const { width, height } = Dimensions.get('window');


function MainScreen({navigation, hasPermission, setHasPermission, 
    isTakingPhoto, setIsTakingPhoto, go_to_page_story_tab, current_camera, format, use_back_camera, 
    set_use_back_camera, device}: 
    {hasPermission: boolean; setHasPermission: (state: boolean) => void; 
    navigation: any; isTakingPhoto: boolean; 
    setIsTakingPhoto: (state: boolean) => void, go_to_page_story_tab: () => void, 
    data_friend: Array<FriendData>, current_camera: any, format: any, 
    use_back_camera:boolean, set_use_back_camera: (state: boolean)=>void , device : any})
{      

    const friend_data_context = useContext(FriendDataContext);
    
 
    const [delete_account_modal_state, set_delete_account_modal] = useState(false);
    const toggle_delete_account_modal = () => 
    {
        set_delete_account_modal(!delete_account_modal_state);
    }

    const [selected_friend, set_selected_friend] = useState<string[]>([]);  // FRIEND ĐÃ CHỌN ĐỂ THẤY STORY 
    const [selected_all, set_selected_all] = useState(true); // CHỌN TẤT CẢ FRIEND
    const [flash_state, set_flash_state] = useState(false);  // TRẠNG THÁI FLASH

// ---------------------------------------------------- SETTING CAMERA ------------------------------------------------


// --------------------------------------------------- CHỤP ẢNH -------------------------------------------------------

    const [photoImg, setPhoto] = useState<string | null>(null); 
    const takePhoto = async () => 
    {
        try 
        {
            if (current_camera === undefined || !current_camera.current) 
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

// --------------------------------------------------------------------------------------------------------------------

    const [story_caption, set_story_caption] = useState<string>();

    const resetTakingPhoto = () => 
    {
        setIsTakingPhoto(false);
        setPhoto(null);
        set_story_caption("");
    };

// ---------------------------------------------------------- UP STORY ------------------------------------------------------------------------------------------------

const up_story = async (photoImg: string | null, select_all: boolean, selected_friend : string[], data_fr: Array<FriendData>, story_caption: string | undefined) => 
    {
        try
        {
            const user_id = await AsyncStorage.getItem("user_id");
            if(user_id === undefined || user_id === null)
            {
                return;
            }
            var list_receivers: string[] = [];
            if(select_all)
            {
                data_fr.forEach((item) =>
                {
                    list_receivers.push(item.id);
                });
            }
            else
            {
                list_receivers = selected_friend;
            }
            
            const form_data = new FormData();
            form_data.append("Receivers", list_receivers);
            form_data.append("ImageURL", photoImg);
            form_data.append("Description", story_caption);
            
            
            var res = await AxiosInstance.post("api/story/create_story", form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (res.status === 200)
            {
                console.log("Up story thành công");
                resetTakingPhoto();
            }
            else
            {
                console.log("Up story thất bại");
            }
        }
        catch(error)
        {
            console.log("Up ảnh không thành công");
        }
    }
    
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------

    

    return(
        <View style={main_screen_styles.main_view}>

            {/* Image Zone */}
            <View style={main_screen_styles.image_zone}>
            {isTakingPhoto ? (
                <View style={main_screen_styles.image_zone}>
                {photoImg ? (
                    <View style={{ position: 'relative', width: '100%', height: '100%',
                        display: "flex", alignItems: "center",
                    }}>
                        <Image 
                        source={{uri: photoImg}} 
                        style={{ width: '100%', height: '100%' }} />
                        <View style={main_screen_styles.caption_background}>
                            <TextInput style={[main_screen_styles.caption]}
                            placeholder='Thêm một tin nhắn'
                            placeholderTextColor={"#CACACA"}
                            value={story_caption}
                            onChangeText={(text) => {set_story_caption(text)}}
                            ></TextInput>
                        </View>
                    </View>
                    
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
                        <TouchableOpacity style={[selected_all || selected_friend.length > 0 ? 
                        main_screen_styles.button_enable : main_screen_styles.button_unenable, 
                            {width: 100},
                            {height: 100},
                            {borderRadius: 50}]}    
                            disabled={!selected_all && selected_friend.length === 0}
                            onPress={async () => {
                                await up_story(photoImg, selected_all, selected_friend, friend_data_context.data_friend, story_caption);
                            }}>
                            {selected_all || selected_friend.length > 0 ? (
                                <Icon name="send" size={50} color="#FFFFFF"></Icon>
                            ) : (
                                <Icon name="send" size={50} color="#888888"></Icon>
                            )}
                            
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
                            style={[main_screen_styles.capture_image_button]}></Image>  
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
                    <TouchableOpacity style={{display: "flex", flexDirection: "column", marginLeft: width * 0.2, marginRight: 10 ,
                        justifyContent: "center", alignItems: "center"}}
                        onPress={() => 
                            {
                                set_selected_all(!selected_all);
                            }
                        }>
                        <View style={[
                            (selected_friend.length === 0 && selected_all) ? main_screen_styles.mini_avatar_border_selected :
                            main_screen_styles.mini_avatar_border_unselected]}>
                            <Icon name="group" size={24} color="#B6B6B6" />
                        </View>
                        <Text style={{fontFamily: "SF-Pro-Rounded-Bold", color: "#7B7B7B"}}>Tất cả</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={friend_data_context.data_friend}
                        horizontal={true} 
                        keyExtractor={(item: FriendData) => item.id}
                        renderItem={({ item }) => (  
                            <TouchableOpacity style={{display: "flex", flexDirection: "column",
                                justifyContent: "center", alignItems: "center"
                            }}
                            onPress={() => 
                                {
                                    if (selected_friend.includes(item.id)) 
                                    {
                                        // Nếu đã chọn, loại bỏ item.id khỏi mảng
                                        set_selected_friend(selected_friend.filter((id) => id !== item.id));
                                    } 
                                    else 
                                    {
                                        // Nếu chưa chọn, thêm item.id vào mảng
                                        set_selected_friend([...selected_friend, item.id]);
                                        set_selected_all(false);
                                    }
                              }}>
                                <View style={[
                                    selected_friend.includes(item.id) ? main_screen_styles.mini_avatar_border_2_selected :
                                    main_screen_styles.mini_avatar_border_2_unselected]}>
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
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    )
}

export default MainScreen
