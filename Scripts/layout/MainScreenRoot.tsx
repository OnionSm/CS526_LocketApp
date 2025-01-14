import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList,
     Alert} from 'react-native';
import { Camera, useCameraDevices, useCameraPermission, getCameraDevice, useCameraFormat, getCameraFormat, PhotoFile } from 'react-native-vision-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModal from './UserModal';
import ChangeInfoModal from './ChangeInfoModal';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
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
import { Story } from './types/Story';
import { GET_STORY_REQUEST_COOLDOWN } from "@env"
import { GET_USER_DATA_COOLDOWN } from '@env';
import { networkService } from './common/networkService';
import { userService } from './common/userService';
import { userFriendServices } from './common/userFriendServices';
import { sqliteService } from './common/sqliteService';
import SQLite from 'react-native-sqlite-storage';
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
            return 'image/jpeg';
    }
};


const MainScreenRoot = ({navigation}: {navigation: any}) => 
{
    const sqlite_db_context = useContext(SqliteDbContext);

// --------------------------------------------- LOAD AND RELOAD USER DATA -----------------------------------------

    const [user_avt, set_user_avt] = useState("");
    const [first_name, set_first_name] = useState("");
    const [last_name, set_last_name] = useState("");
    const [user_id, set_user_id] = useState("");

    useEffect(() =>
    {
        const get_user_id = async () =>
        {
            var _user_id = await AsyncStorage.getItem("user_id");
            set_user_id(_user_id !== null ? _user_id : "");
        };
        get_user_id();
    }, []);
    
    const get_user_data_from_local = async () =>
    {
        try
        {
            var _first_name = await AsyncStorage.getItem("first_name");
            var _last_name = await AsyncStorage.getItem("last_name");
            var _user_avt = await AsyncStorage.getItem("user_avatar_url");
            
            set_first_name(_first_name !== null ? _first_name : "");
            set_last_name(_last_name !== null ? _last_name : "");
            set_user_avt(_user_avt !== null ? _user_avt : "");
        }
        catch(error)
        {
            console.error("Không thế lấy data user local");
        }
    }

    const get_user_data_from_server = async () => 
    {
        try 
        {   var network_check = await networkService.checkNetwork();
            if(!network_check)
            {
                return;
            }
            var res = await AxiosInstance.get("api/user");
            if(res.status === 200)
            {
                set_first_name(res.data.firstName);
                set_last_name(res.data.lastName);
                set_user_avt(res.data.userAvatarURL);
                
                await userService.save_data_user(res.data, sqlite_db_context.db);
            }
            else 
            {
                console.log("Không thế lấy data user server");
            }
        }
        catch(error)
        {
            console.error("Không thế lấy data user");
        }
    }

    const get_user_data = async () =>
    {
        try
        {
            var network_check = await networkService.checkNetwork();
            if(network_check)
            {
                await get_user_data_from_server();
            }
            else
            {
                await get_user_data_from_local();
            }
        }
        catch(error)
        {
            Alert.alert("Lỗi", "Không thể lấy dữ liệu người dùng");
        }
    }

    useEffect(() => {
        const interval_user = setInterval(async () => 
        {
            await get_user_data();
        }, Number(GET_USER_DATA_COOLDOWN)); 
        return () => clearInterval(interval_user); 
    }, []);

// -----------------------------------------------------------------------------------------------------

// ------------------------------------------------------------ GET LIST FRIEND -----------------------------------

    const [data_friend, set_data_friend] = useState<Array<FriendData>>([]);

    const get_friend_data_from_server = async () => 
    {
        var network_check = await networkService.checkNetwork();
        if(!network_check)
        {
            return;
        }
        // Gọi API để lấy dữ liệu bạn bè
        const res = await AxiosInstance.get("api/user/friend/info");
        if (res.status !== 200) 
        {
            console.log("Không lấy được dữ liệu bạn bè từ API");
            return;
        }

        const data = res.data;
        // Chèn dữ liệu bạn bè vào cơ sở dữ liệu
        const newFriends: Array<FriendData> = [];
        data.forEach((friend: any) => {
            const fr: FriendData = 
            {
                id: friend.id,
                first_name: friend.first_name,
                last_name: friend.last_name,
                userAvatarURL: friend.userAvatarURL,
            };
            newFriends.push(fr);
        });

        var result = await userFriendServices.save_friend_data(user_id, data, sqlite_db_context.db);
        if(result)
        {
            // Cập nhật state
            set_data_friend(newFriends);
        }
    }

    const get_friend_data_from_local = async () => 
    {
        if (user_id === null || user_id === undefined) 
        {
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
                    } 
                    else 
                    {
                        console.log("No friends found for this user.");
                    }
                },
                (_: any , error: any) => {
                    console.error("Error querying Friend table:", error);
                    return false; 
                }
            );
        });
    }

    const get_friend_data = async () => 
    {
        try
        {
            var network_check = await networkService.checkNetwork();
            if(network_check)
            {
                await get_friend_data_from_server();
            }
            else
            {
                await get_friend_data_from_local();
            }
        }
        catch(error)
        {
            console.error("Không thể lấy data friend");
        }
    }

    useEffect(() =>
    {
        const get_data_friend = async () =>
        {
            await get_friend_data();
            console.log(data_friend.length);
        };
        get_data_friend();
    }, []);

    useEffect(() => {
        const intervalfriend = setInterval(async () => 
        {
            await get_friend_data(); 
        }, Number(GET_FRIEND_DATA_COOLDOWN)); 
        return () => clearInterval(intervalfriend); 
    }, []);

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


