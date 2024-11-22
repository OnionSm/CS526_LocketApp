import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const your_message_background = "#CFCFCF";
const your_message_color = "#000000"
const friend_message_background = "#333333";
const friend_message_color = "#FFFFFF";
const personal_chat_style = StyleSheet.create({
    main_view:{
        justifyContent: 'center',
        opacity: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#050505",
        width : width,
        height: height
    },
    header_zone:
    {
        width: width,
        height: 0.09* height,
        display: "flex",
        alignItems:"center",
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row",
    },
    backbutton:
    {
        width: 45, 
        height: 45, 
        borderRadius: 30, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        marginRight:20
    },
    avatar_and_name:
    {
        display:"flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar:
    {
        width: 40, 
        height: 40, 
        borderRadius: 30, 
    },
    name:
    {
        marginLeft: 10,
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    message_zone:
    {
        width: width,
        height: 0.81* height,
    },
    message_item:
    {
        width: width,
        minHeight: 0.05*height,
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    message_background_user:
    {
        maxWidth: "65%",
        backgroundColor: your_message_background,
        borderRadius: 30,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    message_background_friend:
    {
        maxWidth: "65%",
        backgroundColor: friend_message_background,
        borderRadius: 30,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"

    },
    messsage_style_user:
    {
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        color: your_message_color,
        fontFamily: "SF-Pro-Rounded-SemiBold",
    },
    messsage_style_friend:
    {
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        color: friend_message_color,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: "SF-Pro-Rounded-SemiBold",
    },
    send_message_zone:
    {
        width: width,
        height: 0.1* height,
        display: "flex",
        alignItems:"flex-start",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
    },
    smz_background:
    {
        width:"90%",
        height: "65%",
        borderRadius: 30,
        backgroundColor: "#333333",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    message_text:
    {
        fontSize: 16,
        marginLeft: 20,
        marginRight: 10,
        color: "#AAAAAA",
        marginTop: 5,
        marginBottom: 5,
        fontFamily: "SF-Pro-Rounded-SemiBold",
        flex: 5.5
    },
    send_button:
    {
        width: 45, 
        height: 45, 
        borderRadius: 30, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        marginRight:20,
        flex: 1
    }
});

export default personal_chat_style
