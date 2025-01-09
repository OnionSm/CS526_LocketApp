import { useRef, useState, useEffect , createContext, useContext, useCallback, useMemo}  from 'react';
import React from 'react';

import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList} from 'react-native';
import main_screen_story_tab_styles from './styles/MainScreenStoryTabStyle';
import StoryItem from './components/StoryItem';
import StoryBottomBar from './components/StoryBottomBar';
import Carousel from 'react-native-reanimated-carousel';
import { FriendData } from './types/FriendData';
import { format } from 'date-fns';
import { Story } from './types/Strory';
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from './instance/AxiosInstance';


  

const {width, height} = Dimensions.get("window");
const MainScreenStoryTab = ({ data_friend, list_story, set_list_story, goToTop, user_avt }: { data_friend: Array<FriendData>, list_story: Array<Story>, set_list_story: (ls_story: Array<Story>) => void ,
    goToTop: () => void, user_avt: string }) => {
    const [user_id, set_user_id] = useState<string | null>("");

    useEffect(() => {
        const get_user_id = async () => {
            const _user_id = await AsyncStorage.getItem("user_id");
            set_user_id(_user_id);
        };
        get_user_id();
    }, []);

    // Sắp xếp list_story theo create_at từ mới nhất đến cũ nhất
    const sortedListStory = useMemo(() => {
        return [...list_story].sort((a, b) => {
            const dateA = new Date(a.create_at).getTime();
            const dateB = new Date(b.create_at).getTime();
            return dateB - dateA; // Mới nhất trước
        });
    }, [list_story]);

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
    return (
        <View style={main_screen_story_tab_styles.main_view}>
            <Carousel
                ref={ref}
                loop={false}
                width={width}
                height={height}
                data={sortedListStory} // Dữ liệu đã được sắp xếp
                scrollAnimationDuration={150}
                onSnapToItem={(index) => console.log('Current index:', index)}
                renderItem={({ item }) => {
                    if (!item) return <View />;

                    const isUser = user_id === item.uploader_id;
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