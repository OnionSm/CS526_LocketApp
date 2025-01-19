import { useRef, useState, useEffect , createContext, useContext, useCallback, useMemo}  from 'react';
import React from 'react';

import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList,
     Alert} from 'react-native';
import main_screen_story_tab_styles from './styles/MainScreenStoryTabStyle';
import StoryItem from './components/StoryItem';
import StoryBottomBar from './components/StoryBottomBar';
import Carousel from 'react-native-reanimated-carousel';
import { FriendData } from './types/FriendData';
import { format } from 'date-fns';
import { Story } from './types/Story';
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from './instance/AxiosInstance';
import GridStoryModal from './GridStoryModal';
import BottomSheet from '@gorhom/bottom-sheet';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserDataContext } from './context/UserDataContext';

  

const {width, height} = Dimensions.get("window");
const MainScreenStoryTab = ({ data_friend, list_story, set_list_story, goToTop, user_avt }: { data_friend: Array<FriendData>, list_story: Array<Story>, set_list_story: (ls_story: Array<Story>) => void ,
    goToTop: () => void, user_avt: string}) => 
{
    const user_data_context = useContext(UserDataContext);
        

    

    // // Sắp xếp list_story theo create_at từ mới nhất đến cũ nhất
    // const sortedListStory = useMemo(() => {
    //     return [...list_story].sort((a, b) => {
    //         const dateA = new Date(a.create_at).getTime();
    //         const dateB = new Date(b.create_at).getTime();
    //         return dateB - dateA; // Mới nhất trước
    //     });
    // }, [list_story]);

    const ref = React.useRef<ICarouselInstance>(null);

    const handleGoToFirstPage = () => {
        if (ref.current) {
            ref.current.scrollTo({ index: 0, animated: true });
        }
    };

// ------------------------------------------------------ GET STORY IMAGE -------------------------------------------------------

const get_story_image = async (str_id: string) => {
    try {
        // Chuẩn bị FormData
        const formData = new FormData();
        formData.append("story_id", str_id);

        // Gửi yêu cầu POST đến API
        const res = await AxiosInstance.post("api/story/get_story/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Xử lý kết quả trả về từ API
        if (res.status === 200) 
        {
            const updatedStories = list_story.map((story) => 
                story.story_id === str_id 
                    ? { ...story, image: res.data.imageURL } 
                    : story
            );

            // Cập nhật danh sách câu chuyện
            set_list_story(updatedStories);
        } 
        else 
        {
            console.error("Không thể lấy hình ảnh cho story:", res.status);
        }
    } catch (error) {
        console.error("Lỗi khi lấy hình ảnh cho story:", error);
    }
};


// ---------------------------------------------------------------------------------------------------------------------------------

    const grid_story_modal_ref = useRef<BottomSheetModal>(null);

    const open_grid_story_modal =() => 
    {
        grid_story_modal_ref.current?.present();
    };


    const [comment_visible, set_comment_visible] = useState(true);
    const [comment, set_comment] = useState("");
    const [current_story, set_current_story] = useState("");


    const send_story_message = async () =>
    {
        try
        {
            if(current_story === "")
            {
                Alert.alert("Lỗi", "Không thể gửi tin nhắn");
                return;
            }
            var form_data = new FormData();
            form_data.append("story_id", current_story);
            form_data.append("Content", comment);
            // var res = await AxiosInstance.post("api/message", form_data,
            // {
            //     headers: 
            //     {
            //         "Content-Type": "multipart/form-data"
            //     }
            // });
            // if(res.status === 200)
            // {
            //     console.log("Gửi tin nhắn thành công");
            // }
            // else
            // {
            //     Alert.alert("Lỗi", "Không thể gửi tin nhắn.");
            // }
            console.log("FORM MESSAGE DATA", form_data);
        }
        catch
        {
            Alert.alert("Lỗi", "Không thể gửi tin nhắn");
        }
        
    }

    useEffect
    return (
        <View style={main_screen_story_tab_styles.main_view}>
            <GridStoryModal grid_story_modal_ref={grid_story_modal_ref} data_story={list_story} ></GridStoryModal>
            <Carousel
                ref={ref}
                loop={false}
                width={width}
                height={height}
                data={list_story} // Dữ liệu đã được sắp xếp
                scrollAnimationDuration={150}
                onSnapToItem={(index) =>{
                    const currentItem = list_story[index]; // Lấy item hiện tại
                    console.log('Current index:', index);
                    set_comment_visible(currentItem.uploader_id !== user_data_context.user_id)
                    set_current_story(currentItem.story_id);
                }}
                renderItem={({ item }) => {
                    if (!item) return <View />;

                    const isUser = user_data_context.user_id === item.uploader_id;
                    const uploader = isUser
                        ? { userAvatarURL: user_avt, first_name: "Bạn", last_name: "" }
                        : data_friend?.find((fr) => fr.id === item.uploader_id);

                    if (!uploader) return <View />;

                    // // Kiểm tra và gọi hàm lấy hình ảnh nếu `image === ""` và là của người dùng
                    // if (isUser && item.image === "") 
                    // {
                    //     get_story_image(item.story_id);
                    // }

                    const formattedDate = format(
                        new Date(item.create_at),
                        'HH:mm dd-MM-yyyy'
                    );

                    return (
                        <StoryItem
                            story_img={item.image}
                            caption={item.description}
                            uploader_avt={uploader.userAvatarURL}
                            uploader_firstname={uploader.first_name}
                            uploader_lastname={uploader.last_name}
                            upload_time={formattedDate}
                        />
                    );
                }}
                vertical={true}
            />
            <StoryBottomBar
                goToTop={goToTop}
                handleGoToFirstPage={handleGoToFirstPage}
                open_grid_story_modal={open_grid_story_modal}
                comment_visible={comment_visible}
                comment={comment}
                set_comment={set_comment}
                current_story={current_story}
                send_story_message={send_story_message}
            />
        </View>
    );
};

export default MainScreenStoryTab

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });