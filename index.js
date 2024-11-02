/**
 * @format
 */
import "./global.css"
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignInScreen from './Scripts/layout/SignInScreen';
import GetPhoneNumber from './Scripts/layout/GetPhoneNumber';
import SignInWithEmail from './Scripts/layout/SignInWithEmail';
import ChoosePassword from './Scripts/layout/ChoosePassword';
import ChooseUserName from './Scripts/layout/ChooseUserName';
import GeneralUserProfile from './Scripts/layout/GeneralUserProfile';
import MainScreen from './Scripts/layout/MainScreen';
AppRegistry.registerComponent(appName, () => MainScreen);
