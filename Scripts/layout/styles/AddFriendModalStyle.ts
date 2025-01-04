import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const add_friend_modal_styles = StyleSheet.create({
    contentContainer: 
    {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 45,
        borderTopRightRadius:45,
        backgroundColor: "#242424",
    },
    main_view:
    {
        display: "flex",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#050505",
        width : width,
        height: height,
        flexDirection: "column",
    },
    header_text:
    {
        color: "#FFFFFF",
        fontFamily: "SF-Pro-Rounded-Semibold",
        fontSize: 24,
        textAlign: "center",
        marginTop: "8%"
    },
    header_text_2:
    {
        color: "#FFFFFF",
        fontFamily: "SF-Pro-Rounded-Semibold",
        fontSize: 20,
        textAlign: "center",
    },
    main_view_1:
    {
        justifyContent: 'center',
        opacity: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#050505",
        width : width,
        height: height
    },
    // -------------------------------------------------------------------
    find_zone:
    {
        width: width ,
        height: height* 0.22,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    find_zone_title:
    {
        // margin: "3%",
        textAlign: 'center',
        color:"#E7E7E7",
        fontSize: 25,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    search_bar:
    {
        width: "90%",
        height: "30%",
        backgroundColor: "#202020",
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    search_bar_text:
    {
        textAlign: 'center',
        color:"#E7E7E7",
        fontSize: 18,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    find_zone_amout_friend:
    {
        // margin: "3%",
        textAlign: 'center',
        color:"#AAAAAA",
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },

    // -------------------------------------------------------------------
    find_in_other_app_zone:
    {
        width: width ,
        height: height* 0.22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    list_other_app_zone:
    {
        width: "90%",
        height: "65%",
        backgroundColor: "#202020" ,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    list_other_app_item:
    {
        flexBasis : "20%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    other_app_button_text:
    {
        color:"#AAAAAA",
        fontSize: 12,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },

    // -------------------------------------------------------------------
    other_app_invitation_zone:
    {
        width: width ,
        height: height* 0.36,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    medium_button:
    {
        height: "27%",
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 1,
        display: "flex",
        justifyContent: "space-evenly",        
    },
    text_option_zone:
    {
        marginRight: width*0.05,
        flexDirection: "row",
        alignItems: "center"
    },

    // -------------------------------------------------------------------
    buttonzone:
    {
        width: width,
        height: height * 0.2,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent:"center"
    },
    continuebutton:{
        backgroundColor: '#F1B202',
        borderRadius: 30, 
        width: '85%', 
        height: "27%",
        display: "flex",
        justifyContent:"center",
    },
    continuetext:
    {
        textAlign: 'center',
        color:"#505050",
        fontSize: 22,
        fontFamily: "SF-Pro-Rounded-Bold"
    },
    main_avt:
    {
        width: "95%",
        height: "95%",
        resizeMode: "contain",
        borderWidth: 3,
        borderRadius: 90,
    },
    mini_avatar_border:
    {
        width: 55,
        height: 55,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: "#F1B202",
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        marginLeft: 5,
        marginRight: 5,
    },

    
});

export default add_friend_modal_styles