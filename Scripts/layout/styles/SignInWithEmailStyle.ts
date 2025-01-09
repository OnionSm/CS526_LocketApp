import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const sign_in_with_email_styles = StyleSheet.create({
    main_view:{
        flex:1,
        backgroundColor: "#121212",
    },
    backbutton:
    {
        width: 40, 
        height: 40, 
        borderRadius: 40, 
        backgroundColor: '#3d3d3d',
        marginVertical: 0.04*height,
        marginHorizontal: 0.05*width,
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center',
    },
    getphonezonetitle:
    {
        marginTop: 0.16*height,
        marginLeft: 0.07*width,
        color:"#ffffff",
        fontSize: 25,
        fontFamily: "SF-Pro-Rounded-Bold"
        
    },
    input: {
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 0.07*width,
        height: 60,
    },
    textArea: {
        height: 150, 
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
    textView:{
        marginTop: 0.35*height,
    },
    text: {
        fontSize: 13.5,
        fontWeight: '400',
        color: '#c4c0c0', 
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 20, // Đặt nút cách đáy màn hình 20px
        left: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F2F2F',
        borderRadius: 25,
        paddingVertical: 20,
        marginTop: 20,
    },
    buttonTextActive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#242424',
    },
    buttonTextInactive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#999999',
    },
});

export default sign_in_with_email_styles