import { Modal } from "react-native";
import { View, Text , TouchableOpacity} from "react-native";
import delete_user_account_styles from "./modal_styles/DeleteAccountModalStyles";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const DeleteAccountModal = ({ navigation, isVisible, toggleModal} : {navigation: any;  isVisible : boolean ; toggleModal: () => void}) =>
{
    const [confirm_delete_account_modal_state, set_confirm_delete_account_modal] = useState(false);
    
    const toggle_confirm_delete_account_modal = () => 
    {
        set_confirm_delete_account_modal(!confirm_delete_account_modal_state);
    }

    return (

        <View style={[{ backgroundColor: "#000000"},{display: "flex"}, 
            {alignContent: "center"}, 
            {alignItems: "center"},
            {justifyContent: "center"}, {flex: 1}]}
        > 
            <ConfirmDeleteModal navigation={navigation} isVisible={confirm_delete_account_modal_state} toggleModal={toggle_confirm_delete_account_modal}></ConfirmDeleteModal>
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
                            Chúng tôi rất tiếc phải tạm biệt bạn!
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 14},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {marginLeft: 10}, {marginRight: 10}
                        ]}> 
                            Hãy giúp chúng tôi hiểu lý do bạn xóa tài khoản Locket của mình.
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 18},{fontFamily: "SF-Pro-Rounded-Bold"}]}
                        onPress={()=>{
                            toggle_confirm_delete_account_modal();
                        }}>
                            Bạn bè của tôi không có trên Locket
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 18},{fontFamily: "SF-Pro-Rounded-Bold"}]}
                        onPress={()=>{
                            toggle_confirm_delete_account_modal();
                        }}>
                            Tôi ít dùng Locket
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 18},{fontFamily: "SF-Pro-Rounded-Bold"}]} 
                        onPress={()=>{
                            toggle_confirm_delete_account_modal();
                        }}>
                            Tôi chỉ dùng thử Locket mà thôi
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 18},{fontFamily: "SF-Pro-Rounded-Bold"}]} 
                        onPress={()=>{
                            toggle_confirm_delete_account_modal();
                        }}>
                            Khác
                        </Text>
                        <Text style={[{color:"#000000"}, {fontSize: 18},{fontFamily: "SF-Pro-Rounded-Bold"}]}
                        onPress={()=>{
                            toggleModal();
                        }}> 
                            Quay lại
                        </Text>
                    </View>

                </View>
                
            </Modal>
        </View>
    );
}

export default DeleteAccountModal