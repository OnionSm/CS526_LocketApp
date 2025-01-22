import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");


const conversation_item_styles = StyleSheet.create({
    conversation_item_background:
    {
        width: width,
        height: height * 0.09,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#050505"
    },
    main_zone:
    {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 20
    },
    avatar_border:
    {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#F1B202",
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
    },
    mini_avatar_border:
    {
        width: 45,
        height: 45,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: "#F1B202",
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        marginLeft: 5,
        marginRight: 5
    },
    main_avt:
    {
        width: 30,
        height: 30,
        resizeMode: "contain",
        borderWidth: 3,
        borderRadius: 90,
    },
    name_and_time:
    {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 5
    },
    name:
    {
        color: "#FFFFFF",
        fontFamily: "SF-Pro-Rounded-Bold",
        fontSize: 16,
        marginHorizontal: 10
    },
    time:
    {
        color: "#888888",
        fontFamily: "SF-Pro-Rounded-Bold",
        fontSize: 15,
        marginHorizontal: 5
    },
    message:
    {
        color: "#FFFFFF",
        fontFamily: "SF-Pro-Rounded-SemiBold",
        fontSize: 15,
        marginHorizontal: 15
    },
});

export default conversation_item_styles