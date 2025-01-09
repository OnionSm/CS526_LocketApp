import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const signinstyles = StyleSheet.create({
    main_view:{
        justifyContent: 'center',
        opacity: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#121212",
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
        height: height * 0.6
    },
    locketdescriptzone:{
        marginTop: 0.02*height,
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
        fontSize: 25,
        fontFamily: "SF-Pro-Rounded-Semibold"
    },
    buttonzone:{
        display:"flex",
        alignContent:"center",
        justifyContent:"center",
        alignItems: "center",
        width: width,
        height: height * 0.25,
    },
    widget:{
        width: "68%",
        height: "88%",
        resizeMode: 'cover'
    },
    signin:
    {
        marginRight: "10%",
        marginLeft: "10%",
        textAlign: 'center',
        color:"#CCCCCC",
        fontSize: 21,
        fontFamily: "SF-Pro-Rounded-Bold"
    },
    registerbutton:{
        marginBottom: 0.01*height,
        backgroundColor: '#F1B202',
        borderRadius: 30, 
        width: '55%', 
        height: "27%",
        display: "flex",
        justifyContent:"center",
    },
    registertext:{
        textAlign: 'center',
        color:"#301C03",
        fontSize: 21,
        fontFamily: "SF-Pro-Rounded-Bold"
    }
}
);

export default signinstyles;