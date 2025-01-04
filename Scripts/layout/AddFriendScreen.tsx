import React, { useEffect } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import add_friend_screen_style from './styles/AddFriendScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const shareLink = async () => {
    try {
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
    } catch (error) {
      console.error('Error sharing the link: ', error);
    }
  };

function AddFriendScreen({ navigation }: {navigation: any })
{
    return(
        
        <View style={add_friend_screen_style.main_view}>
            {/* Find Zone */}
            <View style={add_friend_screen_style.find_zone}>
                <Text style={add_friend_screen_style.find_zone_title}>Thêm bạn bè của bạn</Text>
                <Text style={add_friend_screen_style.find_zone_amout_friend}>0/20 người đã được bổ sung</Text>
                <TouchableOpacity style={add_friend_screen_style.search_bar}>
                    <Icon name="search" size={24} color="#FFFFFF" /> 
                    <TextInput style={add_friend_screen_style.search_bar_text}
                    placeholder='Thêm một người bạn'
                    placeholderTextColor="#888888"></TextInput>
                </TouchableOpacity>
            </View>

            {/* Find Friend In Other Apps */}
            <View style={add_friend_screen_style.find_in_other_app_zone}>
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
                <View style={add_friend_screen_style.list_other_app_zone}>
                    <TouchableOpacity style={add_friend_screen_style.list_other_app_item}>
                        <Image source={require('./GUI/MessengerIcon.png')}
                        style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}></Image>
                        <Text style={add_friend_screen_style.other_app_button_text}>Messenger</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={add_friend_screen_style.list_other_app_item}>
                        <Image source={require('./GUI/InstaIcon.png')}
                        style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}></Image>
                        <Text style={add_friend_screen_style.other_app_button_text}>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={add_friend_screen_style.list_other_app_item}>
                        <Image source={require('./GUI/ZaloIcon.png')}
                        style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}></Image>
                        <Text style={add_friend_screen_style.other_app_button_text}>Zalo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={add_friend_screen_style.list_other_app_item} 
                    onPress={() => shareLink()}>
                        <Image source={require('./GUI/ShareButton.png')}
                        style={[{width: "80%"}, {height: "80%"}, {resizeMode: "contain"}]}>
                        </Image>
                        <Text style={add_friend_screen_style.other_app_button_text}>Khác</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Send Invitation To Other Apps */}
            <View style={add_friend_screen_style.other_app_invitation_zone}>
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
                <TouchableOpacity style={[add_friend_screen_style.medium_button]}>
                    <View style={[add_friend_screen_style.text_option_zone, {flex: 6},
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

                <TouchableOpacity style={[add_friend_screen_style.medium_button]}>
                    <View style={[add_friend_screen_style.text_option_zone, {flex: 6},
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

                <TouchableOpacity style={[add_friend_screen_style.medium_button]}
                onPress={() => shareLink()}>
                    <View style={[add_friend_screen_style.text_option_zone, {flex: 6},
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


            {/* Button Zone */}
            <View style={add_friend_screen_style.buttonzone}>
                <TouchableOpacity style={add_friend_screen_style.continuebutton}
                onPress={async () => 
                {
                    navigation.navigate("MainScreenRoot");
                }
                }>
                    <Text style ={add_friend_screen_style.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    
}

export default AddFriendScreen