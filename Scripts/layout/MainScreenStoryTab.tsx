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
import { Story } from './types/Strory';
import type { ICarouselInstance } from "react-native-reanimated-carousel";


  
const {width, height} = Dimensions.get("window");
const MainScreenStoryTab = ({data_friend, list_story, goToTop}: {data_friend: Array<FriendData>,  list_story: Array<Story> , goToTop: () => void}) =>
{

  console.log(list_story.length);
  const handleSnapToItem = (index: number) => {
      console.log('Current index:', index);

      const nextItem = list_story[index + 1] || null;
      if (nextItem) 
      {
          console.log('Next Item:', nextItem);
    }
  };

  

  const ref = React.useRef<ICarouselInstance>(null);

  const handleGoToFirstPage = () => {
    if (ref.current) 
    {
        ref.current.scrollTo({ index: 0, animated: true }); 
    }
  };

  return (
    <View style={main_screen_story_tab_styles.main_view}>
        <Carousel
            ref={ref}
            loop={false}
            width={width}
            height={height}
            data={list_story}
            scrollAnimationDuration={150}
            onSnapToItem={(index) =>
                console.log('current index:', index)
            }
            renderItem={({ item }) => {
                const uploader = data_friend?.find((fr) => fr.id === item?.uploader_id);
                if (!item || !uploader) return (
                    <View></View>
                );

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
        <StoryBottomBar goToTop={goToTop} handleGoToFirstPage={handleGoToFirstPage}/>
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