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
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from './instance/AxiosInstance';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet';


const {width, height} = Dimensions.get("window");

const data_story_2 = [
  {
    story_id: "1",
    uploader_id: "1",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "2",
    uploader_id: "2",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "3",
    uploader_id: "3",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "4",
    uploader_id: "4",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "5",
    uploader_id: "5",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "6",
    uploader_id: "6",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "7",
    uploader_id: "7",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "8",
    uploader_id: "8",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "9",
    uploader_id: "9",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "10",
    uploader_id: "10",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "11",
    uploader_id: "11",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "12",
    uploader_id: "12",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "13",
    uploader_id: "13",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "14",
    uploader_id: "14",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "15",
    uploader_id: "15",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "16",
    uploader_id: "16",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "17",
    uploader_id: "17",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "18",
    uploader_id: "18",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "19",
    uploader_id: "19",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "20",
    uploader_id: "20",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "21",
    uploader_id: "21",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "22",
    uploader_id: "22",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "23",
    uploader_id: "23",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "24",
    uploader_id: "24",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "25",
    uploader_id: "25",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "26",
    uploader_id: "26",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "27",
    uploader_id: "27",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "28",
    uploader_id: "28",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "29",
    uploader_id: "29",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "30",
    uploader_id: "30",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "31",
    uploader_id: "31",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "32",
    uploader_id: "32",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "33",
    uploader_id: "33",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "34",
    uploader_id: "34",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "35",
    uploader_id: "35",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "36",
    uploader_id: "36",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "37",
    uploader_id: "37",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "38",
    uploader_id: "38",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "39",
    uploader_id: "39",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  },
  {
    story_id: "40",
    uploader_id: "40",
    image: "",
    description: "Hi hi",
    create_at: "2025",
    seen: false
  }
]

const data_fr = [
    {
      id: "1", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "2", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "3", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "4", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "5", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "6", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "7", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "8", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "9", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    },
    {
      id: "10", 
      first_name: "Onion",
      last_name: "Onion",
      userAvatarURL: ""
    }
  ]


const GridStoryModal = ({grid_story_modal_ref, data_story}:
    {grid_story_modal_ref: any, data_story:any }) => 
{
    
    return (
        <>
        <BottomSheetModal
            ref={grid_story_modal_ref}
            backgroundStyle={{ backgroundColor: '#1F1F1F' }}
            handleStyle={{ height: 10 }}
            containerStyle={{ zIndex: 21 }}
            handleIndicatorStyle={[{ backgroundColor: '#505050', width: 45, height: 5 }]}
        >
            <BottomSheetScrollView 
            scrollEnabled={false}
            contentContainerStyle={[styles.contentContainer, {minHeight: height}]}>
                <FlatList
                    data={data_story}
                    contentContainerStyle={styles.flatListContent}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                backgroundColor: "#1F1F1F",
                                width: width * 0.32,
                                height: width * 0.32,
                                margin: 3,
                                borderRadius: 10,
                                alignSelf: 'flex-start'
                            }}>
                                {item.image !== null && item.image !== "" ? (
                                    <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                        borderRadius: 10, // Bo góc hình ảnh
                                    }}
                                />
                                ):(
                                    <></>
                                )}
                        </View>
                    )}
                    keyExtractor={(item) => item.story_id}
                    numColumns={3} // Number of columns
                />
            </BottomSheetScrollView>
            
        </BottomSheetModal>
        </>

    );
};
export default GridStoryModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 45,
        borderTopRightRadius:45,
        backgroundColor: '#050505',
    },
    contentContainer: 
    {
        flex: 1,
        alignItems: 'flex-start',
        borderTopLeftRadius: 45,
        borderTopRightRadius:45,
        backgroundColor: "#242424",
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    flatListContent: {
        flexGrow: 1, 
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start', 
      },
      toggleButton: {
        margin: 20,
        padding: 15,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    });