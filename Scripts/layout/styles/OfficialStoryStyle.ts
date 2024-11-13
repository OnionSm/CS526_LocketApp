import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const official_story_style = StyleSheet.create({
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
    main_zone:
    {
        width: width,
        height: height * 0.8,
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent:'center',
        flexDirection: "column",
        
    },
    main_title:
    {
        margin: "3%",
        textAlign: 'center',
        color:"#E7E7E7",
        fontSize: 30,
        fontFamily: "SF-Pro-Rounded-Semibold"
        
    },
    share_button_zone:
    {
        height: 48, 
        width: '70%', 
        borderRadius: 30, 
        backgroundColor: "#1F1B1A",
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop:6,
        marginBottom: 6
    },
    share_icon:
    {
        marginLeft: 15,
        flex: 1,
    },
    share_zone_text:
    { 
        flex:7,
        color:"#FFFFFF",
        fontSize: 19,
        fontFamily: "SF-Pro-Rounded-Semibold",
        marginLeft:20,
    },
    user_id_zone:
    {
        width: "60%",
        height: "10%",
        backgroundColor: "#3A3A3A",
        borderRadius: 20,
        borderColor: "#525252",
        borderWidth: 4,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    user_id_text:
    {
        textAlign:"center",
        color: "#F1B202",
        fontSize: 25,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    // ----------------------------------------------------
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
    }
});

export default official_story_style