import { db } from "./config";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  increment 
} from "firebase/firestore";
import { Client } from "@/types/client";

const COLLECTION_NAME = "clients";

export const getUserClients = async (userId: string): Promise<Client[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Client));
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const saveOrUpdateClient = async (userId: string, clientData: { name: string, email?: string, address?: string }, quoteAmount: number) => {
  try {
    // Check if client already exists by name (simple deduplication)
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
      where("name", "==", clientData.name)
    );
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update existing client
      const clientDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, COLLECTION_NAME, clientDoc.id), {
        ...clientData,
        totalSpent: increment(quoteAmount),
        quotesCount: increment(1),
        updatedAt: new Date().toISOString(),
      });
      return clientDoc.id;
    } else {
      // Create new client
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        userId,
        ...clientData,
        totalSpent: quoteAmount,
        quotesCount: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving client:", error);
    // Don't throw, we don't want to block quote creation if client save fails
    return null;
  }
};
