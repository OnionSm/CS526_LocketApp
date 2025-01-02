import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'
import { CONNECTION_IP } from "@env";



const BASE_URL = `http://${CONNECTION_IP}:5115`;
let access_token = AsyncStorage.getItem("access_token");

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:{Authorization: `Bearer ${access_token}`}
});

AxiosInstance.interceptors.request.use(async (req) => {
    // Get the access token from AsyncStorage asynchronously
    let access_token = await AsyncStorage.getItem("access_token");
    //console.log("access_token : ", access_token);
    if (access_token) 
    {
        req.headers.Authorization = `Bearer ${access_token}`;

        // Decode the token to check expiration
        const decoded_token = jwtDecode(access_token);
        //console.log(decoded_token);
        const isExpired = decoded_token.exp!= undefined ? dayjs.unix(decoded_token.exp).diff(dayjs()) < 1 : true;
        if (!isExpired) return req; 
    }

    const refresh_token = await AsyncStorage.getItem("refresh_token");
    //console.log(refresh_token);
    if (refresh_token) 
    {
        
        const formData = new FormData();
        formData.append('refresh_token', refresh_token);

        const response = await axios.post(`${BASE_URL}/api/refresh-token`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Đảm bảo gửi đúng Content-Type
            }
        });

        if (response.status === 200) 
        {
            console.log("respone", response.data);
            await AsyncStorage.setItem("access_token", response.data);
            req.headers.Authorization = `Bearer ${response.data}`;
        }
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

export default AxiosInstance