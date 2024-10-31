import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const sign_in_with_email_styles = StyleSheet.create({
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

    getphonezone:
    {
        width: width,
        height: height * 0.6,
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent:'center',
        flexDirection: "column",
        
    },
    getphonezonetitle:
    {
        margin: "3%",
        textAlign: 'center',
        color:"#E7E7E7",
        fontSize: 27,
        fontFamily: "SF-Pro-Rounded-Semibold"
        
    },
    inputzone:
    {
        height: 55, 
        width: '85%', 
        borderRadius: 18, 
        backgroundColor: "#1F1B1A",
        display: "flex",
        alignItems: "center",
        alignContent:"center",
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    inputzoneicon:
    {
        width: "50%",
        height: "50%",
        marginLeft: 20,
        marginRight: 15
    },
    inputzonetext:
    { 
        color:"#949494",
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Semibold",
    },
    useemailbutton:
    {
        margin: "5%",
        backgroundColor: '#1F1B1A',
        borderRadius: 30, 
        width: '45%', 
        height: "8%",
        display: "flex",
        justifyContent:"center",
    },
    useemailtext:
    {
        textAlign: 'center',
        color:"#E7E7E7",
        fontSize: 18,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    guidelinezone:
    {
        width: width,
        height: height * 0.1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-end"
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

export default sign_in_with_email_styles