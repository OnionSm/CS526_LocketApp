import { Dimensions, StyleSheet  } from "react-native";

const {width, height} = Dimensions.get("window");

const avatar_bottom_sheet_styles = StyleSheet.create({
    main_view:
    {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        flex: 1,
        display: "flex",
        justifyContent: 'flex-end',
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
    },
    content_view:
    {
        backgroundColor: '#242424',
        width: width,
        height: 0.35 * height,
        display: "flex",
        justifyContent: 'space-evenly',
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    }
});

export default avatar_bottom_sheet_styles