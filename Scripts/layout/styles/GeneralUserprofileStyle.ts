import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const backgroundcolor = "#242424";
const text_color = "#FFFFFF";
const general_user_profile_styles = StyleSheet.create({
    main_view:{
        justifyContent: 'center',
        opacity: 1,
        backgroundColor: "#050505",
        width : width,
        height: height
    },
    background: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundcolor, 
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45
    },
    upper_zone:
    {
        width: width,
        height: height * 0.04,
        display: "flex",
        justifyContent:"center",
        alignItems:"center"

    },
    upper_line:
    {
        width: 0.1 * width,
        height: 5,
        borderRadius: 10,
        backgroundColor: "#505050"
    },
    scroll_view:
    {
        width: width,
        height: 0.96* height,
    },
    user_avatar_zone:
    {
        width: width,
        height: height* 0.3,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "column"

    },
    user_avatar_child_zone:
    {
        width: "100%",
        height: "64%",
        display: "flex",
        justifyContent: "flex-end",
        alignContent: 'center',
        alignItems: "center",
        flexDirection: "column",
    },
    avatar_border:
    {
        width: "65%",
        height: "65%",
        resizeMode: "contain",
        margin: 5
    },
    username_zone:
    {
        width: "100%",
        height: "18%",
        display:"flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    username_text:
    {
        fontSize: 25,
        fontFamily: "SF-Pro-Rounded-Bold",
        color: text_color

    },
    userid_zone:
    {
        width: "100%",
        height: "18%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    userid_background:
    {
        width:100,
        height:35,
        borderRadius: 20,
        borderWidth: 2,           
        borderColor: '#525252',   
        backgroundColor: "#3A3A3A",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: 10
        
    },
    userid_text:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        color: "#DEDEDE",
        fontSize: 17,
        textAlign: "center"
    },
    user_setting_background:
    {
        width:120,
        height:35,
        borderRadius: 20,
        backgroundColor: "#3E3E3E",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: 10
    },
    user_setting_text:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        color: text_color,
        fontSize: 17
    },
});

export default general_user_profile_styles