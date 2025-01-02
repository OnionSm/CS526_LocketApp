import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");


const story_item_styles = StyleSheet.create({
    container_zone: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1
    },
    main_zone:
    {
        display: "flex",
        position: "relative",
        width: width,
        height: "47%",
        backgroundColor: "#000000",
        borderRadius: 50,
        alignItems: "center"
    }, 
    image:
    {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        resizeMode: "cover"
    },
    caption_background:
    {
        maxHeight: 38,
        maxWidth: "95%",
        transform: [{ translateY: -55 }],
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15
    },
    caption:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        fontSize: 18,
        color: "#FFFFFF",
        marginHorizontal: 5
    },
    upload_info:
    {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 38,
        maxWidth: "70%"
    },
    story_owner_avt:
    {
        width: 30,
        height: 30,
        borderRadius: 50,
        resizeMode: "cover",
        marginHorizontal: 5
    },
    uploader_name:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        fontSize: 18,
        color: "#FFFFFF",
        marginHorizontal: 5
    },
    upload_time:
    {
        fontFamily: "SF-Pro-Rounded-SemiBold",
        fontSize: 18,
        color: "#FFFFFF",
        marginHorizontal: 5
    },
});

export default story_item_styles