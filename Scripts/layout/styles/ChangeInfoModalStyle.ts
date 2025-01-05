import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const change_info_style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F', 
    },
    header: {
        marginTop: 0.2*height,
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FFFFFF', 
        textAlign: 'center',
        marginBottom: 0.03*height,
    },
    input: {
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        marginHorizontal: 0.05*width,
        height: 60,
        width: 0.9*width,
    },
    textArea: {
        height: 150, 
        textAlignVertical: 'top',
    },
    button: {
        position: 'absolute',
        bottom: 20, // Đặt nút cách đáy màn hình 20px
        left: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F2F2F',
        borderRadius: 25,
        paddingVertical: 20,
        marginTop: 20,
    },
    buttonTextActive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#242424',
    },
    buttonTextInactive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#999999',
    },
});

export default change_info_style