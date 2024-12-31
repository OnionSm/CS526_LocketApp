import { Modal, TextInput, StyleSheet, Image, Alert } from "react-native";
import { View, Text , TouchableOpacity} from "react-native";
import avatar_bottom_sheet_styles from "./bottom_sheet_styles/AvatarImageBottomSheetStyle";
import { useEffect, useState } from "react";
import { Axios } from "axios";
import AxiosInstance from "../instance/AxiosInstance";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from "react-native-fs";
import ImagePicker from 'react-native-image-crop-picker';

const base64ToBinary = (base64String : string) => {
  const binaryString = atob(base64String); 
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes; 
};

const binaryToBase64 = (binaryData: any) => {
  let binaryString = "";

  for (let i = 0; i < binaryData.length; i++) {
    binaryString += String.fromCharCode(binaryData[i]); 
  }

  return btoa(binaryString); 
};

const uriToBase64 = async (uri: any) => {
  try 
  {
    const base64String = await RNFS.readFile(uri, "base64");
    console.log("Base64 String:", base64String);
    return base64String;
  } catch (error) {
    console.error("Error converting URI to Base64:", error);
    throw error;
  }
};

const AvatarImageBottomSheet = ({isVisible, toggleModal} : { isVisible : boolean ; toggleModal: () => void}) =>
{
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const test = async () => {
      console.log(imageUri);
    };
    test();

  }, [imageUri])

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,           
        height: 400,           
        cropping: true,       
        compressImageQuality: 0.8,
        includeBase64: false,  
      });

      setImageUri(image.path); 
    } catch (error) {
      
        Alert.alert('Không thể chụp ảnh.');
      }
    }

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageUri(image.path);
    });
  };


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
              <View style={avatar_bottom_sheet_styles.main_view}>
                  <View style={avatar_bottom_sheet_styles.content_view}>
                      <View style={[{display: "flex"}, {flexDirection: "row"}, {alignItems: "flex-end"},{alignContent : "flex-end"},
                          {justifyContent: "space-around"}, {alignSelf: "flex-start"}
                      ]}>
                          <Text style={[{color:"#FFFFFF"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-Bold"},
                          {marginLeft: 20}]}>
                              Ảnh hồ sơ của bạn sẽ được hiển thị cho tất cả mọi người có số điện thoại của bạn
                          </Text>
                      </View>
                      <TouchableOpacity style={[{borderTopWidth: 1}, {width: "100%"}]}>
                          <Text style={[{color:"#FFFFFF"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-Bold"},
                          {marginLeft: 20}, {marginTop: 5}, {textAlign: "center"}]}
                          onPress={()=>{
                            openGallery();
                          }}>
                            Chọn từ thư viện
                          </Text>
                      </TouchableOpacity>  
                      <View style={[{borderTopWidth: 1}, {width: "100%"}]}>
                          <Text style={[{color:"#FFFFFF"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-Bold"},
                          {marginLeft: 20}, {marginTop: 5}, {textAlign: "center"}]}
                          onPress={() => {
                            openCamera();
                          }}>
                              Chụp ảnh
                          </Text>
                          
                      </View>
                      <View style={[{borderTopWidth: 1}, {width: "100%"}]}>
                          <Text style={[{color:"#FF4438"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-Bold"},
                          {marginLeft: 20}, {marginTop: 5}, {textAlign: "center"}]}>
                              Xóa ảnh hồ sơ
                          </Text>
                      </View>
                      <TouchableOpacity style={[{borderTopWidth: 1}, {width: "100%"}]}>
                          <Text style={[{color:"#FFFFFF"}, {fontSize: 20},{fontFamily: "SF-Pro-Rounded-Bold"},
                          {marginLeft: 20}, {marginTop: 5}, {textAlign: "center"}]}
                          onPress={() => {toggleModal()}}>
                              Hủy
                          </Text>
                      </TouchableOpacity>  
                      
                  </View>

              </View>
          </Modal>
      </View>
  );
}

export default AvatarImageBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});