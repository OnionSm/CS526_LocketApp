import { useEffect, useRef, useState } from "react";
import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import main_screen_header_styles from "./component_styles/MainScreenHeaderStyles";
import AddFriendModal from "../AddFriendModal";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";

const {width, height} = Dimensions.get("window");
const MainScreenHeader = ({isTakingPhoto, back_button_enable, handlePresentUserModal, navigation} : 
    {isTakingPhoto : boolean; back_button_enable: boolean; handlePresentUserModal: () => void;  navigation: any}) => 
{

    const add_friend_modal_ref = useRef<BottomSheetModal>(null);
    const handle_open_add_friend_modal = () => 
    {
        add_friend_modal_ref.current?.present();
    }

    return(
        <View style={main_screen_header_styles.upper_zone}>
            <AddFriendModal modal_refs={add_friend_modal_ref}></AddFriendModal>
            {isTakingPhoto ? (
                <View style={[
                    {display: "flex"}, 
                    {flexDirection: "row"},
                    {alignItems: "center"},
                    {alignContent: "flex-end"},
                    {justifyContent: "flex-end"},
                    {width: "100%"}
                ]}>
                    <Text style={[main_screen_header_styles.add_friend_text,
                        {fontSize: 20},
                        {marginLeft: width * 0.25},
                        {marginRight: width* 0.25}]}>Gửi đến...</Text>
                    <TouchableOpacity style={[ {marginRight: width*0.05}]}>
                        <Icon name="download" size={30} color="#FFFFFF" /> 
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={main_screen_header_styles.upper_zone}> 
                    <TouchableOpacity style={main_screen_header_styles.button} onPress={() => {handlePresentUserModal()}}>
                        <Icon name="account-circle" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                    {!back_button_enable ? (
                        <TouchableOpacity style={main_screen_header_styles.addfriend_button}
                        onPress={() => {handle_open_add_friend_modal()}}>
                            <Icon name="group" size={25} color="#FFFFFF" /> 
                            <Text style={main_screen_header_styles.add_friend_text}>Thêm bạn bè</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={main_screen_header_styles.addfriend_button}>
                            <Icon name="group" size={25} color="#FFFFFF" /> 
                            <Text style={main_screen_header_styles.add_friend_text}>Bạn bè</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={main_screen_header_styles.button} onPress={()=>{navigation.navigate("MessageScreen")}}>
                        <Icon name="chat-bubble" size={30} color="#FFFFFF" /> 
                    </TouchableOpacity>
                </View> 
            )}
        </View>

    );
}

export default MainScreenHeader

