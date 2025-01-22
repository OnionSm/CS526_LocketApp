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
import { UserMessageContext } from './context/UserMessageContext';
import { FriendDataContext } from './context/FriendDataContext';
import { UserDataContext } from './context/UserDataContext';
import { StoryDataContext } from './context/StoryDataContext';
import _ from 'lodash';
import { Conversation } from './types/Conversation';
import { Message } from './types/Message';
import { ConversationParticipant } from './types/ConversationParticipant';
import { UserConversation } from './types/UserConversation';

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
    const user_message_context = useContext(UserMessageContext);
    const friend_data_context = useContext(FriendDataContext);
    const user_data_context = useContext(UserDataContext);
    const story_data_context = useContext(StoryDataContext);

// --------------------------------------------- LOAD AND RELOAD USER DATA -----------------------------------------

    

    useEffect(() =>
    {
        const get_user_id = async () =>
        {
            var _user_id = await AsyncStorage.getItem("user_id");
            user_data_context.set_user_id(_user_id !== null ? _user_id : "");
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
            
            user_data_context.set_first_name(_first_name !== null ? _first_name : "");
            user_data_context.set_last_name(_last_name !== null ? _last_name : "");
            user_data_context.set_user_avt(_user_avt !== null ? _user_avt : "");
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
                user_data_context.set_first_name(res.data.firstName);
                user_data_context.set_last_name(res.data.lastName);
                user_data_context.set_user_avt(res.data.userAvatarURL);
                
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

        var result = await userFriendServices.save_friend_data(user_data_context.user_id, data, sqlite_db_context.db);
        if(result)
        {
            // Cập nhật state
            friend_data_context.set_data_friend(newFriends);
        }
    }

    const get_friend_data_from_local = async () => 
    {
        if (user_data_context.user_id === null || user_data_context.user_id === undefined) 
        {
            console.error("User ID is null or undefined.");
            return;
        }

        sqlite_db_context.db.transaction((tx: any) => {
            tx.executeSql(
                `SELECT * 
                FROM Friend
                WHERE user_id == ?`, 
                [user_data_context.user_id],
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
                        friend_data_context.set_data_friend(friends);
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
            user_message_context.set_data_friend(friend_data_context.data_friend);
            console.log("num friend",friend_data_context.data_friend.length);
        };
        get_data_friend();
    }, []);

    useEffect(() => {
        const intervalfriend = setInterval(async () => 
        {
            await get_friend_data(); 
            user_message_context.set_data_friend(friend_data_context.data_friend);
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
                if (user_data_context.user_id == null || user_data_context.user_id == undefined)
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
                        WHERE datetime(reset_time) < datetime(?, '-7 days')`,
                        [new Date().toISOString()], // Thời điểm hiện tại (ISO 8601 format)
                        () => {
                            console.log("Cập nhật thành công các bản ghi cũ hơn 7 ngày.");
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
    
    const get_story_data_from_local = async () =>
    {
        try
        {
            if (user_data_context.user_id == null || user_data_context.user_id == undefined)
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
                    [user_data_context.user_id],
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
                            story_data_context.set_list_story(sorted);
                            
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
            story_data_context.list_story.forEach((item: Story) => {
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
                
                story_data_context.set_list_story(sorted);

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
                        () => console.log("Table Story created or already exists"),
                        (error: any) => {
                            console.error("Error Story creating table:", error);
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
                                user_data_context.user_id,
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


// ------------------------------------------- GET USER CONVERSATION ---------------------------------------------


    const get_latest_message_from_local = async () => 
    {
        try 
        {
            const local_list_messages: Array<Message> = [];
            const list_conversations: Array<Conversation> = [];
            const list_participants: Array<ConversationParticipant> = [];

            // Hàm thực hiện truy vấn SQLite và trả về Promise
            const executeSqlAsync = (query: string, params: any[]): Promise<any> => 
            {
                return new Promise((resolve, reject) => 
                {
                    sqlite_db_context.db.transaction((tx: any) => 
                    {
                        tx.executeSql(
                            query,
                            params,
                            (_: any, result: any) => resolve(result),
                            (_: any, error: any) => reject(error)
                        );
                    });
                });
            };

            // Truy vấn tin nhắn
            const messageResult = await executeSqlAsync(
                `SELECT * FROM Message WHERE user_id = ?`,
                [user_data_context.user_id]
            );
            if (messageResult.rows.length > 0) 
            {
                for (let i = 0; i < messageResult.rows.length; i++) 
                {
                    const item = messageResult.rows.item(i);
                    local_list_messages.push({
                        id: item.message_id,
                        conversationId: item.conversation_id,
                        content: item.content,
                        replyToStoryId: item.reply_to_story_id,
                        sendAt: item.send_at,
                        senderId: item.sender_id,
                        status: item.status,
                    });
                }
            }

            // Truy vấn người tham gia
            const participantResult = await executeSqlAsync(
                `SELECT * FROM ConversationParticipant WHERE user_id = ?`,
                [user_data_context.user_id]
            );
            if (participantResult.rows.length > 0) 
            {
                for (let i = 0; i < participantResult.rows.length; i++) 
                {
                    const item = participantResult.rows.item(i);
                    list_participants.push({
                        conversation_id: item.conversation_id,
                        participant_id: item.participant_id,
                    });
                }
            }

            // Truy vấn cuộc trò chuyện
            const conversationResult = await executeSqlAsync(
                `SELECT * FROM Conversation WHERE user_id = ?`,
                [user_data_context.user_id]
            );
            if (conversationResult.rows.length > 0) 
            {
                const messageMap = new Map<string, Message>();
                const participantMap = new Map<string, Set<string>>();

                // Tạo Map để tra cứu tin nhắn nhanh hơn
                local_list_messages.forEach((message) =>
                {
                    messageMap.set(message.id, message);
                });

                // Tạo Map để tra cứu danh sách người tham gia nhanh hơn
                list_participants.forEach((participant) => 
                {
                    if (!participantMap.has(participant.conversation_id)) 
                    {
                        participantMap.set(participant.conversation_id, new Set());
                    }
                    participantMap.get(participant.conversation_id)?.add(participant.participant_id);
                });

                // Duyệt qua danh sách cuộc trò chuyện
                for (let i = 0; i < conversationResult.rows.length; i++) 
                {
                    const item = conversationResult.rows.item(i);
                    const lastMessage = messageMap.get(item.last_message_id) || null;
                    const participants = Array.from(participantMap.get(item.conversation_id) || []);

                    list_conversations.push({
                        id: item.conversation_id,
                        createdAt: item.created_at,
                        updatedAt: item.updated_at,
                        lastMessage: lastMessage,
                        listMessages: [],
                        participants: participants,
                    });
                }
            } 
            else 
            {
                console.log("No conversation for this user.");
            }
            let new_user_conversations: UserConversation = {
                id: "",
                userId: "",
                userConversations: []
            };
            new_user_conversations.userConversations = list_conversations;
            user_message_context.set_user_conversations(new_user_conversations);
            

            console.log("Conversations:", list_conversations);
        } 
        catch (error) 
        {
            console.error("Failed to get the latest messages from local:", error);
        }
    };


    const get_latest_message_from_server = async () => 
    {
        try 
        {
            const res = await AxiosInstance.get("api/userconversation/get_latest_message");
            if (res.status === 200) {
                console.log("CONVERSATION", res.data);
    
                const currentConversations = user_message_context.user_conversations;
    
                // So sánh sâu (deep comparison)
                const isDifferent = !_.isEqual(res.data, currentConversations);
    
                if (isDifferent) {
                    user_message_context.set_user_conversations(res.data);
    
                    sqlite_db_context.db.transaction((tx: any) => {
                        // Tạo bảng nếu chưa tồn tại
                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS Conversation (
                                user_id TEXT,
                                conversation_id TEXT,
                                last_message_id TEXT,
                                created_at TEXT,
                                updated_at TEXT,
                                PRIMARY KEY (user_id, conversation_id)
                            )`,
                            [],
                            () => console.log("Table Conversation created or already exists"),
                            (error: any) => console.error("Error creating table Conversation:", error)
                        );
    
                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS Message (
                                user_id TEXT,
                                message_id TEXT,
                                conversation_id TEXT,
                                sender_id TEXT,
                                content TEXT,
                                status TEXT,
                                send_at TEXT,
                                reply_to_story_id TEXT,
                                PRIMARY KEY (user_id, message_id)
                            )`,
                            [],
                            () => console.log("Table Message created or already exists"),
                            (error: any) => console.error("Error creating table Message:", error)
                        );
    
                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS ConversationParticipant (
                                user_id TEXT,
                                conversation_id TEXT,
                                participant_id TEXT,
                                PRIMARY KEY (user_id, conversation_id, participant_id)
                            )`,
                            [],
                            () => console.log("Table ConversationParticipant created or already exists"),
                            (error: any) => console.error("Error creating table ConversationParticipant:", error)
                        );
    
                        // Chèn hoặc cập nhật từng bản ghi
                        res.data.userConversations.forEach((conversation: any) => {
                            const {
                                id: conversation_id,
                                lastMessage,
                                createdAt,
                                updatedAt,
                                participants,
                            } = conversation;
    
                            // Chèn dữ liệu vào bảng Conversation
                            tx.executeSql(
                                `INSERT OR REPLACE INTO Conversation 
                                    (user_id, conversation_id, last_message_id, created_at, updated_at) 
                                    VALUES (?, ?, ?, ?, ?)`,
                                [
                                    user_data_context.user_id,
                                    conversation_id,
                                    lastMessage?.id || null,
                                    createdAt,
                                    updatedAt,
                                ],
                                () => console.log(`Conversation ${conversation_id} processed.`),
                                (error: any) =>
                                    console.error(`Error adding/updating conversation ${conversation_id}:`, error)
                            );
    
                            // Chèn dữ liệu vào bảng Message
                            if (lastMessage) {
                                const {
                                    id: message_id,
                                    senderId,
                                    content,
                                    status,
                                    sendAt,
                                    replyToStoryId,
                                } = lastMessage;
    
                                tx.executeSql(
                                    `INSERT OR REPLACE INTO Message
                                        (user_id, message_id, conversation_id, sender_id, content, status, send_at, reply_to_story_id)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                                    [
                                        user_data_context.user_id,
                                        message_id,
                                        conversation_id,
                                        senderId,
                                        content,
                                        status,
                                        sendAt,
                                        replyToStoryId || null,
                                    ],
                                    () => console.log(`Message ${message_id} processed.`),
                                    (error: any) =>
                                        console.error(`Error adding/updating message ${message_id}:`, error)
                                );
                            }
    
                            // Chèn dữ liệu vào bảng ConversationParticipant
                            participants.forEach((participant: string) => {
                                tx.executeSql(
                                    `INSERT OR REPLACE INTO ConversationParticipant
                                        (user_id, conversation_id, participant_id)
                                        VALUES (?, ?, ?)`,
                                    [user_data_context.user_id, conversation_id, participant],
                                    () =>
                                        console.log(
                                            `Participant ${participant} added to conversation ${conversation_id}.`
                                        ),
                                    (error: any) =>
                                        console.error(
                                            `Error adding participant ${participant} to conversation ${conversation_id}:`,
                                            error
                                        )
                                );
                            });
                        });
                    });
                } else {
                    console.log("No changes in conversations");
                }
            }
        } catch (error) {
            console.log("Can not get latest message", error);
        }
    };

    const get_latest_message = async () =>
    {
        try
        {
            var network_check = await networkService.checkNetwork();
            if(network_check)
            {
                await get_latest_message_from_server();
            }
            else
            {
                await get_latest_message_from_local();
            }
        }
        catch(error)
        {
            console.error("Can not get latest message data");
        }
    }
    
    useEffect(()=>
    {
        get_latest_message();
    }, []);

    useEffect(() => 
    { 
        const intervalNewMessage = setInterval(async () => 
        {
            var network_check = await networkService.checkNetwork();
            if(network_check)
            {
                await get_latest_message_from_server(); 
            }
        }, Number(GET_STORY_REQUEST_COOLDOWN)); 
        return () => clearInterval(intervalNewMessage);
    }, []);

// --------------------------------------------------------------------------------------------------------------
    return (
        <>
            <MainScreenHeader isTakingPhoto={isTakingPhoto} back_button_enable={back_button_enable} handlePresentUserModal={handlePresentUserModal} 
            navigation={navigation} data_friend={friend_data_context.data_friend} set_data_friend={friend_data_context.set_data_friend} user_avt={user_data_context.user_avt}/>
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
                        data_friend={friend_data_context.data_friend}
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
                        goToTop={goToTop}
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