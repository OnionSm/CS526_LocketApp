import { Image, ImageBackground, Text, View, Button,
    TouchableOpacity, TextInput, Modal, ScrollView,
    RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet} from 'react-native';
    import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import general_user_profile_styles from './styles/GeneralUserprofileStyle';
import FeedbackModal from './FeedbackModal';
import ReportModal from './ReportModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChooseInfoScreen from './ChangeInfoModal';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import ChangeInfoModal from './ChangeInfoModal';
import DeleteAccountModal from './modals/DeleteAccountModal';
import AvatarImageBottomSheet from './bottom_sheets/AvatarImageBottomSheet';
import SQLite from 'react-native-sqlite-storage';
import { UriParser } from './common/UriParser';
import UserAvatar from 'react-native-user-avatar';

const get_user_avt = (user_id: string) => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase({name: 'Locket.db', location: 'default'});
      db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT * FROM User WHERE user_id = ?',
          [user_id],
          (tx: any, results: any) => {
            const rows = results.rows;
            let user_avt = null;

            if (rows.length > 0) 
            {
              user_avt = rows.item(0).userAvatarURL; 
            }
            resolve(user_avt); 
          },
          (error: any) => {
            reject('Error retrieving user avatar: ' + error); 
          }
        );
      });
    });
  };
  

