import { Dimensions, StyleSheet  } from "react-native";

const {width, height} = Dimensions.get("window");

const error_delete_modal_styles = StyleSheet.create({
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
        height: 0.25 * height,
        display: "flex",
        justifyContent: 'space-evenly',
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
    }
});

export default error_delete_modal_styles