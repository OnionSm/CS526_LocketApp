import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
import SignInScreen from './Scripts/layout/SignInScreen';
import GetPhoneNumber from './Scripts/layout/GetPhoneNumber';
import SignInWithEmail from './Scripts/layout/SignInWithEmail';
import ChoosePassword from './Scripts/layout/ChoosePassword';
import ChooseUserName from './Scripts/layout/ChooseUserName';
import GeneralUserProfile from './Scripts/layout/GeneralUserProfile';
import MainScreen from './Scripts/layout/MainScreen';
import { name as appName } from './app.json';
import "./global.css";

const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInScreen">
        <Stack.Screen 
          name="SignInScreen" 
          component={SignInScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GetPhoneNumber" 
          component={GetPhoneNumber} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignInWithEmail" 
          component={SignInWithEmail} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChoosePassword" 
          component={ChoosePassword} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChooseUserName" 
          component={ChooseUserName} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GeneralUserProfile" 
          component={GeneralUserProfile} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
