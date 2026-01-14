import { db } from "./config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from "firebase/firestore";
import { UserSettings, defaultSettings } from "@/types/settings";

const COLLECTION_NAME = "settings";

export const getUserSettings = async (userId: string): Promise<UserSettings> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserSettings;
    } else {
      // Return defaults if no settings exist yet
      return {
        userId,
        ...defaultSettings,
        updatedAt: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    // Fallback to defaults on error to not break UI
    return {
      userId,
      ...defaultSettings,
      updatedAt: new Date().toISOString()
    };
  }
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    // Use setDoc with merge: true to handle both create and update
    await setDoc(docRef, {
      ...settings,
      userId,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};
