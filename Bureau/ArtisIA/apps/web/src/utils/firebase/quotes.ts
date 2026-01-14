import { db } from "./config";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { Quote, QuoteStatus } from "@/types/quote";

const COLLECTION_NAME = "quotes";

export const getUserQuotes = async (userId: string): Promise<Quote[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Quote));
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};

export const getQuote = async (quoteId: string): Promise<Quote | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, quoteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Quote;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};

export const createQuote = async (userId: string, quoteData: Omit<Quote, "id" | "userId" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...quoteData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw error;
  }
};

export const updateQuote = async (quoteId: string, quoteData: Partial<Quote>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, quoteId);
    await updateDoc(docRef, {
      ...quoteData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating quote:", error);
    throw error;
  }
};

export const deleteQuote = async (quoteId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, quoteId));
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
};
