import { useEffect, useRef, useState } from "react";
import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import main_screen_header_styles from "./component_styles/MainScreenHeaderStyles";
import AddFriendModal from "../AddFriendModal";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FriendData } from "../types/FriendData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModal from "../UserModal";


const {width, height} = Dimensions.get("window");
const MainScreenHeader = ({isTakingPhoto, back_button_enable, handlePresentUserModal, navigation, data_friend, set_data_friend, user_avt} : 
    {isTakingPhoto : boolean; back_button_enable: boolean; handlePresentUserModal: () => void;  navigation: any, data_friend: Array<FriendData>, set_data_friend: (fr : Array<FriendData>) => void, user_avt: string}) => 
{

    const add_friend_modal_ref = useRef<BottomSheetModal>(null);
    const userModalRef = useRef<BottomSheetModal>(null);
    const handle_open_add_friend_modal = () => 
    {
        add_friend_modal_ref.current?.present();
    }

    // Lấy fist_name, last_name từ AsyncStorage
    const[first_name, set_first_name] = useState("");
    const[last_name, set_last_name] = useState("");
    useEffect(()=>
    {
        const get_user_name_from_storage = async () => 
        {
            var first_name = await AsyncStorage.getItem("first_name");
            var last_name = await AsyncStorage.getItem("last_name");
            if (first_name === null)
            {
                first_name = "";
            }
            if (last_name === null)
            {
                last_name = "";
            }
            const _user_name = first_name + " " + last_name;
            set_first_name(first_name);
            set_last_name(last_name);
        };
        get_user_name_from_storage();
    }, [first_name, last_name])
    

    return(
        <View style={main_screen_header_styles.upper_zone}>
            <UserModal navigation={navigation} first_name={first_name} last_name={last_name} set_first_name={set_first_name} set_last_name={set_last_name} user_modal_refs={userModalRef} />
            <AddFriendModal modal_refs={add_friend_modal_ref} data_friend={data_friend} set_data_friend={set_data_friend}></AddFriendModal>
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

                    <TouchableOpacity style={main_screen_header_styles.button} onPress={() => userModalRef.current?.present()}>
                        <Icon name="account-circle" size={30} color="#ffffff" />
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

