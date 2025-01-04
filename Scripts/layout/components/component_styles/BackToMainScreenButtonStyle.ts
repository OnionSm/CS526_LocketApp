import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const back_to_main_screen_button_styles = StyleSheet.create({
    container:
    {
        width: 90,
        height: 90,
        display: "flex",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        top: height* 0.1,
        left: width * 0.5 - 35 / 2,
        zIndex: 10
 
    },
});

export default back_to_main_screen_button_styles