// ------------------------------------------ GET PERMISSION ----------------------------------------
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
// ---------------------------------------------------------------------------------------------------


// ------------------------------------------------- SETTING CAMERA ----------------------------------------
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const current_camera = useRef<Camera>(null);

    const devices = Camera.getAvailableCameraDevices();
    if (!devices || devices.length === 0) 
    {
        console.error("Không tìm thấy thiết bị camera");
    }
    const [use_back_camera, set_use_back_camera] = useState(false);
    const device = devices.find((d) => d.position === (use_back_camera ? "back" : "front"));
    if (!device) 
    {
    console.error("Không tìm thấy camera sau");
    }
    const format = useCameraFormat(device, [
        { photoResolution: { width: 1080, height: 1080 }},
        { videoAspectRatio: 1 },
        { videoResolution: { width: 1080, height: 1080 } },
        { fps: 30 }
    ]);

// -----------------------------------------------------------------------------------------------------





// ------------------------------------------- DELETE STORY IMAGE ----------------------------------------

    useEffect(() => {
        const delete_story_image = () =>
        {
            try
            {
                if (user_id == null || user_id == undefined)
                {
                    return;
                }
                sqlite_db_context.db.transaction((tx: any) => {
                    // Kiểm tra và tạo bảng nếu chưa tồn tại
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS Story (
                            user_id TEXT,
                            story_id TEXT,
                            uploader_id TEXT,
                            image TEXT,
                            description TEXT,
                            create_at TEXT,
                            seen INTEGER,
                            reset_time TEXT
                            PRIMARY KEY (user_id, story_id)
                        )`
                    );
                    // Lệnh UPDATE với điều kiện
                    tx.executeSql(
                        `UPDATE Story
                        SET image = ""
                        WHERE reset_time < ?`,
                        [Date.now() - 3 * 24 * 60 * 60 * 1000], // Lấy timestamp hiện tại trừ đi 3 ngày
                        () => {
                            console.log("Cập nhật thành công các Story cũ.");
                        },
                        (error: any) => {
                            console.log("Lỗi khi cập nhật Story:", error);
                        }
                    );
                });

            }
            catch(error)
            {

            }
        };
        delete_story_image();
    }, [])

// ------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------------- GET STORY DATA ------------------------------------------------------------------
    const [list_story, set_list_story] = useState<Array<Story>>([]);
    
    const get_story_data_from_local = async () =>
    {
        try
        {
            if (user_id == null || user_id == undefined)
            {
                return;
            }
            console.log("statrting get data from local");

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
                        reset_time TEXT,
                        PRIMARY KEY (user_id, story_id)
                    )`,
                    [],
                    () => console.log("Story Table created or already exists"),
                    (error: any) => {
                        console.error("Error creating table:", error);
                    }
                );
                tx.executeSql(
                    `SELECT * 
                    FROM Story 
                    WHERE user_id = ?`,
                    [user_id],
                    (_: any, resultSet: any) => {
                        console.log("result set", resultSet);
                        if (resultSet.rows.length > 0) 
                        {
                            const stories: Array<Story> = [];
                            for (let i = 0; i < resultSet.rows.length; i++) 
                            {
                                const item = resultSet.rows.item(i);
                                console.log("Item local", item);
                                const story: Story = 
                                {
                                    story_id: item.story_id,
                                    uploader_id: item.uploader_id,
                                    image: item.image,
                                    description: item.description,
                                    create_at: item.create_at,
                                    seen: item.seen === 0 ? false : true, 
                                    reset_time: item.reset_time
                                };

                                stories.push(story);
                            }
                            const sorted = [...stories].sort((a, b) => {
                                const dateA = new Date(a.create_at).getTime();
                                const dateB = new Date(b.create_at).getTime();
                                return dateB - dateA; // Sắp xếp theo ngày mới nhất trước
                            });
                            console.log("data" ,sorted);
                            set_list_story(sorted);
                            
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
            console.error("Error in get list story:", error);
        }
    };

    const get_story_data_from_server = async () => 
    {
        try
        {
            var network_check = await networkService.checkNetwork();
            if(!network_check)
            {
                return;
            }
            var ls_story : string[] = [];
            list_story.forEach(item => {
                if(item.image === "")
                {
                    ls_story.push(item.story_id);   
                }
            });
            console.log("story item must get", ls_story.length);
            var form_data = new FormData();
            form_data.append("list_story_in_user", ls_story);
            var res = await AxiosInstance.post("api/story/get_story", form_data, 
            {
                headers: 
                {
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
                        reset_time: new Date().toString()
                    };
            
                    // Thêm vào danh sách
                    list_story_respone.push(st);
                  
                });
                const sorted = [...list_story_respone].sort((a, b) => {
                    const dateA = new Date(a.create_at).getTime();
                    const dateB = new Date(b.create_at).getTime();
                    return dateB - dateA; // Sắp xếp theo ngày mới nhất trước
                });
                
                set_list_story(sorted);

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
                            reset_time TEXT,
                            PRIMARY KEY (user_id, story_id)
                        )`,
                        [],
                        () => console.log("Table created or already exists"),
                        (error: any) => {
                            console.error("Error creating table:", error);
                        }
                    );

                    let successCount = 0;
                    let errorOccurred = false;
                    console.log("insert story to local")
                    // Duyệt qua danh sách và chèn hoặc cập nhật từng bản ghi
                    list_story_respone.forEach((story: any) => {
                        tx.executeSql(
                            `INSERT OR REPLACE INTO Story 
                                (user_id, story_id, uploader_id, image, description, create_at, seen, reset_time) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                            [
                                user_id,
                                story.story_id,
                                story.uploader_id,
                                story.image,
                                story.description,
                                story.create_at,
                                story.seen ? 1: 0, // Chuyển boolean sang số nguyên
                                Date.now().toString()
                            ],
                            () => {
                                successCount++;
                                console.log(`Story ${story.story_id} inserted/updated successfully.`);

                                // Kiểm tra xem tất cả bản ghi đã được xử lý
                                if (successCount === list_story_respone.length && !errorOccurred) {
                                    console.log("All stories processed successfully.");
                                }
                            },
                            (error: any) => {
                                console.error(`Error adding/updating story ${story.story_id}:`, error);
                                errorOccurred = true;
                            }
                        );
                    });

                    // Kiểm tra cuối cùng ngoài vòng lặp (nếu cần)
                    if (errorOccurred) 
                    {
                        console.warn("Some errors occurred while processing stories.");
                    }
                });
            }
        }
        catch(error)
        {
            console.error(error);
        }
    };

    const get_story_data = async () =>
    {
        try
        {
            var network_check = await networkService.checkNetwork();
            if(network_check)
            {
                await get_story_data_from_local();
                await get_story_data_from_server();
            }
            else
            {
                await get_story_data_from_local();
            }
        }
        catch
        {

        }
    }
    useEffect(()=>
    {
        get_story_data();
    }, []);

   
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
        <>
            <UserModal navigation={navigation} first_name={first_name} last_name={last_name} set_first_name={set_first_name} set_last_name={set_last_name} user_modal_refs ={user_modal_ref} user_avt={user_avt}/>
            <MainScreenHeader isTakingPhoto={isTakingPhoto} back_button_enable={back_button_enable} handlePresentUserModal={handlePresentUserModal} 
            navigation={navigation} data_friend={data_friend} set_data_friend={set_data_friend} user_avt={user_avt}/>
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
                offscreenPageLimit={1} // Giữ tối đa 1 trang ở mỗi bên
            >
                <View key="0">
                    <MainScreen 
                        navigation={navigation} 
                        hasPermission={hasPermission} 
                        setHasPermission={setHasPermission} 
                        data_friend={data_friend}
                        isTakingPhoto={isTakingPhoto} 
                        setIsTakingPhoto={setIsTakingPhoto} 
                        go_to_page_story_tab={go_to_page_story_tab}
                        current_camera={current_camera}
                        format={format}
                        use_back_camera={use_back_camera}
                        set_use_back_camera={set_use_back_camera}
                        device={device}
                    />
                </View>
                <View key="1">
                    <MainScreenStoryTab 
                        data_friend={data_friend} 
                        list_story={list_story} 
                        set_list_story={set_list_story}
                        goToTop={goToTop}
                        user_avt={user_avt}
                    />
                </View>
            </PagerView>
        </>

    );
};

const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
    },
  });
  
export default MainScreenRoot