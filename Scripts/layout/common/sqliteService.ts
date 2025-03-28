import SQLite from 'react-native-sqlite-storage';
import { useContext } from 'react';
import { SqliteDbContext } from '../context/SqliteDbContext';
export class sqliteService
{
    static saveAvatarToDatabase = async (user_id: string, imagePath: string) => {
    try 
    {
        const db = await SQLite.openDatabase({ name: 'Locket.db', location: 'default' });

        db.transaction((tx: any) => {
            tx.executeSql(
                `UPDATE User 
                SET userAvatarURL = ?
                WHERE user_id = ?`,
                [imagePath, user_id],
                (tx : any , results: any) => {
                console.log('User avatar updated successfully');
                },
                (error: any) => {
                console.log('Error updating user avatar:', error);
                throw error; 
                }
            );
        });

        db.close();
    } 
    catch (error) 
    {
        console.log("Error saving avatar to database:", error);
        throw error; 
    }
    };
}