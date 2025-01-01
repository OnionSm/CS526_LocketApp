import RNFS from "react-native-fs";
export class UriParser
{
  static uriToBase64 = async (uri: string) => {
    try {
      // Lấy chuỗi Base64 từ file
      const base64String = await RNFS.readFile(uri, "base64");
  
      // Lấy phần mở rộng từ URI
      const extension = uri.split(".").pop()?.toLowerCase();
  
      // Xác định loại MIME dựa vào phần mở rộng
      let mimeType = "";
      switch (extension) {
        case "jpg":
        case "jpeg":
          mimeType = "image/jpeg";
          break;
        case "png":
          mimeType = "image/png";
          break;
        case "gif":
          mimeType = "image/gif";
          break;
        case "webp":
          mimeType = "image/webp";
          break;
        default:
          mimeType = "application/octet-stream"; // MIME mặc định
          break;
      }
  
      // Thêm tiền tố vào Base64
      return `data:${mimeType};base64,${base64String}`;
    } catch (error) {
      console.error("Error converting URI to Base64:", error);
      throw error;
    }
  };

  static saveBase64Image = async (base64Data: string, user_id: string, file_name: string) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/${user_id}/${file_name}.jpg`;  
  
      const dirPath = `${RNFS.DocumentDirectoryPath}/${user_id}`;
      const exists = await RNFS.exists(dirPath);
      if (!exists) {
        await RNFS.mkdir(dirPath); 
      }
  
      await RNFS.writeFile(path, base64Data, 'base64');
      console.log('Image saved to', path);
  
      return path;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error; 
    }
  };
}
