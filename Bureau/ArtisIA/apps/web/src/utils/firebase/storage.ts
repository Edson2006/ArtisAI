import { storage } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadLogo = async (userId: string, file: File): Promise<string> => {
  try {
    // Create a reference to 'companies/{userId}/logo.png'
    // We use a fixed name to overwrite previous logos automatically
    const fileExtension = file.name.split('.').pop();
    const storageRef = ref(storage, `companies/${userId}/logo.${fileExtension}`);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading logo:", error);
    throw error;
  }
};
