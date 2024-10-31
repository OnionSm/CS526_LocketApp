import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const backgroundcolor = "#242424";
const main_screen_styles = StyleSheet.create({
    main_view:{
        justifyContent: 'center',
        opacity: 1,
        backgroundColor: "#050505",
        width : width,
        height: height
    },
    upper_zone:
    {
        width: width,
        height: height * 0.15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    },
    userbutton:
    {
        width: 50, 
        height: 50, 
        borderRadius: 30, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    image_zone:
    {
        width: width,
        height: height * 0.47,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#171717",
        borderRadius: 50
    },
    button_zone:
    {
        width: width,
        height: height * 0.25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center"
    },
    history_zone:
    {
        width: width,
        height: height * 0.15,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    }
});

export default main_screen_styles