import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const backgroundcolor = "#242424";
const text_color = "#FFFFFF";
const text_color2 = "#AAAAAA";
const button_background_color = "#3A3A3A";

const general_user_profile_styles = StyleSheet.create({
    main_view:
    {
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
        borderTopRightRadius: 45,
    },
    general_text:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        color: text_color,
        fontSize: 16,
        textAlign: "center"
    },
    general_text2:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        color: text_color2,
        fontSize: 16,
        textAlign: "center"
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
        height: "17%",
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
        backgroundColor: button_background_color,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: 10
        
    },
    userid_text:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        color: text_color2,
        fontSize: 17,
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
    user_locket_share_zone:
    {
        width: width ,
        height: height* 0.09,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "row"

    },
    locket_share_background:
    {
        width: "90%",
        height: "80%" ,
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: button_background_color,
        borderRadius: 15,
        flexDirection: "row"
    },
    locket_share_background_zone1:
    {
        flex:4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "flex-start",
        flexDirection: "row"
    },
    locket_share_background_zone2:
    {
        flex:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    mini_avatar_zone:
    {
        flex: 1,
        width: "95%",
        height: "95%",
        display: "flex",
        justifyContent: "center",
        alignContent: 'center',
        alignItems: "center",
        flexDirection: "column",
    },
    locket_share_text_zone:
    {
        flex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "flex-start",
        flexWrap: "wrap"
    },
    share_button_background:
    {
        width: 38, 
        height: 38, 
        borderRadius: 30, 
        backgroundColor: '#4E4E4E', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
    },
    extension_setting_zone:
    {
        display: "flex",
        backgroundColor: "#384058",
        marginTop: 30,
        
    },
    general_setting_zone:
    {
        display: "flex",
        backgroundColor: "#349500", 
        marginTop: 30
    }
});

export default general_user_profile_styles