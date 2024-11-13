import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const message_screen_style = StyleSheet.create({
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
    title_zone:
    {
        width: width,
        height: height*0.09,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
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
    message_zone:
    {
        width: width,
        height: 0.9* height,
    },
    message_item:
    {
        width: width,
        height: height*0.09,
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    avatar_zone:
    {
        width: "20%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "flex-end"
    },
    avatar:
    {
        width: 45,
        height: 45,
        borderRadius: 50
    },
    story_border:
    {
        width: 55,
        height: 55,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: "#F1B202",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    invisible_zone:
    {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    message_item_zone:
    {
        width: "70%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    forward_button:
    {
        width: "10%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }

});

export default message_screen_style
