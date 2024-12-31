import { Modal, TextInput } from "react-native";
import { View, Text , TouchableOpacity} from "react-native";
import error_delete_modal_styles from "./modal_styles/ErrorDeleteModalStyle";
import { useState } from "react";
import { Axios } from "axios";
import AxiosInstance from "../instance/AxiosInstance";

const ErrorDeleteModal = ({isVisible, toggleModal} : { isVisible : boolean ; toggleModal: () => void}) =>
{
    return (
        <View style={[{ backgroundColor: "#000000"},{display: "flex"}, 
            {alignContent: "center"}, 
            {alignItems: "center"},
            {justifyContent: "center"}, {flex: 1}]}
        > 
            <Modal 
             animationType="slide"
             transparent={true}
             visible={isVisible}
             onRequestClose={toggleModal}>
                <View style={error_delete_modal_styles.main_view}>
                    <View style={error_delete_modal_styles.content_view}>
                        <View style={[{display: "flex"}, {flexDirection: "row"}, {alignItems: "flex-end"},{alignContent : "flex-end"},
                            {justifyContent: "space-around"}, {alignSelf: "flex-start"}
                        ]}>
                            <Text style={[{color:"#000000"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {marginLeft: 20}]}>
                                Lỗi
                            </Text>
                        </View>
                        <Text style={[{color:"#000000"}, {fontSize: 16},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {marginLeft: 20}, {marginRight: 20}
                        ]}> 
                            Hãy kiểm tra lại rằng bạn đã điền đúng tin nhắn xác nhận phân biệt chữ hoa - chữ thường.    
                        </Text>
                        <View style={[{display: "flex"}, {flexDirection: "row"}, {alignItems: "flex-end"},{alignContent : "flex-end"},
                            {justifyContent: "space-around"}, {alignSelf: "flex-end"}
                        ]}>
                            <Text style={[{color:"#000000"}, {fontSize: 16},{fontFamily: "SF-Pro-Rounded-SemiBold"},
                            {marginRight: 30}, ]}
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

export default ErrorDeleteModal

