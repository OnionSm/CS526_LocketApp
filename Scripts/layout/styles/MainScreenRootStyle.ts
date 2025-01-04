import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const main_screen_root_styles = StyleSheet.create({
    main_view:
    {
        display: "flex",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
    }
});

export default main_screen_root_styles