export default function UserModal({navigation, first_name, last_name, modal_refs, modal_name, change_info_modal_name, onClickChangeInfo, }:
    {navigation : any, first_name : string; last_name:  string; modal_refs: any; modal_name: string; change_info_modal_name: string; onClickChangeInfo: (key: string) => void})
{
    var [user_avt_uri, set_user_avt] = useState<string | undefined>();

    useEffect(() => {
        const getAvatar = async () => {
          try 
          {
            const publicUserId = await AsyncStorage.getItem("user_id");
            if (!publicUserId) 
            {
              console.warn("No user ID found");
              return;
            }
            const avatar = await get_user_avt(publicUserId);
      
            if (typeof avatar !== "string" || typeof avatar === "undefined") 
            {
                return;
            }
            set_user_avt(avatar);
          } 
          catch (error) 
          {
            console.error("Error fetching avatar:", error);
          }
        };
        getAvatar();
      }, []);
    
      

    const feedbackModalRef = useRef<BottomSheetModal>(null);
    const reportModalRef = useRef<BottomSheetModal>(null);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [isReportVisible, setIsReportVisible] = useState(false);

    const openFeedbackModal = () => {
        setIsFeedbackVisible(true);
        feedbackModalRef.current?.present();
    };

    const closeFeedbackModal = () => {
        setIsFeedbackVisible(false);
        feedbackModalRef.current?.dismiss();
    };

    const openReportModal = () => {
        setIsReportVisible(true);
        reportModalRef.current?.present();
    };

    const closeReportModal = () => {
        setIsReportVisible(false);
        reportModalRef.current?.dismiss();
    };
    
    const [delete_account_modal_state, set_delete_account_modal] = useState(false);
    const toggle_delete_account_modal = () => 
    {
        set_delete_account_modal(!delete_account_modal_state);
    }


    const [avatar_image_modal_state, set_avatar_image_modal] = useState(false);
    const toggle_avatar_image_modal = () =>
    {
        set_avatar_image_modal(!avatar_image_modal_state);
    }

    const firstLetter = first_name ? first_name[0].toUpperCase() : '';
    const secondLetter = last_name ? last_name[0].toUpperCase() : '';

    return (
        <BottomSheetModal
            ref={(ref) => (modal_refs.current[modal_name] = ref)}
            backgroundStyle={{ backgroundColor: '#242424' }}
            handleStyle={{height:10}}
            handleIndicatorStyle={[{ backgroundColor: '#505050' }, {width: 45}, {height: 5}]}>
            <AvatarImageBottomSheet set_user_avatar={set_user_avt} isVisible={avatar_image_modal_state} toggleModal={toggle_avatar_image_modal}></AvatarImageBottomSheet>
            <DeleteAccountModal navigation={navigation} isVisible={delete_account_modal_state} toggleModal={toggle_delete_account_modal}></DeleteAccountModal>
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                <View style={general_user_profile_styles.user_avatar_zone}>
                    {/* Avatar */}
                    <View style={[general_user_profile_styles.user_avatar_child_zone]}>
                        <TouchableOpacity style={[general_user_profile_styles.avatar_border]}
                        onPress={() => {toggle_avatar_image_modal()}}>
                            {user_avt_uri !== ""? (
                                 <Image style={general_user_profile_styles.main_avt}
                                 source={{uri : user_avt_uri}}>
                                 </Image>
                            ): (
                                <UserAvatar size={100} name={`${first_name} ${last_name}`} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Username */}
                    <View style={general_user_profile_styles.username_zone}>
                        <Text style={general_user_profile_styles.username_text}
                        >{first_name} {last_name}</Text>
                    </View>

                    {/* User Id and Change Profile */}
                    <View style={general_user_profile_styles.userid_zone}>
                        <View style={general_user_profile_styles.userid_background}>
                            <Text style={general_user_profile_styles.userid_text}>onion.sm</Text>
                        </View>

                        <TouchableOpacity style={general_user_profile_styles.user_setting_background}
                        onPress={() =>
                        {
                            onClickChangeInfo(change_info_modal_name);
                        }
                        }>
                            <Text style= {general_user_profile_styles.general_text}>Sửa thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={general_user_profile_styles.user_locket_share_zone}>
                    <View style={general_user_profile_styles.locket_share_background}>
                        <View style={general_user_profile_styles.locket_share_background_zone1}>
                        <View style={[general_user_profile_styles.mini_avatar_border]}>
                        {user_avt_uri !== "" ? (
                                 <Image style={general_user_profile_styles.main_avt}
                                 source={{uri : user_avt_uri}}>
                                 </Image>
                            ): (
                                <UserAvatar size={35} name={`${first_name} ${last_name}`} />
                            )}
                            
                        </View>

                            <View style={general_user_profile_styles.locket_share_text_zone}>
                                <Text style={[general_user_profile_styles.general_text ,{fontSize:15}]}
                                >Mời bạn bè tham gia Locket</Text>
                                <Text style={[general_user_profile_styles.general_text2, {fontSize:15}]}
                                >locket.cam/onion</Text>
                            </View>
                        </View>

                        <View style={general_user_profile_styles.locket_share_background_zone2}>
                        <TouchableOpacity style={general_user_profile_styles.share_button_background}>
                            <Icon name="share" size={24} color="#FFFFFF" /> 
                        </TouchableOpacity>
                        </View>
                    </View> 
                </View>
                
                <View style={general_user_profile_styles.button_wrapper}>
                    <View style={general_user_profile_styles.extension_setting_zone}>
                        <View style={general_user_profile_styles.text_option_zone}>
                            <Icon name="add-box" size={24} color="#AAAAAA" />
                            <Text style={{
                                fontFamily: 'SF-Pro-Rounded-Bold',
                                fontSize: 16,
                                color: "#AAAAAA",
                                marginLeft: 5 
                            }}>
                                Thiết lập tiện ích
                            </Text>
                        </View>
                        <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                            {marginBottom: 1},
                            {borderTopLeftRadius : 20},
                            {borderTopRightRadius: 20},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="add-box" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Thêm tiện ích
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[general_user_profile_styles.medium_button,
                            {borderBottomLeftRadius: 20},
                            {borderBottomRightRadius: 20},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="help" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Hướng dẫn về tiện ích
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tổng quát */}
                <View style={general_user_profile_styles.button_wrapper}>
                    <View style={general_user_profile_styles.extension_setting_zone}>
                        <View style={general_user_profile_styles.text_option_zone}>
                            <Icon name="person" size={24} color="#AAAAAA" />
                            <Text style={{
                                fontFamily: 'SF-Pro-Rounded-Bold',
                                fontSize: 16,
                                color: "#AAAAAA",
                                marginLeft: 5 
                            }}>
                                Tổng quát
                            </Text>
                        </View>

                        
                        {/* Thay đổi địa chỉ email */}
                        <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                            {marginBottom: 1},
                            {borderTopLeftRadius : 20},
                            {borderTopRightRadius: 20},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="mail" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Thay đổi địa chỉ email
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>

                        {/* Chia sẻ phản hồi */}
                        <TouchableOpacity  onPress={() => feedbackModalRef.current?.present()}
                        style={[general_user_profile_styles.medium_button,  
                            {marginBottom: 1},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="send" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Chia sẻ phản hồi
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                        <FeedbackModal modalRef={feedbackModalRef} onClose={closeFeedbackModal}/>

                        {/* Báo cáo sự cố */}
                        <TouchableOpacity onPress={() => reportModalRef.current?.present()}
                            style={[general_user_profile_styles.medium_button, 
                            {borderBottomLeftRadius: 20},
                            {borderBottomRightRadius: 20},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="report" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Báo cáo sự cố
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                        <ReportModal modalRef={reportModalRef} onClose={closeReportModal}/>

                    </View>
                </View>
                

                <View style={general_user_profile_styles.button_wrapper}>
                    <View style={general_user_profile_styles.extension_setting_zone}>
                        <View style={general_user_profile_styles.text_option_zone}>
                            <Icon name="lock" size={24} color="#AAAAAA" />
                            <Text style={{
                                fontFamily: 'SF-Pro-Rounded-Bold',
                                fontSize: 16,
                                color: "#AAAAAA",
                                marginLeft: 5 
                            }}>
                                Riêng tư & bảo mật
                            </Text>
                        </View>
                        <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                            {marginBottom: 1},
                            {borderTopLeftRadius : 20},
                            {borderTopRightRadius: 20},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="person" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Tổng quát
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[general_user_profile_styles.medium_button,  
                            {marginBottom: 1},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20},
                                {borderBottomLeftRadius: 20},
                                {borderBottomRightRadius: 20}]}>
                                <Icon name="person" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                    Hiển thị tài khoản người dùng
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={general_user_profile_styles.button_wrapper}>
                    <View style={general_user_profile_styles.extension_setting_zone}>
                        <View style={general_user_profile_styles.text_option_zone}>
                            <Icon name="lock" size={24} color="#AAAAAA" />
                            <Text style={{
                                fontFamily: 'SF-Pro-Rounded-Bold',
                                fontSize: 16,
                                color: "#AAAAAA",
                                marginLeft: 5 
                            }}>
                                Vùng nguy hiểm
                            </Text>
                        </View>
                        <TouchableOpacity style={[general_user_profile_styles.medium_button, 
                            {marginBottom: 1},
                            {borderTopLeftRadius : 20},
                            {borderTopRightRadius: 20},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"}]}
                            onPress={() => {log_out(navigation)}}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="person" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                Đăng xuất
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[general_user_profile_styles.medium_button,  
                            {marginBottom: 1},
                            {display: "flex"},
                            {justifyContent: "space-evenly"},
                            {alignItems: "center"},
                            {flexDirection: "row"},
                            {borderBottomLeftRadius: 20},
                            {borderBottomRightRadius: 20}
                            ]}
                            onPress={()=> {toggle_delete_account_modal()}}>
                            <View style={[general_user_profile_styles.text_option_zone, {flex: 7},
                                {marginLeft: 20},
                                {marginRight: 20}]}>
                                <Icon name="person" size={24} color="#AAAAAA" />
                                <Text style={{
                                    fontFamily: 'SF-Pro-Rounded-Bold',
                                    fontSize: 16,
                                    color: "#AAAAAA",
                                    marginLeft: 5 
                                }}>
                                 Xóa tài khoản
                                </Text>
                            </View>
                            <View style={[{flex: 1}]}>
                                <Icon name="chevron-right" size={24} color="#FFFFFF"></Icon>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}    


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
      alignItems: 'center',
      borderTopLeftRadius: 45,
      borderTopRightRadius:45,
      backgroundColor: "#242424"
    },
  });

const log_out = (navigation : any) => {
    try
    {
        navigation.navigate("SignInScreen");
    }
    catch(ex)
    {
        console.log(ex);
    }
}