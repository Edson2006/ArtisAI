import { db } from "./config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export interface CompanyData {
  userId: string;
  name: string;
  siret: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  legalForm: string;
  tvaNumber?: string;
  logoUrl?: string;
  primaryColor?: string;
  updatedAt: string;
}

export const getCompanyProfile = async (userId: string): Promise<CompanyData | null> => {
  try {
    const docRef = doc(db, "companies", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as CompanyData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting company profile:", error);
    throw error;
  }
};

export const updateCompanyProfile = async (userId: string, data: Partial<CompanyData>) => {
  try {
    const docRef = doc(db, "companies", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await setDoc(docRef, {
        ...data,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error updating company profile:", error);
    throw error;
  }
};
