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
import Carousel from 'react-native-reanimated-carousel';
import { FriendData } from './types/FriendData';
import { format } from 'date-fns';

const data_story = [
    {
        user_id: "672c578b8e3961bfae1a08c4",
        description : "Lalala",
        created_at: "2024-11-07T11:20:38.298+00:00"
    },
    {
        user_id: "672c578b8e3961bfae1a08c4",
        description : "Lalala",
        created_at: "2024-11-07T11:20:38.298+00:00"
    },
    {
        user_id: "672c578b8e3961bfae1a08c4",
        description : "Lalala",
        created_at: "2024-11-07T11:20:38.298+00:00"
    },
    {
        user_id: "672c578b8e3961bfae1a08c4",
        description : "Lalala",
        created_at: "2024-11-07T11:20:38.298+00:00"
    },
    {
        user_id: "672c578b8e3961bfae1a08c4",
        description : "Lalala",
        created_at: "2024-11-07T11:20:38.298+00:00"
    }
]
const renderStoryItem = ({ item, data }: { item: any, data: Array<FriendData> | null }) => {
    // Kiểm tra điều kiện null hoặc undefined của item
    if (!item || !data) return null;
  
    // Tìm uploader trong data
    const uploader = data.find(fr => fr.id === item.user_id);
  
    // Nếu không tìm thấy uploader, trả về null
    if (!uploader) return null;
  
    // Chuyển đổi ngày tháng
    const date = new Date(item.created_at);
    const formattedDate = format(date, 'HH:mm dd:MM:yyyy');
    
    // Trả về StoryItem nếu tất cả các điều kiện hợp lệ
    return (
      <StoryItem
        story_img={item.image_url}
        caption={item.description}
        uploader_avt={uploader.userAvatarURL}
        uploader_name={uploader.first_name}
        upload_time={formattedDate}
      />
    );
  };
  
const {width, height} = Dimensions.get("window");
const MainScreenStoryTab = ({data_friend}: {data_friend: Array<FriendData> | null}) =>
{
    return(
        <View style={main_screen_story_tab_styles.main_view}>
            <Carousel
                loop={false}
                width={width}
                height={height}
                data={data_story}
                scrollAnimationDuration={150}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({item}) =>
                renderStoryItem({item,  data_friend})}
                vertical={true}
            />
            <StoryBottomBar></StoryBottomBar>
        </View>
    )
};

export default MainScreenStoryTab

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });