import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const your_message_background = "#CFCFCF";
const your_message_color = "#000000"
const friend_message_background = "#333333";
const friend_message_color = "#FFFFFF";

const message_item_styles = StyleSheet.create(
{
    message_view: 
    {
        width: width,
        minHeight: 0.06*height,
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "#050505"
    },
    message_zone:
    {
        width: width,
        height: 0.06*height,
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#000000",
        
    },
    message_background_friend:
    {
        maxWidth: "65%",
        height: 0.05* height,
        backgroundColor: friend_message_background,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignSelf: "flex-end"
    },
    message_text:
    {
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
        color: "#FFFFFF",
        marginBottom: 5,
        fontFamily: "SF-Pro-Rounded-SemiBold",
    },
    avatar:
    {
        width: 35,
        height: 35,
        resizeMode: "contain",
        borderWidth: 3,
        borderRadius: 90,
        alignSelf: "center",
        marginTop: 5, 
        marginLeft: 5, 
        marginRight: 5
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
    message_background_user:
    {
        maxWidth: "65%",
        height: 0.05* height,
        backgroundColor: your_message_background,
        borderRadius: 30,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
    },


})

export default message_item_styles

