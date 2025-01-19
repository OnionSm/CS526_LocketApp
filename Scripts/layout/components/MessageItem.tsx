import { useEffect, useState , useContext} from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import message_item_styles from "./component_styles/MessageItemStyles";
import StoryMessage from "./StoryMessage";
import { Story } from "../types/Story";
import { UserDataContext } from "../context/UserDataContext";
import UserAvatar from 'react-native-user-avatar';


const MessageItem = ({sender_id, friend_avt, friend_first_name, friend_last_name, story, message} : 
    {sender_id: string, friend_avt: string, friend_first_name: string, friend_last_name: string, story: Story, message: string}) =>
{

    const user_data_context = useContext(UserDataContext);

    return(
        <View style={message_item_styles.message_view}>
            {story !== null && story !== undefined && story.image !== "" ? (
                <StoryMessage caption={story.description}
                story_img={story.image}
                upload_time={story.create_at} 
                uploader_avt={story.uploader_id}
                uploader_firstname={story.uploader_id === user_data_context.user_id ? user_data_context.first_name : friend_first_name}
                uploader_lastname={story.uploader_id === user_data_context.user_id ? user_data_context.last_name : friend_last_name}
                ></StoryMessage>
            ) : (
                <></>
            )}
            <View style={[message_item_styles.message_zone, {justifyContent: sender_id === user_data_context.user_id ? "flex-end" : "flex-start" }]}>
                {sender_id === user_data_context.user_id ? (
                    <View style={[message_item_styles.message_background_user, {marginRight: 10}]}>
                        <Text style={[message_item_styles.messsage_style_user]}>{message}</Text>
                    </View>
                ) : (
                    <>
                        {friend_avt === "" ? (
                        <Image 
                            source={{uri : friend_avt}}
                            style={[message_item_styles.avatar, {marginTop: 5}, {marginLeft : 5}, {marginRight: 5}]}
                        />
                        ) : (
                            <UserAvatar size={35} name={`${friend_first_name} ${friend_last_name}`} 
                            style={[
                            message_item_styles.avatar, 
                            {marginTop: 5, marginLeft: 5, marginRight: 5}
                            ]}/>
                        )}
                        
                        <View style={[message_item_styles.message_background_friend]}>
                            <Text style={[message_item_styles.message_text]}>{message}</Text>
                        </View>
                    </>
                )}
                
            </View>
            
            
            
        </View>
    )
}

export default MessageItem


// const MessageItem = ({title, sender , friend_avt, user_id}: ItemProps) => (
//     <View style={[personal_chat_style.message_item, {justifyContent : sender === user_id ? "flex-end" : "flex-start"}]}>
//       {sender !== user_id ? (
//       <Image 
//           source={{ uri: friend_avt }}
//           style={[personal_chat_style.avatar, {marginTop: 5}, {marginLeft : 5}, {marginRight: 5}]}
//       />
//       ) : null}
//       <View style={sender === user_id ? personal_chat_style.message_background_user : personal_chat_style.message_background_friend}>
//         <Text style={[sender === user_id ? personal_chat_style.messsage_style_user : personal_chat_style.messsage_style_friend]}>{title}</Text>
//       </View>
      
//     </View>
//   );