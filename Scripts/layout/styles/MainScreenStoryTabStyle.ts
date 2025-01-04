import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const main_screen_story_tab_styles = StyleSheet.create({
    main_view:
    {
        display: "flex",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
        width : width,
        height: height
    }
});

export default main_screen_story_tab_styles