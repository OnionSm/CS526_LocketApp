import React from 'react';
import { View, Text, Button } from 'react-native';
import { openSettings } from 'react-native-permissions';

const PermissionsPage = () => {
    return (
        <View style={[{ flex: 1}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
            <Text>Ứng dụng cần quyền truy cập vào camera để hoạt động.</Text>
            <Button title="Mở cài đặt" onPress={openSettings} />
        </View>
    );
};

export default PermissionsPage;
