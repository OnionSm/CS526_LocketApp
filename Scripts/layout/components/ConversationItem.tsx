import { Image, ImageBackground, Text, View, Button,
    TouchableOpacity, TextInput, Modal, ScrollView,
    RefreshControl, NativeScrollEvent, Share, NativeSyntheticEvent, Dimensions, StyleSheet, Linking, Alert} from 'react-native';
import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import conversation_item_styles from './component_styles/ConversationItemStyles';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConversationItem = ({user_avt_uri, firstname, lastname, time, message, choose_conversation}:
    {user_avt_uri: string; firstname: string; lastname: string; time: string; message: string; choose_conversation: () => void}) =>
{
    return (
        <TouchableOpacity style={conversation_item_styles.conversation_item_background}
        onPress={() => {choose_conversation()}}>
            <View style={conversation_item_styles.main_zone}>
                <View style={[conversation_item_styles.avatar_border]}>
                    {user_avt_uri != null && user_avt_uri != undefined &&  user_avt_uri !== "" ? (
                        <Image style={conversation_item_styles.main_avt}
                        source={{uri : user_avt_uri}}/>
                    ): (
                        <UserAvatar size={35} name={`${firstname} ${lastname}`} />
                    )}
                </View>
                <View>
                    <View>
                        <View style={conversation_item_styles.name_and_time}>
                            <Text style={conversation_item_styles.name}>{firstname} {lastname}</Text>
                            <Text style={conversation_item_styles.time}>{time}</Text>
                        </View>
                        <Text style={conversation_item_styles.message}>{message}</Text>
                    </View>
                </View>
            </View>
            <Icon name="chevron-right" size={24} color="#FFFFFF" style={{marginRight: 30}}/>

        </TouchableOpacity>
    )
}

export default ConversationItem