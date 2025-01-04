import { useRef, useState, useEffect , createContext, useContext, useCallback} from 'react';
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button,
     TouchableOpacity, TextInput, Modal, ScrollView,
     RefreshControl, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StyleSheet,
     SectionList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import back_to_main_screen_button_styles from './component_styles/BackToMainScreenButtonStyle';

const BackToMainScreenButton = ({enable, scroll_to_top} : {enable : boolean; scroll_to_top : () => void}) =>
{
     return(
          <TouchableOpacity style={[back_to_main_screen_button_styles.container, {display: enable == true ? "flex" : "none"}]}
          onPress={() => {scroll_to_top()}}>
               <Icon name="keyboard-control-key" size={40} color="#FFFFFF" /> 
          </TouchableOpacity>
     )
}

export default BackToMainScreenButton