import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList} from 'react-native';
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


const MainScreenRoot = ({navigation}: {navigation: any}) => 
{
    const sqlite_db_context = useContext(SqliteDbContext);

// ---------------------------------------------- GET USER DATA ---------------------------------------------------------

    const [first_name, set_first_name] = useState("");
    const [last_name, set_last_name] = useState("");
    const [user_id, set_user_id] = useState("");
    useEffect(()=>
    {
        const get_user_name_from_storage = async () => 
        {
            var first_name = await AsyncStorage.getItem("first_name");
            var last_name = await AsyncStorage.getItem("last_name");
            var _user_id: any = await AsyncStorage.getItem("user_id");
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
            set_user_id(_user_id);
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



// ------------------------------------------------------------ GET LIST FRIEND ------------------------------------------------------

    const [data_friend, set_data_friend] = useState<Array<FriendData>>([]);
    const saveFriendData = async (db: any) => {
    try 
    {
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

        // Cập nhật state
        set_data_friend(newFriends);

        // Tạo bảng nếu chưa tồn tại
        db.transaction((tx: any) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Friend (
                    user_id TEXT NOT NULL,
                    friend_id TEXT NOT NULL,
                    first_name TEXT,
                    last_name TEXT,
                    friend_avt TEXT,
                    PRIMARY KEY (user_id, friend_id)
                )`
            );
        });

       
        db.transaction((tx: any) => {
            data.forEach((friend: any) => {
                tx.executeSql(
                    `INSERT OR REPLACE INTO Friend (user_id, friend_id, first_name, last_name, friend_avt) 
                        VALUES (?, ?, ?, ?, ?)`,
                    [
                        user_id,
                        friend.id,
                        friend.first_name,
                        friend.last_name,
                        friend.userAvatarURL,
                    ],
                    () => {
                        console.log("User added or updated successfully");
                    },
                    (error: any) => {
                        console.error("Error adding or updating friend:", error);
                    }
                );
            });
        });
        } 
        catch (error) 
        {
            console.error("Không thể lưu data friend user", error);
        }
    };

    const get_friend_data = async () => {
        try 
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
        } catch (error) 
        {
            console.error("Error in get_friend_data:", error);
        }
    };

    useEffect(() =>
    {
        const get_data_friend = async () =>
        {
            await saveFriendData(sqlite_db_context.db);
            // get_friend_data();
            console.log(data_friend.length);
        };
        get_data_friend();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => 
        {
            get_friend_data(); 
        }, Number(GET_FRIEND_DATA_COOLDOWN)); 
        return () => clearInterval(intervalId); 
    }, []);

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

// ------------------------------------------------------- GET STORY DATA ------------------------------------------------------------------
    const [list_story, set_list_story] = useState<Array<Story>>([]);

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
                            reset_time TEXT
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
                                        seen: item.seen,
                                        reset_time: item.reset_time
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

// ------------------------------------------------------ GET USER AVATAR ------------------------------------------------------------------

const [user_avt, set_user_avt] = useState("");

const get_user_avt = (user_id: string, db: any) => {
    return new Promise((resolve, reject) => 
    {
      db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT * FROM User WHERE user_id = ?',
            [user_id],
            (tx: any, results: any) => {
            const rows = results.rows;
            let user_avt = null;

            if (rows.length > 0) 
            {
                user_avt = rows.item(0).userAvatarURL; 
            }
            resolve(user_avt !== null ? user_avt : ""); 
          },
          (error: any) => {
            reject('Error retrieving user avatar: ' + error); 
            }
        );
        });
    });
  };

  useEffect(() => {
    const get_avt_from_local = async () =>
    {
        var avt: any = await get_user_avt(user_id, sqlite_db_context.db);
        if(avt !== null && avt !== undefined)
        {
            set_user_avt(avt);
        }

    };
    get_avt_from_local();
  }, []);


    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <UserModal navigation={navigation} first_name={first_name} last_name={last_name} set_first_name={set_first_name} set_last_name={set_last_name} user_modal_refs={user_modal_ref} user_avt={user_avt}/>
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