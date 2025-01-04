import React, { useEffect, useContext } from 'react';
import {useState, type PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlagIcon from 'react-native-ico-flags';
import change_password_styles from './styles/ChoosePasswordStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import { UriParser } from './common/UriParser';
import { sqliteService } from './common/sqliteService';
import AxiosInstance from './instance/AxiosInstance';
import { CONNECTION_IP } from '@env';
import { SqliteDbContext } from './context/SqliteDbContext';
import { GET_FRIEND_DATA_COOLDOWN } from "@env"

const saveUserData = async (data: any, db: any) => {
    try 
    {
        
        await AsyncStorage.setItem("user_id", data.user.id);
        await AsyncStorage.setItem("first_name", data.user.firstName);
        await AsyncStorage.setItem("last_name", data.user.lastName);
        await AsyncStorage.setItem("email", data.user.email);
        await AsyncStorage.setItem("public_user_id", data.user.publicUserId);
        await AsyncStorage.setItem("phone_number", data.user.phoneNumber);
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

const saveFriendData = async (db: any) => 
{
    try 
    {   
        var user_id = await AsyncStorage.getItem("user_id");
        var res = await AxiosInstance.get("api/user/friend/info");
        if (res.status !== 200) 
        {
            console.log("Không lấy được dữ liệu bạn bè từ API");
            return;
        }

        var data = res.data;  
        
        db.transaction((tx: any) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Friend (    
                    user_id TEXT NOT NULL,
                    friend_id TEXT NOT NULL,
                    first_name TEXT,
                    last_name TEXT,
                    friend_avt TEXT,
                    PRIMARY KEY (user_id, friend_id)
                )`
            );
            
            data.forEach((friend: any) => {
                
                tx.executeSql(
                    `INSERT OR REPLACE INTO Friend (user_id, friend_id, first_name, last_name, friend_avt) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [
                        user_id,      
                        friend.id,
                        friend.first_name,  
                        friend.last_name,
                        friend.userAvatarURL    
                    ],
                    (tx: any, results: any) => {
                        console.log('User added or updated successfully');
                    },
                    (error: any) => {
                        console.log('Error adding or updating friend:', error);
                    }
                );
            });
        });
    } catch (error) 
    {
        console.log("Không thể lưu data friend user", error);
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            saveFriendData(sqlite_db_context.db); 
        }, Number(GET_FRIEND_DATA_COOLDOWN)); 
        return () => clearInterval(intervalId); 
    }, []);

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



    
    return(
        <View style={change_password_styles.main_view}>
            {/* Back Zone */}
            <View style={change_password_styles.backzone}>
                <TouchableOpacity style={change_password_styles.backbutton}
                onPress={() => navigation.navigate("SignInWithEmail")}>
                    <Icon name="arrow-back-ios" size={24} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>

            {/* Type Password Zone */}
            <View style={change_password_styles.getpasswordzone}>
                <Text style={change_password_styles.getpasswordzonetitle}>Chọn mật khẩu đăng nhập</Text>

                <View style ={change_password_styles.inputzone}>
                    <TextInput  style={change_password_styles.inputzonetext}
                        value={input_password} 
                        onChangeText={e => SetPassword(e)}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#888888"
                        secureTextEntry={true}>

                    </TextInput>
                    
                </View>
                <Text style={change_password_styles.passwordguide}>Mật khẩu phải có ít nhất 8 kí tự</Text>
            </View>

            {/* Button Zone */}
            <View style={change_password_styles.buttonzone}>
                <TouchableOpacity style={change_password_styles.continuebutton}
                onPress={async() => 
                {
                    var data = await Login(login_email, input_password, sqlite_db_context.db);
                    if(!data)
                    {
                        console.log("Mật khẩu không chính xác xin vui lòng thử lại");
                    }
                    else
                    {
                        navigation.navigate("MainScreenRoot");
                    }
                    
                }
                }>
                    <Text style ={change_password_styles.continuetext}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
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
            await saveFriendData(db);
        }
        return data;
    } 
    catch (error) 
    {
        console.error('Error fetching data:', error);
    }
}



