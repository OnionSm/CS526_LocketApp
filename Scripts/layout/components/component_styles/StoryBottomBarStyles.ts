import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

const story_bottom_bar_styles = StyleSheet.create({
    container_bar_zone:
    {
        display: "flex",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    main_zone:
    {
        width: width,
        height: height * 0.17,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#000000"
    },
    section1:
    {
        width: "95%",
        height: "40%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        backgroundColor: "#333333",
        borderRadius: 30
    },
    section2:
    {
        width: "95%",
        height: "60%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around"
    },
    centre_button:
    {
        width: 50, 
        height: 50, 
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center',
    },
    capture_image_button:
    {
        width: 65,
        height: 65
    },
    icon_zone:
    {
        display: "flex",
        flexDirection: "row"
    }
});

export default story_bottom_bar_styles