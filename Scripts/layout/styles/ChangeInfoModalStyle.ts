import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const change_info_style = StyleSheet.create({
    main_view:{
        justifyContent: 'center',
        opacity: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#242424",
        width : width,
        height: height
    },
    getusernamezone:
    {
        width: width,
        height: height * 0.8,
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent:'center',
        flexDirection: "column",
        
    },
    getusernamezonetitle:
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
        backgroundColor: "#3A3A3A",
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginTop:6,
        marginBottom: 6
    },
    inputzonetext:
    { 
        color:"#949494",
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Semibold",
        marginLeft:20,
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

export default change_info_style