import { useEffect, useState, useContext } from "react";
import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, ImageBackground, Text, View, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/SignInWithEmailStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONNECTION_IP } from '@env';
import { SqliteDbContext } from './context/SqliteDbContext';
import SQLite from 'react-native-sqlite-storage';

const saveUserData = async (data: any, db: any) => {
    try 
    {
        await AsyncStorage.setItem("user_id", data.user.id);
        await AsyncStorage.setItem("first_name", data.user.firstName);
        await AsyncStorage.setItem("last_name", data.user.lastName);
        await AsyncStorage.setItem("email", data.user.email);
        await AsyncStorage.setItem("password",  data.user.password);
        await AsyncStorage.setItem("public_user_id", data.user.publicUserId);
        await AsyncStorage.setItem("addfriend_link", data.user.addFriendLink);
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


const saveToken = async (access_token: string, refresh_token: string) => {
    try {
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        console.log("Lưu token thành công");
    } catch (error) {
        console.log("Không thể lưu token", error);
    }
}


function ChooseUserIdName({navigation}: {navigation: any})
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

    const [user_id_name, SetUserIdName] = useState("");
    const [register_email, SetEmail] = useState("");
    const [register_password, SetPassword] = useState("");
    const [register_firstname, SetFirstName] = useState("");
    const [register_lastname, SetLastName] = useState("");

    const isFormValid = user_id_name.trim() !== '';

    useEffect(() =>{
        const LoadRegisterData = async () =>
        {
            try
            {
                const r_email = await AsyncStorage.getItem("sign_up_email");
                const r_password = await AsyncStorage.getItem("sign_up_password");
                const r_first_name = await AsyncStorage.getItem("first_name");
                const r_last_name = await AsyncStorage.getItem("last_name");
                if(r_email == null || r_password == null || r_first_name == null || r_last_name == null)
                {
                    console.log("Không thể lấy data đăng kí người dùng")
                }
                else
                {
                    SetEmail(r_email);
                    SetPassword(r_password);
                    SetFirstName(r_first_name);
                    SetLastName(r_last_name);
                    console.log("Lấy data đăng kí thành công");
                }
            }
            catch(error)
            {
                console.log("Không thể lấy dữ liệu đăng kí tài khoản");
            }
        };
        LoadRegisterData();
    }, []);
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
            <Text style={[styles.getphonezonetitle]}>Thêm một tên người dùng</Text>

            <TextInput  style={[styles.input]}
                        placeholder="Tên người dùng"
                        placeholderTextColor="#888888"
                        onChangeText={SetUserIdName}/>


            {/* Button Zone */}
            <TouchableOpacity   
                style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}]}
                disabled={!isFormValid}
                onPress={async () => 
                {
                    try
                    {
                        const result = await CreateAccount(user_id_name,
                            register_firstname,
                            register_lastname,
                            register_email, 
                            register_password
                        )
                        console.log(result);
                        if(result)
                        {
                            const result_login = await Login(register_email, register_password, sqlite_db_context.db);
                            if(result_login)
                            {
                                navigation.navigate("MainScreenRoot");
                            }
                            else
                            {
                                Alert.alert("", "Tên người dùng ny đã tồn tại.");
                            }
                        }
                        else
                        {
                            Alert.alert("", "Tên người dùng này đã tồn tại.");
                        }
                    }
                    catch(error)
                    {
                        console.log(`Có lỗi xảy ra trong quá trình đăng kí, ${error}`);
                    }
                    
                }
                }>
                    <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>Tiếp tục</Text>
                </TouchableOpacity>
        </View>
    )
}

export default ChooseUserIdName

async function CreateAccount(
    public_user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
): Promise<boolean> {
    
        // Tạo FormData và thêm các trường dữ liệu vào form
        const formData = new FormData();
        formData.append('PublicUserId', public_user_id);
        formData.append('FirstName', first_name);
        formData.append('LastName', last_name);
        formData.append('Email', email);
        formData.append('Password', password);
        console.log(formData);

    try
    {
        // Gửi yêu cầu POST với FormData
        const response = await fetch(`http://${CONNECTION_IP}:5115/api/user/create`, {
            method: 'POST',
            body: formData,
        });

        // Kiểm tra phản hồi từ server
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }

        // Phân tích JSON phản hồi từ server
        const responseData = await response.json();

        // Trả về true nếu phản hồi chứa thông tin thành công
        if (responseData) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`Có lỗi xảy ra trong quá trình đăng ký: ${error}`);
        return false;
    }
}



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
            console.log(data.accessToken);
            console.log(data.refreshToken);
            await saveToken(data.accessToken, data.refreshToken);
            await saveUserData(data, db);
            console.log("Lưu thông tin người dùng thành công")
        }
        return data;
    } 
    catch (error) 
    {
        console.error('Error fetching data:', error);
    }
}
