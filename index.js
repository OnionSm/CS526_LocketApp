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
import SignUpWithEmail from './Scripts/layout/SignUpWithEmail';
import SignUpChoosePassword from './Scripts/layout/SignUpChoosePassword';
import ChooseUserIdName from './Scripts/layout/ChooseUserIdName';
import OfficialStory from './Scripts/layout/OfficicalStory';
import AddFriendScreen from './Scripts/layout/AddFriendScreen';
import MessageScreen from './Scripts/layout/MessageScreen';
import { name as appName } from './app.json';
import "./global.css";
import PersonalChatScreen from './Scripts/layout/PersonalChatScreen';
import { UserMessageProvider } from './Scripts/layout/context/UserMessageContext';
import ChangeInfoModal from './Scripts/layout/ChangeInfoModal';
import UserModal from './Scripts/layout/UserModal';
import DeleteAccountModal from './Scripts/layout/modals/DeleteAccountModal';
import ConfirmDeleteModal from './Scripts/layout/modals/ConfirmDeleteModal';
import ErrorDeleteModal from './Scripts/layout/modals/ErrorDeleteModal';
import AvatarImageBottomSheet from './Scripts/layout/bottom_sheets/AvatarImageBottomSheet';
import TermsOfService from './Scripts/layout/TermsOfService';
import Policy from './Scripts/layout/Policy';
import MainScreenHeader from './Scripts/layout/components/MainScreenHeader';
import StoryBottomBar from './Scripts/layout/components/StoryBottomBar';
import StoryItem from './Scripts/layout/components/StoryItem';
import ChangeEmailModal from './Scripts/layout/ChangeEmailModal';
import CheckPasswordModal from './Scripts/layout/CheckPasswordModal';

import MainScreenStoryTab from './Scripts/layout/MainScreenStoryTab';
import MainScreenRoot from './Scripts/layout/MainScreenRoot';
import AddFriendModal from './Scripts/layout/AddFriendModal';
import { SqliteDbProvider } from './Scripts/layout/context/SqliteDbContext';
import { IntervalProvider } from './Scripts/layout/context/IntervalContext';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <IntervalProvider>
    <UserMessageProvider>
      <SqliteDbProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="SignInScreen">
          <Stack.Screen 
            name="SignInScreen" 
            component={SignInScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="MainScreenRoot" 
            component={MainScreenRoot} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="PersonalChatScreen" 
            component={PersonalChatScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="AvatarImageBottomSheet" 
            component={AvatarImageBottomSheet} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="MessageScreen" 
            component={MessageScreen} 
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
            name="AddFriendScreen" 
            component={AddFriendScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="OfficialStory" 
            component={OfficialStory} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ChooseUserIdName" 
            component={ChooseUserIdName} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen 
            name="SignUpWithEmail" 
            component={SignUpWithEmail} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SignUpChoosePassword" 
            component={SignUpChoosePassword} 
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
            name="TermsOfService" 
            component={TermsOfService} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Policy" 
            component={Policy} 
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
        </Stack.Navigator>
      </NavigationContainer>
      </SqliteDbProvider>
    </UserMessageProvider>
    </IntervalProvider>
    
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
