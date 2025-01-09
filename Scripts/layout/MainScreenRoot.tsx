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
import { GET_FRIEND_DATA_COOLDOWN } from '@env';
import { GET_FRIEND_REQUEST_COOLDOWN } from '@env';
import { SqliteDbContext } from './context/SqliteDbContext';
import { FriendData } from './types/FriendData';
import AxiosInstance from './instance/AxiosInstance';
import { Story } from './types/Strory';
import { GET_STORY_REQUEST_COOLDOWN } from "@env"



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

    const sqlite_db_context = useContext(SqliteDbContext);

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



// ------------------------------------ HISTORY BUTTON -------------------------------------------

    const go_to_page_story_tab = () => 
    {
        if (pagerViewRef.current) 
        {
            console.log(back_button_enable);
            pagerViewRef.current.setPage(1); 
            set_back_button(!back_button_enable);
        
            
        }
    };

// ---------------------------------- SET HEADER STATE -----------------------------------


// -------------------------------- USER MODAL ------------------------------------------------
    const user_modal_ref = useRef<BottomSheetModal>(null);
    const [user_modal_visible, set_user_modal_visible] = useState(false);
     // Hàm để mở BottomSheetModal

    const handlePresentUserModal = useCallback(() => {
        user_modal_ref.current?.present();
    }, []);

// -----------------------------------------------------------------------------------------------

    const [hasPermission, setHasPermission] = useState(false);
    const getPermission = async () => 
    {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === "granted");
        return;
    };
    useEffect(() =>
    {
        if(!hasPermission)
        {
            getPermission();
        }
    },[]);

    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const [photoImg, setPhoto] = useState<string | null>(null); 
    const current_camera = useRef<Camera>(null);

// -----------------------------------------------------------------------------------------------------



// ------------------------------------------------------------ GET LIST FRIEND ------------------------------------------------------

    const [data_friend, set_data_friend] = useState<Array<FriendData>>([]);

        
    const get_friend_data = async () => {
        try {

            var user_id = await AsyncStorage.getItem("user_id");
            if (!user_id) {
                console.error("User ID is null or undefined.");
                return;
            }

            sqlite_db_context.db.transaction((tx: any) => {
                tx.executeSql(
                    `SELECT * 
                    FROM Friend
                    WHERE user_id == ?`, 
                    [user_id],
                    (_: any, resultSet: any) => {
                        if (resultSet.rows.length > 0) 
                        {
                            const friends: Array<FriendData> = [];
                            for (let i = 0; i < resultSet.rows.length; i++) 
                            {
                                const item = resultSet.rows.item(i);
                    
                                const friend: FriendData = 
                                {
                                    id: item.friend_id, 
                                    first_name: item.first_name,
                                    last_name: item.last_name,
                                    userAvatarURL: item.friend_avt
                                };

                                friends.push(friend);
                            }
                            set_data_friend(friends);
                        } else {
                            console.log("No friends found for this user.");
                        }
                    },
                    (_: any , error: any) => {
                        console.error("Error querying Friend table:", error);
                        return false; 
                    }
                );
            });
        } catch (error) {
            console.error("Error in get_friend_data:", error);
        }
    };
    get_friend_data();

    useEffect(() => {
        const intervalId = setInterval(() => 
        {
            get_friend_data(); 
        }, Number(GET_FRIEND_DATA_COOLDOWN)); 
        return () => clearInterval(intervalId); 
    }, []);


// ------------------------------------------------------- GET STORY DATA ------------------------------------------------------------------
    const [list_story, set_list_story] = useState<Array<Story>>([]);
    var user_id = AsyncStorage.getItem("user_id");
    useEffect(() => {
        const get_list_story_from_local_storage = async () =>
        {
            try
            {
                if (user_id == null || user_id == undefined)
                {
                    return;
                }

                sqlite_db_context.db.transaction((tx: any) => {
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS Story (
                            user_id TEXT,
                            story_id TEXT,
                            uploader_id TEXT,
                            image TEXT,
                            description TEXT,
                            create_at TEXT,
                            seen INTEGER,
                            PRIMARY KEY (user_id, story_id)
                        )`
                    );
                    tx.executeSql(
                        `SELECT * 
                        FROM Story 
                        WHERE user_id = ?`,
                        [user_id],
                        (_: any, resultSet: any) => {
                            if (resultSet.rows.length > 0) 
                            {
                                const stories: Array<Story> = [];
                                for (let i = 0; i < resultSet.rows.length; i++) 
                                {
                                    const item = resultSet.rows.item(i);
                        
                                    const story: Story = 
                                    {
                                        story_id: item.story_id,
                                        uploader_id: item.uploader_id,
                                        image: item.image,
                                        description: item.description,
                                        create_at: item.create_at,
                                        seen: item.seen
                                    };

                                    stories.push(story);
                                }
                                set_list_story(stories);
                            } 
                            else 
                            {
                                console.log("No story for this user.");
                            }
                        },
                        (_: any , error: any) => {
                            console.error("Error querying Story table:", error);
                            return false; 
                        }
                    );
                });
            }
            catch (error)
            {
                console.log("Error in get list story:", error);
            }
        };
        get_list_story_from_local_storage();
    }, []);

    const get_story_data_from_server = async () => 
        {
            try
            {
                var ls_story : string[] = [];
                list_story.forEach(item => {
                    ls_story.push(item.story_id);
                });
                var form_data = new FormData();
                form_data.append("list_story_in_user", ls_story);
                var res = await AxiosInstance.post("api/story/get_story", form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (res.status === 200) 
                {
                    // Tạo danh sách để chứa các câu chuyện
                    const list_story_respone: Array<Story> = [];
                
                    // Duyệt qua từng phần tử trong res.data
                    res.data.forEach((story: any) => {
                
                        // Tạo đối tượng Story
                        const st: Story = {
                            story_id: story.id,
                            uploader_id: story.userId,
                            image: story.imageURL,
                            description: story.description,
                            create_at: story.created_at,
                            seen: story.seen,
                        };
                
                        // Thêm vào danh sách
                        list_story_respone.push(st);
                    });
                
                    // Cập nhật state với danh sách mới
                    set_list_story(list_story_respone);
                }
                
            }
            catch(error)
            {
                console.error(error);
            }
        };

    useEffect(() => 
    {
        const intervalStory = setInterval(() => 
        {
            get_story_data_from_server(); 
        }, Number(GET_STORY_REQUEST_COOLDOWN)); 
        return () => clearInterval(intervalStory);
    }, []);
// --------------------------------------------------------------------------------------------------------------------------------------

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <UserModal navigation={navigation} first_name={first_name} last_name={last_name} set_first_name={set_first_name} set_last_name={set_last_name} modalRef={ () => user_modal_ref.current?.present()}/>
                <MainScreenHeader isTakingPhoto={isTakingPhoto} back_button_enable={back_button_enable} handlePresentUserModal={handlePresentUserModal} 
                navigation={navigation} data_friend={data_friend} set_data_friend={set_data_friend}/>
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
                        <MainScreen navigation={navigation} hasPermission={hasPermission} setHasPermission={setHasPermission} data_friend={data_friend} 
                        isTakingPhoto={isTakingPhoto} setIsTakingPhoto={setIsTakingPhoto} go_to_page_story_tab={go_to_page_story_tab}/>
                    </View>
                    <View key="1">
                        <MainScreenStoryTab data_friend={data_friend} list_story={list_story} goToTop={goToTop}/>
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