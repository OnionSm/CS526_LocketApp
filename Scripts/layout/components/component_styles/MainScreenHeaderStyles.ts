import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

const main_screen_header_styles = StyleSheet.create({
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
    add_friend_text:
    {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "SF-Pro-Rounded-Bold",
        marginLeft: 5,
    },
    button:
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
    addfriend_button:
    {
        width: 150, 
        height: 50, 
        borderRadius: 30, 
        backgroundColor: '#212121', 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: "row"
    },
});

export default main_screen_header_styles
