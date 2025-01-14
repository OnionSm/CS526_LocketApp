import { Dimensions, Text, Button, Touchable, TextInput, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import story_bottom_bar_styles from "./component_styles/StoryBottomBarStyles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const StoryBottomBar = ({goToTop, handleGoToFirstPage, open_grid_story_modal} : 
    {goToTop: () => void; handleGoToFirstPage: () => void; open_grid_story_modal: () => void}) =>
{
   return(
    <View style={story_bottom_bar_styles.container_bar_zone}>  
        <View style={story_bottom_bar_styles.main_zone}>
            <View style={story_bottom_bar_styles.section1}>
                <TextInput
                placeholder="Gửi tin nhắn..."
                placeholderTextColor="#CACACA"
                style={[{fontFamily: "SF-Pro-Rounded-SemiBold"}]}
                >   
                </TextInput>
                <View style={story_bottom_bar_styles.icon_zone}>
                    <Icon name="favorite" size={30} color="#FFCC35" style={{marginHorizontal: 5}}/>
                    <Icon name="local-fire-department" size={30} color="#FFCC35" style={{marginHorizontal: 5}}/>
                    <Icon name="sentiment-very-satisfied" size={30} color="#FFCC35" style={{marginHorizontal: 5}}/>
                    <Icon name="add-reaction" size={30} color="#CACACA" style={{marginHorizontal: 5}}/>
                </View>
            </View>
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