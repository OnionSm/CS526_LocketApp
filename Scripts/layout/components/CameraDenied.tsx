import React from 'react';
import { View, Text, Button } from 'react-native';
import { openSettings } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CameraDenied()
{
    return( 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="camera" size={50} color="#AAAAAA" />
        <Text style={{ fontSize: 18, color: "#FFFFFF" }}>Camera không khả dụng</Text>
        </View>  
    )
}

export default CameraDenied