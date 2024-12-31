import { Dimensions, StyleSheet  } from "react-native";

const {width, height} = Dimensions.get("window");

const delete_user_account_styles = StyleSheet.create({
    main_view:
    {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
    },
    content_view:
    {
        backgroundColor: '#FFFFFF',
        width: 0.85 * width,
        height: 0.45 * height,
        display: "flex",
        justifyContent: 'space-evenly',
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
    }
});

export default delete_user_account_styles