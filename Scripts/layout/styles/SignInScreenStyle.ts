import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const signinstyles = StyleSheet.create({
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
    widgetzone :{
        display: "flex",
        alignContent:"flex-end",
        justifyContent:"flex-end",
        // backgroundColor: "#b6bf30",
        alignItems:"center",
        width: width,
        height: height * 0.57
    },
    titlezone: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width: width,
        height: height * 0.08,
        flexDirection: "row",
    },
    locketlogo:
    {
        width: "10%",
        height: "50%",
        resizeMode: 'cover',
        marginLeft: 5,
        marginRight: 5
    },
    locket_title:{
        color: "#FEFEFE",
        fontSize: 35,
        marginLeft: 5,
        marginRight: 5,
        fontFamily: "SF-Pro-Rounded-Bold"
    },
    locketdescriptzone:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        alignContent: "center",
        width: width,
        height: height * 0.1,
        
    },
    locketdescript:
    {
        marginRight: "10%",
        marginLeft: "10%",
        textAlign: 'center',
        color:"#BEBDBB",
        fontSize: 27,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    buttonzone:{
        display:"flex",
        alignContent:"center",
        justifyContent:"center",
        alignItems: "center",
        width: width,
        height: height * 0.25,
        // backgroundColor: "#b6bf30",
    },
    widget:{
        width: "65%",
        height: "88%",
        resizeMode: 'cover'
    },
    signin:
    {
        marginRight: "10%",
        marginLeft: "10%",
        textAlign: 'center',
        color:"#CCCCCC",
        fontSize: 22,
        fontFamily: "SF-Pro-Rounded-Bold"
    },
    registerbutton:{
        backgroundColor: '#F1B202',
        borderRadius: 30, 
        width: '58%', 
        height: "27%",
        display: "flex",
        justifyContent:"center",
    },
    registertext:{
        textAlign: 'center',
        color:"#301C03",
        fontSize: 22,
        fontFamily: "SF-Pro-Rounded-Bold"
    }
}
);

export default signinstyles;