import { Dimensions, Text, Button, Touchable, TextInput, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import story_item_styles from "./component_styles/StoryItemStyles";
import UserAvatar from 'react-native-user-avatar';

const StoryItem =  ({story_img, caption, uploader_avt, uploader_firstname,  uploader_lastname, upload_time}:
    {story_img: string, caption: string; uploader_avt: string; uploader_firstname: string; uploader_lastname: string; upload_time: string}
) => {
    return(
        <View style={story_item_styles.container_zone}>
            <View style={story_item_styles.main_zone}>
                {story_img !== "" ? (
                    <Image
                    source={
                        {uri : story_img}
                    }
                    style={story_item_styles.image}
                    />
                ) : (
                    
                     <View style={story_item_styles.image}>
                    </View>
                    
                )}
                
                <View style={story_item_styles.caption_background}>
                    <Text style={story_item_styles.caption}>
                        {caption}
                    </Text>
                </View>
                <View style={story_item_styles.upload_info}>
                    {uploader_avt !== "" ? (
                        <Image
                        source={
                            {uri : uploader_avt}
                        }
                        style={story_item_styles.story_owner_avt}
                        />
                    ) : (
                        <UserAvatar size={35} name={`${uploader_firstname} ${uploader_lastname}`} />
                    )}
                    
                    <Text style={story_item_styles.uploader_name}>
                        {uploader_firstname} {uploader_lastname}
                    </Text>
                    <Text style={story_item_styles.upload_time}>
                        {upload_time}
                    </Text>
                </View>
            </View>
        </View>
    )
};

export default StoryItem