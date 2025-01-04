import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList} from 'react-native';
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
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import DeleteAccountModal from './modals/DeleteAccountModal';
import { CONNECTION_IP } from '@env';
import RNFS from 'react-native-fs'; 
import main_screen_story_tab_styles from './styles/MainScreenStoryTabStyle';
import StoryItem from './components/StoryItem';
import StoryBottomBar from './components/StoryBottomBar';
import main_screen_root_styles from './styles/MainScreenRootStyle';
import PagerView from 'react-native-pager-view';
import MainScreen from './MainScreen';
import MainScreenStoryTab from './MainScreenStoryTab';
import MainScreenHeader from './components/MainScreenHeader';
import BackToMainScreenButton from './components/BackToMainScreenButton';


// Hàm để lấy MIME type từ phần mở rộng của file
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

const MainScreenRoot = ({navigation}: {navigation: any}) => 
{

// ---------------------------------------------- GET USER DATA ---------------------------------------------------------

    const[first_name, set_first_name] = useState("");
    const[last_name, set_last_name] = useState("");
    useEffect(()=>
    {
        const get_user_name_from_storage = async () => 
        {
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

// -----------------------------------------------------------------------------------------------------


// ------------------------------- SET BACK BUTTON --------------------------------
    const [back_button_enable, set_back_button] = useState(false); 
    const pagerViewRef = useRef<PagerView>(null);
    const goToTop = () => 
    {
        if (pagerViewRef.current) 
        {
            console.log(back_button_enable);
            pagerViewRef.current.setPage(0); 
            set_back_button(!back_button_enable);
        
            
        }
    };
    const onPageSelected = (event: any) => 
    {
        const currentPage = event.nativeEvent.position; 
        set_back_button(currentPage === 1); 
    };

// ------------------------------------------------------------------------------------


// ---------------------------------- SET HEADER STATE -----------------------------------


// -------------------------------- USER MODAL ------------------------------------------------
const user_modal_ref = useRef<BottomSheetModal>(null);
    const [user_modal_visible, set_user_modal_visible] = useState(false);
     // Hàm để mở BottomSheetModal

    const handlePresentUserModal = useCallback(() => {
        user_modal_ref.current?.present();
    }, []);

// -----------------------------------------------------------------------------------------------

    const [hasPermission, setHasPermission] = useState(true);
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

    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const [photoImg, setPhoto] = useState<string | null>(null); 
    const current_camera = useRef<Camera>(null);


// -------------------------------------------------------------------------------------------------------------------------------

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <UserModal navigation={navigation} first_name={first_name} last_name={last_name} set_first_name={set_first_name} set_last_name={set_last_name} user_modal_refs={user_modal_ref}/>
                <MainScreenHeader isTakingPhoto={isTakingPhoto} back_button_enable={back_button_enable} handlePresentUserModal={handlePresentUserModal} navigation={navigation} />
                <BackToMainScreenButton 
                    enable={back_button_enable} 
                    scroll_to_top={goToTop} 
                />
                <PagerView
                    ref={pagerViewRef}
                    style={styles.pagerView}
                    initialPage={0}
                    orientation="vertical"
                    onPageSelected={onPageSelected} 
                >
                    <View key="0">
                        <MainScreen navigation={navigation} hasPermission={hasPermission} setHasPermission={setHasPermission} isTakingPhoto={isTakingPhoto} setIsTakingPhoto={setIsTakingPhoto}/>
                    </View>
                    <View key="1">
                        <MainScreenStoryTab/>
                    </View>
                </PagerView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
    },
  });
  
export default MainScreenRoot