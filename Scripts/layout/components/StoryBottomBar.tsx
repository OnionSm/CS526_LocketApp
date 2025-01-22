import { Dimensions, Text, Button, Touchable, TextInput, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import story_bottom_bar_styles from "./component_styles/StoryBottomBarStyles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const StoryBottomBar = ({goToTop, handleGoToFirstPage, open_grid_story_modal, comment_visible, comment, set_comment, current_story, send_story_message} : 
    {goToTop: () => void; handleGoToFirstPage: () => void; open_grid_story_modal: () => void, comment_visible: boolean, comment: any, set_comment: any, current_story: string, send_story_message : () => void}) =>
{

    


    return(
        <View style={story_bottom_bar_styles.container_bar_zone}>  
            <View style={story_bottom_bar_styles.main_zone}>
                {comment_visible ? (
                <View style={story_bottom_bar_styles.section1}>
                    <TextInput
                        value={comment}
                        placeholder="Gửi tin nhắn..."
                        placeholderTextColor="#CACACA"
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                            fontFamily: "SF-Pro-Rounded-Bold",
                            color: "#FFFFFF",
                            maxWidth: comment.length > 0 ? "81%": "58%",
                            minWidth: 50,
                            width: "100%",
                            marginLeft: 12
                        }}
                        onChangeText={set_comment}
                    />
                    {comment.length > 0 ? (
                        <TouchableOpacity style={[story_bottom_bar_styles.send_button]} 
                        onPress={() => {send_story_message()}}>
                            <Icon name="send" size={27} color = "#2B2B2B"/> 
                        </TouchableOpacity>
                    ) : (
                        <View style={story_bottom_bar_styles.icon_zone}>
                            <Icon name="favorite" size={27} color="#FFCC35" style={{marginHorizontal: 5}}/>
                            <Icon name="local-fire-department" size={27} color="#FFCC35" style={{marginHorizontal: 5}}/>
                            <Icon name="sentiment-very-satisfied" size={27} color="#FFCC35" style={{marginHorizontal: 5}}/>
                            <Icon name="add-reaction" size={27} color="#CACACA" style={{marginHorizontal: 5}}/>
                        </View>
                    )}
                    
                </View>
                ) : (
                    <View></View>
                )}
                
                <View style={story_bottom_bar_styles.section2}>
                    <Icon name="view-cozy" size={45} color="#FFFFFF" style={{marginHorizontal: 5}}
                    onPress={()=>{open_grid_story_modal(); console.log("Press")}}/>
                    <TouchableOpacity style={[story_bottom_bar_styles.centre_button, {marginHorizontal: 5}]}
                                        onPress={() => {goToTop(); handleGoToFirstPage()}}>
                        <Image source={require("../GUI/CaptureImageButton.png")}
                            style={story_bottom_bar_styles.capture_image_button}>
                        </Image>  
                    </TouchableOpacity>
                    <Icon name="pending" size={45} color="#FFFFFF" style={{marginHorizontal: 5}}/>
                                    
                </View>
            </View>
        </View>
    )
}
export default StoryBottomBar