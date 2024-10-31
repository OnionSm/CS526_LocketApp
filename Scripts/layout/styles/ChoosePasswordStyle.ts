import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const change_password_styles = StyleSheet.create({
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

    backzone: {
        display: "flex",
        width: width,
        height: height * 0.1,
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
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

    getpasswordzone:
    {
        width: width,
        height: height * 0.7,
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent:'center',
        flexDirection: "column",
        
    },
    getpasswordzonetitle:
    {
        margin: "3%",
        textAlign: 'center',
        color:"#E7E7E7",
        fontSize: 27,
        fontFamily: "SF-Pro-Rounded-Semibold"
        
    },
    inputzone:
    {
        height: 58, 
        width: '85%', 
        borderRadius: 18, 
        backgroundColor: "#1F1B1A",
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    inputzonetext:
    { 
        color:"#949494",
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Semibold",
        marginLeft:20,
    },
    passwordguide:{
        marginTop: "3%",
        marginRight: "10%",
        marginLeft: "10%",
        textAlign: 'center',
        color:"#BEBDBB",
        fontSize: 15,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    guidelinetext:{
        marginRight: "10%",
        marginLeft: "10%",
        textAlign: 'center',
        color:"#BEBDBB",
        fontSize: 15,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
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

export default change_password_styles