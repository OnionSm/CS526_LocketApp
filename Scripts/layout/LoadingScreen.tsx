import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Để điều hướng
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useContext } from 'react';
import { SqliteDbContext } from './context/SqliteDbContext';
import SQLite from 'react-native-sqlite-storage';
import { useState } from 'react';

const LoadingScreen = ({navigation}: {navigation: any}) => 
{
    const sqlite_db_context = useContext(SqliteDbContext);
    
    const [isDbReady, setIsDbReady] = useState(false);

    // Mở cơ sở dữ liệu và lưu vào context
    useEffect(() => {
        const open_database = async () => {
        const db = SQLite.openDatabase({ name: 'Locket.db', location: 'default' });
        sqlite_db_context.set_db(db);
        
        // Sau khi mở thành công, đặt trạng thái isDbReady là true
        setIsDbReady(true);
        };
        open_database();
    }, []);

    // Kiểm tra đăng nhập và điều hướng màn hình
    useEffect(() => 
    {
        const checkUserLoggedIn = async () => {
        // Kiểm tra token khi cơ sở dữ liệu sẵn sàng
        if (isDbReady) 
        {
            const token = await AsyncStorage.getItem('refresh_token');
            if (token) 
            {
            navigation.navigate('MainScreenRoot'); // Điều hướng nếu đã đăng nhập
            } 
            else 
            {
            navigation.navigate('SignInScreen'); // Điều hướng nếu chưa đăng nhập
            }
        }
        };
        checkUserLoggedIn(); // Kiểm tra khi database đã sẵn sàng
    }, [isDbReady, navigation]);



  useEffect(() => {
    const checkUserLoggedIn = async () => {
        // Giả sử bạn kiểm tra token hoặc làm gì đó
        const token = await AsyncStorage.getItem('refresh_token');
        if (token) 
        {
            navigation.navigate('MainScreenRoot'); // Điều hướng nếu đã đăng nhập
        } 
        else 
        {
            navigation.navigate('SignInScreen'); // Điều hướng nếu chưa đăng nhập
        }
    };
    checkUserLoggedIn(); // Kiểm tra khi loading xong
  }, [navigation]);


  return (
    <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#888888" />
        </SafeAreaView>
  </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: "#121212"
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  

export default LoadingScreen;
