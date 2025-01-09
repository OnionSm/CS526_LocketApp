import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect , createContext, useContext, useCallback} from 'react';
import AxiosInstance from './instance/AxiosInstance';


export default function ReportModal({ modalRef, onClose }: { modalRef: any, onClose: () => void }) {

    const [email, setEmail] = useState('');
    const [Description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // Regex kiểm tra định dạng email
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };   

    // Kiểm tra định dạng form
    const isFormValid = isValidEmail(email) && Description.trim() !== '';

    // Hàm gửi báo cáo sự cố
    const sendIncidentReport = async () => {
        setLoading(true);
    
        const formData = new FormData();
        formData.append('UserEmail', email); 
        formData.append('Description', Description); 
        formData.append('TypeFeedback', "Report"); 
    
    
        try {
            const response = await AxiosInstance.post("api/feedback", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Nếu HTTP status không phải 200, báo lỗi
            if (response.status !== 200) { 
                const errorMessage = response.data;
                throw new Error(`Failed to send report: ${errorMessage}`);
                setDescription('');
                setEmail('');
            }
    
            const result = response.data;
            Alert.alert('Thành công', `Báo cáo sự cố của bạn đã được gửi.`);
            setDescription('');
            setEmail('');
            onClose();
        } catch (error) {
            const err = error as Error;
            Alert.alert('Lỗi', err.message || 'Không thể gửi báo cáo.');
            setDescription('');
            setEmail('');
        } finally {
            setLoading(false); 
            setDescription('');
            setEmail('');
        }
    };



    return (
    
    /* Màn hình dạng Modal */
    <BottomSheetModal
        ref={modalRef}
        snapPoints={['100%']}
        backgroundStyle={{ backgroundColor: '#1F1F1F' }}
        handleStyle={{ height: 10 }}
        containerStyle={{
            zIndex: 16,
        }}
        handleIndicatorStyle={[{ backgroundColor: '#505050', width: 45, height: 5 }]}>

        <BottomSheetView style={styles.container}>
        {/* Tiêu đề */}
        <Text style={styles.header}>Báo cáo sự cố</Text>

        {/* Nhập email */}
        <TextInput
            style={styles.input}
            placeholder="Địa chỉ email của bạn"
            placeholderTextColor="#AAAAAA"
            keyboardType="email-address"
            onChangeText={setEmail}
        />

        {/* Nhập nội dung đề xuất */}
        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Hãy cho chúng tôi biết điều gì đang xảy ra ..."
            placeholderTextColor="#AAAAAA"
            multiline
            numberOfLines={4}
            onChangeText={setDescription}
        />

        {/* Nút gửi */}
        <TouchableOpacity
        style={[styles.button, isFormValid && {backgroundColor: '#F1B202'}, loading && { backgroundColor: '#aaa' }]}
        onPress={sendIncidentReport}
        disabled={!isFormValid} // Vô hiệu hóa button khi form không hợp lệ
        >
            <Text style = {[isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>
                {loading ? 'Đang gửi...' : 'Gửi'}
            </Text>
        </TouchableOpacity>

        </BottomSheetView>
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F', 
    },
    header: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FFFFFF', 
        textAlign: 'center',
        marginVertical: 20,
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
        marginHorizontal: 20,
        height: 60,
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
