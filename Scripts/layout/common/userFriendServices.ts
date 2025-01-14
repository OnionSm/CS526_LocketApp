import { sqliteService } from "./sqliteService";

export class userFriendServices
{
    static save_friend_data = async (user_id: string, data: any, db: any): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try 
            {
                // Tạo bảng nếu chưa tồn tại
                db.transaction((tx: any) => {
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS Friend (
                            user_id TEXT NOT NULL,
                            friend_id TEXT NOT NULL,
                            first_name TEXT,
                            last_name TEXT,
                            friend_avt TEXT,
                            PRIMARY KEY (user_id, friend_id)
                        )`,
                        [],
                        () => console.log("Table created or already exists"),
                        (error: any) => {
                            console.error("Error creating table:", error);
                            reject(false); // Bỏ qua tiếp tục nếu tạo bảng thất bại
                        }
                    );
                });
    
                // Chèn hoặc cập nhật dữ liệu bạn bè
                db.transaction((tx: any) => {
                    let successCount = 0;
                    let errorOccurred = false;
    
                    data.forEach((friend: any) => {
                        tx.executeSql(
                            `INSERT OR REPLACE INTO Friend (user_id, friend_id, first_name, last_name, friend_avt) 
                                VALUES (?, ?, ?, ?, ?)`,
                            [
                                user_id,
                                friend.id,
                                friend.first_name,
                                friend.last_name,
                                friend.userAvatarURL,
                            ],
                            () => {
                                successCount++;
                                // Nếu tất cả dữ liệu được chèn thành công
                                if (successCount === data.length && !errorOccurred) {
                                    resolve(true);
                                }
                            },
                            (error: any) => {
                                console.error("Error adding or updating friend:", error);
                                errorOccurred = true;
                                reject(false); // Trả về false nếu bất kỳ lỗi nào xảy ra
                            }
                        );
                    });
                });
            } 
            catch (error) 
            {
                console.error("Unexpected error:", error);
                reject(false); // Trả về false nếu có lỗi ngoại lệ
            }
        });
    };
}