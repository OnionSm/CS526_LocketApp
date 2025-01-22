import { sqliteService } from "./sqliteService";

export class userService
{
    static save_data_user = async (user: any, db: any) =>
    {
        db.transaction((tx: any) => 
        {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS User (
                user_id TEXT PRIMARY KEY,
                publicUserId TEXT NOT NULL DEFAULT '',
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                age INTEGER,
                gender TEXT DEFAULT '',
                phoneNumber TEXT,f
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
                    user.id, 
                    user.publicUserId, 
                    user.firstName,
                    user.lastName, 
                    user.phoneNumber, 
                    user.email, 
                    user.password,
                    user.userAvatarURL
                ],
                (tx: any, results: any) => 
                {
                    console.log('User added or updated successfully');
                },
                (error: any) => 
                {
                    console.log('Error adding or updating user:', error);
                }
            );
            userService.save_user_avatar(user.id, user.userAvatarURL, db);
        });
    }
        
    static save_user_avatar = async (user_id: string, user_avt: string, db : any) => 
    {
        db.transaction((tx: any) => 
        {
    
            tx.executeSql(
                `UPDATE User
                SET userAvatarURL = ?
                WHERE user_id = ?`,
                [user_avt, user_id],
                (tx: any, results: any) => 
                {
                    // Kiểm tra kết quả sau khi cập nhật thành công
                    if (results.rowsAffected > 0) 
                    {
                        console.log('User avatar updated successfully');
                    } 
                    else 
                    {
                        console.log('No rows affected, check if user_id exists');
                    }
                },
                (error: any) => 
                {
                    console.log('Error adding or updating user:', error);
                }
            );
        });
    }
    
}