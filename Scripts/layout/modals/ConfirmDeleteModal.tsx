import { Modal, TextInput } from "react-native";
import { View, Text , TouchableOpacity} from "react-native";
import delete_user_account_styles from "./modal_styles/DeleteAccountModalStyles";
import { useState } from "react";
import { Axios } from "axios";
import AxiosInstance from "../instance/AxiosInstance";
import ErrorDeleteModal from "./ErrorDeleteModal";
import error_delete_modal_styles from "./modal_styles/ErrorDeleteModalStyle";
import { CommonActions } from '@react-navigation/native';

const DELETE_STRING = "DELETE"

const ConfirmDeleteModal = ({navigation, isVisible, toggleModal} : { navigation: any, isVisible : boolean ; toggleModal: () => void}) =>
{
    const [delete_str, set_delete_str] = useState("");
    const [error_delete_modal, set_error_delete_modal] = useState(false);

    const toggle_error_delete_modal = () =>
    {
        set_error_delete_modal(!error_delete_modal);
    }

    return (
        <View style={[{ backgroundColor: "#000000"},{display: "flex"}, 
            {alignContent: "center"}, 
            {alignItems: "center"},
            {justifyContent: "center"}, {flex: 1}]}
        > 
            <ErrorDeleteModal isVisible={error_delete_modal} toggleModal={toggle_error_delete_modal}></ErrorDeleteModal>
            <Modal 
             animationType="slide"
             transparent={true}
             visible={isVisible}
             onRequestClose={toggleModal}>
                <View style={delete_user_account_styles.main_view}>
                    <View style={delete_user_account_styles.content_view}>
                        <Text style={[{color:"#000000"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-Bold"},
                            {marginTop: 10}
                        ]}>
                            Nhấn {DELETE_STRING} để xóa tài khoản của bạn
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 14},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {marginLeft: 10}, {marginRight: 10}
                        ]}> 
                            Bạn sẽ mất các ảnh của mình, hành động này không thể hoàn tác
                        </Text>
                        <TextInput style={[{color:"#000000"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {marginLeft: 10}, {marginRight: 10}, {borderBottomWidth: 1}]}
                            placeholder="DELETE" value={delete_str} onChangeText={(text)=>{set_delete_str(text)}}>
                        </TextInput>
                        <View style={[{display: "flex"}, {flexDirection: "row"}, {alignItems: "flex-end"},{alignContent : "flex-end"},
                            {justifyContent: "space-around"}, {alignSelf: "flex-end"}
                        ]}>
                            <Text style={[{color:"#FF0000"}, {fontSize: 16},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {margin: 20}]}
                            onPress={async () => {
                                var res = await delete_account(delete_str);
                                if (res)
                                {
                                    navigation.dispatch(
                                        CommonActions.reset({
                                          index: 0, 
                                          routes: [{ name: 'SignInScreen' }], 
                                        })
                                      );
                                }
                                else
                                {
                                    toggle_error_delete_modal();
                                }
                            }}>
                                Xóa
                            </Text>
                            <Text style={[{color:"#000000"}, {fontSize: 16},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {margin: 20}]}
                            onPress={() => {
                                toggleModal();
                            }}>
                                Hủy
                            </Text>
                        </View>
                    </View>

                </View>
                
            </Modal>
        </View>
    );
}

export default ConfirmDeleteModal

const delete_account = async (delete_str : string) =>
{
    try {
        console.log(delete_str);
    
        if (delete_str === DELETE_STRING) {
          var response = await AxiosInstance.delete("api/user/delete");
    
          if (response.status === 200) 
            {
            console.log("TRUE");
            return true;
          }
          console.log("Delete failed with status:", response.status);
          return false;
        } else {
          console.log("Delete string does not match.");
          return false;
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        return false;
      }
}