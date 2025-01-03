import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import SQLite from "react-native-sqlite-storage";

export class SynchronFriendData
{
    public get_friend_data_from_sqlite = async (user_id: string): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const db = SQLite.openDatabase({ name: "Locket.db", location: "default" });

            db.transaction((tx: any) => 
            {
                tx.executeSql(
                    `
                    SELECT friend_id AS id, friend_name AS name, friend_avt AS avatar
                    FROM Friend
                    WHERE user_id = ?
                    `,
                    [user_id],
                    (tx: any, results: any) => 
                    {
                        const friends = [];
                        const rows = results.rows;
                        for (let i = 0; i < rows.length; i++) {
                            friends.push(rows.item(i));
                        }
                        resolve(friends); 
                    },
                    (tx: any, error: any) => 
                    {
                        console.error("Lỗi truy vấn:", error);
                        reject(error); 
                    }
                );
            });
        });
    };

   
    public hashFriend = (friend: any) => {
        const jsonString = JSON.stringify({
            id: friend.id,
            name: friend.name,
            avatar: friend.avatar,
        });

        return CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex);
    };

    // Hàm hash danh sách bạn bè
    public hashFriendsList = (friends: any[]) => {
        const combinedHash = friends
            .map(this.hashFriend)
            .join(""); // Kết hợp hash của từng người
        return CryptoJS.SHA256(combinedHash).toString(CryptoJS.enc.Hex);
    };

   
    public static synchron_friend_data = async () => {
        try 
        {
            const user_id = await AsyncStorage.getItem("user_id");
            if (!user_id) 
            {
                console.error("Không tìm thấy user_id trong AsyncStorage.");
                return;
            }

            const synchronizer = new SynchronFriendData();
            const friends = await synchronizer.get_friend_data_from_sqlite(user_id);
            console.log("Friend from sqlite", friends)

            // // Hash danh sách bạn bè hiện tại
            // const newHash = synchronizer.hashFriendsList(friends);

            // // Lấy hash cũ từ AsyncStorage
            // const oldHash = await AsyncStorage.getItem("friend_list_hash");

            // // So sánh hash
            // if (newHash !== oldHash) {
            //     console.log("Dữ liệu bạn bè đã thay đổi. Đang cập nhật...");
            //     await AsyncStorage.setItem("friend_list_hash", newHash);
            //     await AsyncStorage.setItem("friend_list", JSON.stringify(friends));
            //     console.log("Cập nhật dữ liệu bạn bè thành công.");
            // } else {
            //     console.log("Dữ liệu bạn bè không thay đổi.");
            // }
        } 
        catch (error) 
        {
            console.error("Lỗi trong quá trình đồng bộ dữ liệu bạn bè:", error);
        }
    };
}
