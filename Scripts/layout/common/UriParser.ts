import RNFS from "react-native-fs";
export class UriParser
{
    static base64ToBinary = (base64String : string) => {
      const binaryString = atob(base64String); 
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
    
      for (let i = 0; i < len; i++) 
      {
        bytes[i] = binaryString.charCodeAt(i);
      }
    
      return bytes; 
    };
    
    static binaryToBase64 = (binaryData: any) => {
      let binaryString = "";
    
      for (let i = 0; i < binaryData.length; i++) {
        binaryString += String.fromCharCode(binaryData[i]); 
      }
    
      return btoa(binaryString); 
    };
    
    static uriToBase64 = async (uri: string) => {
      try 
      {
        const base64String = await RNFS.readFile(uri, "base64");
        console.log("Base64 String:", base64String);
        return base64String;
      } catch (error) {
        console.error("Error converting URI to Base64:", error);
        throw error;
      }
    };
    
    static uriToBinary = async (uri: string) => {
      try {
        // Đọc tệp từ đường dẫn URI dưới dạng binary
        const binaryString = await RNFS.readFile(uri, 'ascii');
        const binaryArray = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
        return binaryArray; // Trả về mảng byte nhị phân
      } catch (error) {
        console.error('Lỗi khi chuyển đổi URI thành nhị phân:', error);
        throw error;
      }
    };
}
