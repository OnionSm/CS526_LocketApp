import React, { useEffect, useRef, useContext } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import add_friend_modal_styles from './styles/AddFriendModalStyle';
import { Dimensions } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import AxiosInstance from './instance/AxiosInstance';
import { GET_FRIEND_REQUEST_COOLDOWN } from '@env';
import { SqliteDbContext } from './context/SqliteDbContext';
import { GET_FRIEND_DATA_COOLDOWN } from '@env';
import { IntervalContext } from './context/IntervalContext';
import { FriendData } from './types/FriendData';
type FriendSearch = {
    id: string,
    publicUserId: string,
    firstName: string,
    lastName: string,
    userAvatarURL: string
}

type FriendInvitation = {
    id: string,
    first_name: string,
    last_name: string,
    senderId: string,
    userAvatarURL: string
}




const shareLink = async () => {
    try 
    {
        const result = await Share.share({
            message: 'Check out this link: https://example.com',
            url: 'https://example.com',
        });
    
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            console.log('Shared with activity type: ', result.activityType);
            } else {
            console.log('Link shared successfully');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('Share dismissed');
        }
    } 
    catch (error) 
    {
      console.error('Error sharing the link: ', error);
    }
  };


const accept_friend_invitation = async (request_id : string,  sender_id: string) =>
{
    try 
    {
        const form_data = new FormData();
        form_data.append('request_id', request_id); 
        form_data.append("sender_id", sender_id);
        
        var res = await AxiosInstance.put("api/users/friend-request/respone-request", form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(res.status != 200)
        {
            return false;
        }
        return true;
    } 
    catch (error) 
    {
        console.error('Error sharing the link: ', error);
        return false;
    }
}




const {width, height} = Dimensions.get("window"); 

const renderItemFriend = ({item}:{item: FriendData}) => (
    <View style={[{display: "flex"}, {width: width}, {height: height * 0.08}, {marginVertical: 3}, {flexDirection: "row"}, {justifyContent: "space-between"}, {alignItems: "center"}]}>
        <View style={[{display: "flex"},{flexDirection: "row"}, {marginHorizontal : width * 0.05}, {alignItems: "center"}]}>
            <View style={[add_friend_modal_styles.mini_avatar_border]}>
                {item.userAvatarURL !== "" ? (
                    <Image style={add_friend_modal_styles.main_avt}
                    source={{uri : item.userAvatarURL}}>
                    </Image>
                ): (
                    <UserAvatar size={35} name={`${item.first_name} ${item.last_name}`} />
                )}                       
            </View>
            <Text style={[{color: "#FFFFFF"},{fontFamily: "SF-Pro-Rounded-Bold"}, {fontSize: 18}, {marginHorizontal : 10}]}>{item.first_name} {item.last_name}</Text>
        </View>
        <View style={[{display: "flex"}, {width: 35}, {height: 35}, {borderRadius: 50}, 
            {backgroundColor: "#3A3A3A"}, {marginRight: width * 0.05}, {alignItems: "center"}, {justifyContent: "center"}]}>
            <Icon name="close" size={24} color="#888888"></Icon>
        </View>
    </View>
    );






const renderItemRequest = ({item, removeFriendInvitation}:{item: FriendInvitation, removeFriendInvitation: (id : string) => void}) => (
    <View style={[{display: "flex"}, {width: width}, {height: height * 0.08}, {marginVertical: 3}, {flexDirection: "row"}, {justifyContent: "space-between"}, {alignItems: "center"}]}>
        <View style={[{display: "flex"},{flexDirection: "row"}, {marginHorizontal : width * 0.05}, {alignItems: "center"}]}>
            <View style={[add_friend_modal_styles.mini_avatar_border]}>
                {item.userAvatarURL !== "" ? (
                    <Image style={add_friend_modal_styles.main_avt}
                    source={{uri : item.userAvatarURL}}>
                    </Image>
                ): (
                    <UserAvatar size={35} name={`${item.first_name} ${item.last_name}`} />
                )}                       
            </View>
            <Text style={[{color: "#FFFFFF"},{fontFamily: "SF-Pro-Rounded-Bold"}, {fontSize: 18}, {marginHorizontal : 10}]}>{item.first_name} {item.last_name}</Text>
        </View>
        <TouchableOpacity style={[{display: "flex"}, {width: 100}, {height: 35}, {borderRadius: 50}, 
                            {backgroundColor: "#F1B202"}, {marginRight: width * 0.05}, {alignItems: "center"}, 
                            {justifyContent: "center"}, {flexDirection: "row"}]}
                            onPress={async () => {
                                var res = await accept_friend_invitation(item.id, item.senderId);
                                if (res)
                                {
                                    removeFriendInvitation(item.id);
                                }}}>
            <Icon name="check" size={20} color="#000000"></Icon>
            <Text style={[{fontFamily: "SF-Pro-Rounded-Semibold"}, {fontSize: 16}, {color: "#000000"}]}>Chấp nhận</Text>
        </TouchableOpacity>
    </View>
    );
    

function AddFriendModal({modal_refs, data_friend} : {modal_refs: any, data_friend: Array<FriendData>})
{
    const interval_context = useContext(IntervalContext);
    const sqlite_db_context = useContext(SqliteDbContext);
    const [show_full, set_show_full] = useState(false);
    const [show_full_data_addfriend, set_show_full_data_addfriend] = useState(false);

    const [searched_user, set_searched_user] = useState<FriendSearch|undefined>(undefined);
    const [search_text, set_search_text] = useState("");

    useEffect(() => {
        if(search_text === "")
        {
            return;
        }
        const get_data_from_search = async () => {
            await get_user_from_search(search_text);
        };
    
        get_data_from_search();
    }, [search_text]);

// ------------------------------------------------------------ GET USER FROM SEARCH -----------------------------------------------------------

    const get_user_from_search = async (id : string) =>
    {
        const formData = new FormData();
        formData.append('public_user_id', id); 
        try
        {
            const response = await AxiosInstance.post("api/user/friend/user", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(response.status !== 200)
            {
                console.log("Data user", searched_user);
                return;
            }
            else
            {
                set_searched_user(response.data);
            }
        }
        catch(error)
        {
            set_searched_user(undefined);
            console.error('Error', error);
        }
    }

// ------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------- SEND FRIEND REQUEST -----------------------------------------------------
    const send_friend_request = async (id : string) =>
    {
        const formData = new FormData();
        formData.append('ReceiverId', id); 
        try
        {
            const response = await AxiosInstance.post("api/users/friend-request/add-friend", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            set_searched_user(undefined);
        }
        catch(error)
        {
            console.error('Error', error);
        }
    } 

// --------------------------------------------------------------------------------------------------------------------------




// --------------------------------------------------------------- GET FRIEND INVITATION -------------------------------------------------

    
    const [data_add_friends, set_data_add_friends] = useState<Array<FriendInvitation>>([]);

    const removeFriendInvitation = (idToRemove: string) => {
        set_data_add_friends((prev) => prev.filter((invitation) => invitation.id !== idToRemove));
    };

    const get_friend_invitation = async () =>
    {
        try
        {
            const response = await AxiosInstance.get("api/users/friend-request/receive");
            if(response.status === 200)
            {
                console.log(response.data);
                set_data_add_friends(response.data);
            }
        }
        catch(error)
        {
            console.error('Error get friend invitation', error);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => 
        {
            get_friend_invitation(); 
        }, Number(GET_FRIEND_REQUEST_COOLDOWN)); 
        return () => clearInterval(intervalId); 
    }, []);


// ---------------------------------------------------------------------------------------------------------------------------------------
    return(
        <BottomSheetModal
        ref={modal_refs}
        backgroundStyle={{ backgroundColor: '#242424' }}
        handleStyle={{height:10}}
        containerStyle={{zIndex: 13}}
        handleIndicatorStyle={[{ backgroundColor: '#505050' }, {width: 45}, {height: 5}]}
        >
            <BottomSheetScrollView contentContainerStyle={add_friend_modal_styles.contentContainer}>
                <View style={add_friend_modal_styles.main_view}>
                    <ScrollView>

                    
                    {/* Find Zone */}
                    <View style={add_friend_modal_styles.find_zone}>
                        <Text style={add_friend_modal_styles.find_zone_title}>Thêm bạn bè của bạn</Text>
                        <Text style={add_friend_modal_styles.find_zone_amout_friend}>0/20 người đã được bổ sung</Text>
                        <TouchableOpacity style={add_friend_modal_styles.search_bar}>
                            <Icon name="search" size={24} color="#FFFFFF" /> 
                            <TextInput style={add_friend_modal_styles.search_bar_text}
                            placeholder='Thêm một người bạn'
                            placeholderTextColor="#888888"
                            value = {search_text}
                            onChangeText={(text: string) => set_search_text(text)}></TextInput>
                        </TouchableOpacity>
                    </View>

                    {searched_user !== null && searched_user != undefined ? (
                        <View style={[{display: "flex"}, {width: width}, {height: height * 0.08}, {marginVertical: 3}, {flexDirection: "row"}, {justifyContent: "space-between"}, {alignItems: "center"}]}>
                        <View style={[{display: "flex"},{flexDirection: "row"}, {marginHorizontal : width * 0.05}, {alignItems: "center"}]}>
                            <View style={[add_friend_modal_styles.mini_avatar_border]}>
                                {searched_user.userAvatarURL !== ""  ? (
                                    <Image style={add_friend_modal_styles.main_avt}
                                    source={{uri : searched_user.userAvatarURL }}>
                                    </Image>
                                ): (
                                    <UserAvatar size={35} name={`${searched_user.firstName} ${searched_user.lastName}`} />
                                )}                       
                            </View>
                            <Text style={[{color: "#FFFFFF"},{fontFamily: "SF-Pro-Rounded-Bold"}, {fontSize: 18}, {marginHorizontal : 10}]}>{searched_user.firstName} {searched_user.lastName}</Text>
                        </View>
                        <TouchableOpacity style={[{display: "flex"}, {width: 80}, {height: 40}, {borderRadius: 50}, 
                            {backgroundColor: "#F1B202"}, {marginRight: width * 0.05}, {alignItems: "center"}, 
                            {justifyContent: "center"}, {flexDirection: "row"}]}
                            onPress={() => {send_friend_request(searched_user.id)}}>
                            <Icon name="add" size={24} color="#000000"></Icon>
                            <Text style={[{fontFamily: "SF-Pro-Rounded-Semibold"}, {fontSize: 18}, {color: "#000000"}]}>Thêm</Text>
                        </TouchableOpacity>
                    </View>
                    ) : (
                        <View>

                        </View>
                    )} 
                    

                    {/* Find Friend In Other Apps */}
                    <View style={add_friend_modal_styles.find_in_other_app_zone}>
                        <View style={[{display: "flex"},
                            {flexDirection: "row"},
                            {alignItems: "center"},
                            {alignContent: 'center'},
                            {justifyContent: "flex-start"},
                            {marginTop: 5},
                            {marginBottom: 5},
                            {width: "90%"}
                        ]}>
                            <Icon name="person-add" size={24} color="#AAAAAA" /> 
                            <Text style={{
                                                fontFamily: 'SF-Pro-Rounded-Bold',
                                                fontSize: 16,
                                                color: "#AAAAAA",
                                                marginLeft: 5 
                                            }}>Tìm bạn bè từ các ứng dụng khác</Text>
                        </View>
                        <View style={add_friend_modal_styles.list_other_app_zone}>
                            <TouchableOpacity style={add_friend_modal_styles.list_other_app_item}>
                                <Image source={require('./GUI/MessengerIcon.png')}
                                style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}></Image>
                                <Text style={add_friend_modal_styles.other_app_button_text}>Messenger</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={add_friend_modal_styles.list_other_app_item}>
                                <Image source={require('./GUI/InstaIcon.png')}
                                style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}></Image>
                                <Text style={add_friend_modal_styles.other_app_button_text}>Instagram</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={add_friend_modal_styles.list_other_app_item}>
                                <Image source={require('./GUI/ZaloIcon.png')}
                                style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}></Image>
                                <Text style={add_friend_modal_styles.other_app_button_text}>Zalo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={add_friend_modal_styles.list_other_app_item} 
                            onPress={() => shareLink()}>
                                <Image source={require('./GUI/ShareButton.png')}
                                style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}>
                                </Image>
                                <Text style={add_friend_modal_styles.other_app_button_text}>Khác</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {data_friend != null && data_friend.length >= 1 ? (
                    <View>
                        <View style={[{display: "flex"}, {flexDirection: "row"},{alignSelf: "flex-start"}, {marginLeft: width * 0.05}]}>
                            <Icon name="group" size={24} color="#AAAAAA"></Icon>
                            <Text style={{fontFamily: 'SF-Pro-Rounded-Bold',fontSize: 16,color: "#AAAAAA",marginLeft: 5 
                                        }}>Bạn bè của bạn</Text>
                        </View>

                        <View>
                            <FlatList
                            data={show_full ? data_friend : data_friend.slice(0, 3)} 
                            renderItem={renderItemFriend} 
                            keyExtractor={(item) => item.id} 
                            scrollEnabled={false}
                            />
                        </View>
                    
                        {data_friend.length >= 3 ? (
                            <View style={[{width: width}, {display: "flex"}, {flexDirection: "row"},
                                {justifyContent: "space-evenly"}, {alignItems: "center"}
                            ]}>
                                    <View style={[{width: width * 0.3}, {height : 1}, {backgroundColor: "#3A3A3A"}]}>
                                        </View>
                                            <TouchableOpacity style={[{width: 80}, {height: 35}, {borderRadius: 30}, {backgroundColor: "#3A3A3A"},
                                                {display: "flex"}, {flexDirection: "row"}, {alignItems: "center"}, {justifyContent: "center"}]}
                                                onPress={() => {set_show_full(!show_full)}}>
                                                {!show_full ? (
                                                    <Text style={[{alignSelf: "center"}, {fontFamily: "SF-Pro-Rounded-Bold"}, {color:"#888888"}]}>Xem thêm</Text>
                                                ):(
                                                    <Text style={[{alignSelf: "center"}, {fontFamily: "SF-Pro-Rounded-Bold"}, {color:"#888888"}]}>Rút gọn</Text>
                                                )} 
                                            </TouchableOpacity>
                                        <View style={[{width: width * 0.3}, {height : 1}, {backgroundColor: "#3A3A3A"}]}>
                                    </View>
                            </View>
                        ) : (
                            <View>

                            </View>
                        )}
                        
                    </View>
                    ) : (
                        <View>

                        </View>
                    )}
                    



                    {data_add_friends != null && data_add_friends.length >= 1 ? (
                    <View>
                        <View style={[{display: "flex"}, {flexDirection: "row"},{alignSelf: "flex-start"}, {marginLeft: width * 0.05}]}>
                            <Icon name="group" size={24} color="#AAAAAA"></Icon>
                            <Text style={{
                                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                                    fontSize: 16,
                                                    color: "#AAAAAA",
                                                    marginLeft: 5 
                                                }}>Yêu cầu kết bạn</Text>
                        </View>

                        <View>
                            <FlatList
                            data={show_full_data_addfriend ? data_add_friends : data_add_friends.slice(0, 3)} 
                            renderItem={({ item }) =>
                                renderItemRequest({ item, removeFriendInvitation })
                              }
                            keyExtractor={(item) => item.id} 
                            scrollEnabled={false}
                            />
                        </View>

                        {data_add_friends.length > 3 ? (
                            <View style={[{width: width}, {display: "flex"}, {flexDirection: "row"},
                                {justifyContent: "space-evenly"}, {alignItems: "center"}
                            ]}>
                                <View style={[{width: width * 0.3}, {height : 1}, {backgroundColor: "#3A3A3A"}]}>           
                                    </View>
                                        <TouchableOpacity style={[{width: 80}, {height: 35}, {borderRadius: 30}, {backgroundColor: "#3A3A3A"},
                                            {display: "flex"}, {flexDirection: "row"}, {alignItems: "center"}, {justifyContent: "center"}]}
                                            onPress={() => {set_show_full_data_addfriend(!show_full_data_addfriend)}}>
                                            {!show_full_data_addfriend ? (
                                                <Text style={[{alignSelf: "center"}, {fontFamily: "SF-Pro-Rounded-Bold"}, {color:"#888888"}]}>Xem thêm</Text>
                                            ):(
                                                <Text style={[{alignSelf: "center"}, {fontFamily: "SF-Pro-Rounded-Bold"}, {color:"#888888"}]}>Rút gọn</Text>
                                            )}
                                        </TouchableOpacity>
                                    <View style={[{width: width * 0.3}, {height : 1}, {backgroundColor: "#3A3A3A"}]}>
                                </View>
                            </View>
                        ) : (
                            <View>

                            </View>
                        )}

                    </View>
                    ) : (
                        <View>

                        </View>
                    )}
                    

                    {/* Send Invitation To Other Apps */}
                    <View style={add_friend_modal_styles.other_app_invitation_zone}>
                        <View style={[{display: "flex"},
                            {flexDirection: "row"},
                            {alignItems: "center"},
                            {alignContent: 'center'},
                            {justifyContent: "flex-start"},
                            {marginTop: 5},
                            {marginBottom: 5},
                            {width: "90%"}
                        ]}>
                            <Icon name="share" size={24} color="#AAAAAA" /> 
                            <Text style={{
                                                fontFamily: 'SF-Pro-Rounded-Bold',
                                                fontSize: 16,
                                                color: "#AAAAAA",
                                                marginLeft: 5 
                                            }}>Mời từ các ứng dụng khác</Text>
                        </View>
                        <TouchableOpacity style={[add_friend_modal_styles.medium_button]}>
                            <View style={[add_friend_modal_styles.text_option_zone, {flex: 8},
                                ]}>
                                <Image source={require('./GUI/MessengerIcon.png')}
                                style={[{width: 60}, {height: 60}, {resizeMode: "contain"}]}>
                                </Image>
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 10
                                }}>
                                    Messenger
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[add_friend_modal_styles.medium_button]}>
                            <View style={[add_friend_modal_styles.text_option_zone, {flex: 8},
                                ]}>
                                <Image source={require('./GUI/InstaIcon.png')}
                                style={[{width: 60}, {height: 60}, {resizeMode: "contain"}]}>
                                </Image>
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 10 
                                }}>
                                    Instagram
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[add_friend_modal_styles.medium_button]}
                        onPress={() => shareLink()}>
                            <View style={[add_friend_modal_styles.text_option_zone, {flex: 8},
                                ]}>
                                <Image source={require('./GUI/ShareButton.png')}
                                style={[{width: 60}, {height: 60}, {resizeMode: "contain"}]}>
                                </Image>
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 10
                                }}>
                                    Các ứng dụng khác
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                        

                    </View>
                    </ScrollView>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}
export default AddFriendModal