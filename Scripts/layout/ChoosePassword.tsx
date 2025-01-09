import React, { useEffect, useContext } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import styles from './styles/SignInWithEmailStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import { UriParser } from './common/UriParser';
import { sqliteService } from './common/sqliteService';
import AxiosInstance from './instance/AxiosInstance';
import { CONNECTION_IP } from '@env';
import { SqliteDbContext } from './context/SqliteDbContext';
import { GET_FRIEND_DATA_COOLDOWN } from "@env"
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const saveUserData = async (data: any, db: any) => {
    try 
    {
        await AsyncStorage.setItem("user_id", data.user.id);
        await AsyncStorage.setItem("first_name", data.user.firstName);
        await AsyncStorage.setItem("last_name", data.user.lastName);
        await AsyncStorage.setItem("email", data.user.email);
        await AsyncStorage.setItem("password",  data.user.password);
        await AsyncStorage.setItem("public_user_id", data.user.publicUserId);
        await AsyncStorage.setItem("phone_number", data.user.phoneNumber);
        await AsyncStorage.setItem("show_user", JSON.stringify(data.user.showUser));
        await AsyncStorage.setItem("user_avatar_url", data.user.userAvatarURL);
        await AsyncStorage.setItem("list_friends", JSON.stringify(data.user.friends));
        await AsyncStorage.setItem('access_token', data.token.accessToken);
        await AsyncStorage.setItem("refresh_token", data.token.refreshToken);
        console.log("Lưu token thành công");

     
        db.transaction((tx: any) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS User (
                user_id TEXT PRIMARY KEY,
                publicUserId TEXT NOT NULL DEFAULT '',
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                age INTEGER,
                gender TEXT DEFAULT '',
                phoneNumber TEXT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                userAvatarURL TEXT,
                friends TEXT,  -- This will store the list as a comma-separated string (you'll need to handle this in your application logic)
                accountDeleted INTEGER DEFAULT 0  -- Use 0 for false, 1 for true
                )`,
                [],
                () => {
                console.log('User table created successfully');
                },
                (error: any) => {
                    console.log('Error creating User table:', error);
                }
                );

            tx.executeSql(
                    `INSERT OR REPLACE INTO User (user_id, publicUserId, firstName, lastName, phoneNumber, email, password, userAvatarURL) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.user.id, 
                    data.user.publicUserId, 
                    data.user.firstName, 
                    data.user.lastName, 
                    data.user.phoneNumber, 
                    data.user.email, 
                    data.user.password,
                    data.user.userAvatarURL
                ],
                (tx: any, results: any) => {
                    console.log('User added or updated successfully');
                },
                (error: any) => {
                    console.log('Error adding or updating user:', error);
                }
            );
        });
    } 
    catch (error) 
    {
        console.log("Không thể lưu token", error);
    }
}



function ChoosePassword({ navigation }: {navigation: any })
{

// ------------------------------ SET DATABASE --------------------------------
    const sqlite_db_context = useContext(SqliteDbContext);

    useEffect(() =>{
        const open_database = async () =>
        {
            const db = SQLite.openDatabase(
                {name: 'Locket.db', location: 'default'});
            sqlite_db_context.set_db(db);
        };
        open_database();
    }, []);

// -------------------------------------------------------------------------------



// ----------------------------------------  SET FRIEND DATA ---------------------------------


// ----------------------------------------------------------------------------------------------


    const [login_email, setEmail] = useState("");
    const [input_password, SetPassword] = useState("");
    
    useEffect(() =>{
        const LoadEmail = async () =>
        {
            const savedEmail = await AsyncStorage.getItem('login_email');
            if(savedEmail)
            {
                setEmail(savedEmail);
            }
        }
        LoadEmail();
    }, []);

    const isFormValid = input_password.trim() !== '';
    const [isTextVisible, setIsTextVisible] = useState(false);

    // Handle Eye Button
    const handleEyeButtonPress = () => {
        setIsTextVisible(!isTextVisible);
    }

    
    return(
        <View style={styles.main_view}>

            {/* Back Zone */}
            <TouchableOpacity
                style={styles.backbutton}
                onPress={() => navigation.navigate("SignInScreen")}
            >
                <Icon name="arrow-back-ios" size={22} color="#FFFFFF"/>
            </TouchableOpacity>

            {/* Type Password Zone */}
            <Text style={styles.getphonezonetitle}>Chọn mật khẩu đăng nhập</Text>

            <View style={local_styles.inputzone}>
            <TextInput  style={local_styles.input}
                        onChangeText={SetPassword}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#888888"
                        secureTextEntry={!isTextVisible}/>

            
            <Icon.Button onPress={handleEyeButtonPress} color={isTextVisible ? "#ffffff" : "#1F1F1F"}
            name="remove-red-eye" size={30} backgroundColor="#2F2F2F" style={local_styles.eyebutton}/>

            </View>

            {/* Button Zone */}
            <TouchableOpacity 
                style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
                disabled={!isFormValid} // Vô hiệu hóa button khi form không hợp lệ
                onPress={async() => 
                {
                    var data = await Login(login_email, input_password, sqlite_db_context.db);
                    if(!data)
                    {
                        Alert.alert("Thất bại", "Mật khẩu không chính xác!");
                    }
                    else
                    {
                        navigation.navigate("MainScreenRoot");
                    }
                    
                }
                }>
                    <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>Tiếp tục</Text>
                </TouchableOpacity>
        </View>
    )
}

export default ChoosePassword

async function Login(email: string, password : string, db: any) 
{
    const formData = new FormData();
    formData.append('Email', email);
    formData.append("Password",password);

    console.log(formData);

    try {
        const response = await fetch(`http://${CONNECTION_IP}:5115/api/login/email`, 
            {
            method: 'POST',
            body: formData, 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();  // Chờ phản hồi JSON
        if(data != null)
        {
            console.log(data.token.accessToken);
            console.log(data.token.refreshToken);
            await saveUserData(data, db);
        }
        return data;
    } 
    catch (error) 
    {
        console.error('Error fetching data:', error);
    }
}



const local_styles = StyleSheet.create({
    inputzone: {
        backgroundColor: '#2F2F2F',
        borderRadius: 10,
        height: 60,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 0.05*width,
        marginVertical: 0.02*height,
    },
    input: {
        marginLeft:0.03*width,
        flex: 7,
        width: 0.7*width,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textArea: {
        height: 150, 
    },
    eyebutton:{
        flex: 1,
        backgroundColor: '#2F2F2F',
        width: 0.15*width,
    },
})
