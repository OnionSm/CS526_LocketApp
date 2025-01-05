import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const backgroundcolor = "#242424";
const main_screen_styles = StyleSheet.create({
    main_view:{
        justifyContent: 'flex-end',
        opacity: 1,
        backgroundColor: "#050505",
        width : width,
        height: height,
        display: 'flex',
        flexDirection: "column",

    },
    upper_zone:
    {
        width: width,
        height: height * 0.15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    },
    button:
    {
        width: 50, 
        height: 50, 
        borderRadius: 30, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    addfriend_button:
    {
        width: 150, 
        height: 50, 
        borderRadius: 30, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: "row"
    },
    add_friend_text:
    {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "SF-Pro-Rounded-Bold",
        marginLeft: 5,
    },
    image_zone:
    {
        width: width,
        height: height * 0.47,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#171717",
        borderRadius: 50
    },
    button_zone:
    {
        width: width,
        height: height * 0.20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center"
    },
    centre_button:
    {
        width: 50, 
        height: 50, 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
    },
    capture_image_button:
    {
        width: 85,
        height: 85
    },
    history_zone:
    {
        width: width,
        height: height * 0.2,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent:"center"
    },
    history_zone_2:
    {
        width: width,
        height: height * 0.2,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent:"center",
    },
    history_child_zone:
    {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent:"center"
    },
    history_icon_background:
    {
        width: 35, 
        height: 35, 
        borderRadius: 10, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    history_text:
    {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Bold",
        marginLeft: 5,
    },
    mini_avatar_border:
    {
        width: 48,
        height: 48,
        borderRadius: 90,
        borderWidth: 3,
        borderColor: "#F1B202",
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
    },
    mini_avatar_border_2:
    {
        width: 48,
        height: 48,
        borderRadius: 90,
        borderWidth: 3,
        borderColor: "#2D2D2D",
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        marginLeft: 10,
        marginRight: 10
    },
    mini_main_avt:
    {
        width: "95%",
        height: "95%",
        resizeMode: "contain",
        borderWidth: 1,
        borderRadius: 90,
    },
    main_avt:
    {
        width: "90%",
        height: "90%",
        resizeMode: "contain",
        borderWidth: 3,
        borderRadius: 90,
    }
    
});



export default main_screen_styles