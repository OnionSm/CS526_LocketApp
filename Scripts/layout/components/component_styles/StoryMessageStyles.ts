import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");


const story_message_styles = StyleSheet.create({
    main_zone:
    {
        display: "flex",
        position: "relative",
        width: width * 0.92,
        height: width * 0.92,
        backgroundColor: "#171717",
        borderRadius: 50,
        alignItems: "center",
        marginBottom: "20%",
        alignSelf: "center"
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
    uploader_background:
    {
        display: "flex",
        flexDirection: "row",
        position: 'absolute',
        top: 25, 
        left: 25, 
        maxHeight: 38,
        maxWidth: "50%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15
    },
    story_owner_avt:
    {
        width: 30,
        height: 30,
        borderRadius: 50,
        resizeMode: "cover",
        margin: 5
    },
    uploader_name:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        fontSize: 15,
        color: "#FFFFFF",
        marginHorizontal: 5,
        alignSelf: "center"
    },
    upload_time_background:
    {
        display: "flex",
        flexDirection: "row",
        position: 'absolute',
        top: 25, 
        right: 25, 
        height: 38,
        maxWidth: "50%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15
    },
    upload_time:
    {
        fontFamily: "SF-Pro-Rounded-Bold",
        fontSize: 15,
        color: "#FFFFFF",
        marginHorizontal: 5
    },
});

export default story_message_styles