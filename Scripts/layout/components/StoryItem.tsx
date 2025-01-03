import { Dimensions, Text, Button, Touchable, TextInput, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import story_item_styles from "./component_styles/StoryItemStyles";

const StoryItem =  ({story_img, caption, uploader_avt, uploader_name, upload_time}:
    {story_img: string, caption: string; uploader_avt: string; uploader_name: string; upload_time: string}
) => {
    return(
        <View style={story_item_styles.container_zone}>
            <View style={story_item_styles.main_zone}>
                <Image
                source={
                    {uri : story_img}
                }
                style={story_item_styles.image}
                />
                <View style={story_item_styles.caption_background}>
                    <Text style={story_item_styles.caption}>
                        {caption}
                    </Text>
                </View>
                <View style={story_item_styles.upload_info}>
                    <Image
                    source={
                        {uri : uploader_avt}
                    }
                    style={story_item_styles.story_owner_avt}
                    />
                    <Text style={story_item_styles.uploader_name}>
                        {uploader_name}
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