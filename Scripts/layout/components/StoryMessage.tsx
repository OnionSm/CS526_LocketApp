import { Dimensions, Text, Button, Touchable, TextInput, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserAvatar from 'react-native-user-avatar';
import story_message_styles from "./component_styles/StoryMessageStyles";

const StoryMessage = ({story_img, caption, uploader_avt, uploader_firstname, uploader_lastname, upload_time} : 
    {story_img: string, caption: string, uploader_avt: string, uploader_firstname: string, uploader_lastname: string, upload_time : string}) =>
{
    
    return(
    <View style={story_message_styles.main_zone}>
        {story_img !== "" ? (
            <Image
            source={
                {uri : story_img}
            }
            style={story_message_styles.image}
            />
        ) : (
            
            <View style={story_message_styles.image}>
            </View>
            
        )}
        <View style={story_message_styles.caption_background}>
            <Text style={story_message_styles.caption}>
                {caption}
            </Text>
        </View>
        <View style={story_message_styles.uploader_background}>
            {"" !== "" ? (
                <Image
                source={
                    {uri : uploader_avt}
                }
                style={story_message_styles.story_owner_avt}
                />
            ) : (
                <UserAvatar size={30} name={`${uploader_firstname} ${uploader_lastname}`} />
            )}
            <Text style={story_message_styles.uploader_name}>
            {uploader_firstname} {uploader_lastname}
            </Text>
        </View>
        <View style={story_message_styles.upload_time_background}>
            <Text style={story_message_styles.uploader_name}>
            {upload_time}
            </Text>
        </View>
    </View>
    )

}

export default StoryMessage