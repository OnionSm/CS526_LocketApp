import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const backgroundcolor = "#242424";
const general_user_profile_styles = StyleSheet.create({
    main_view:{
        justifyContent: 'center',
        opacity: 1,
        backgroundColor: "#050505",
        width : width,
        height: height
    },
    main_view_2:
    {
        justifyContent: 'center',
        opacity: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: backgroundcolor,
        width : width,
        height: height,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    upper_zone:
    {
        width: width,
        height: height * 0.05,
        backgroundColor: backgroundcolor
    },
    upper_line:{
        width: 0.1 * width,
        height: 10,
        backgroundColor: backgroundcolor
    }
});

export default general_user_profile_styles