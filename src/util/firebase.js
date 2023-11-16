import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAejgARqfSSQqvPGkJCqcQlr90E_Oh1OBI",
  authDomain: "suggestify1.firebaseapp.com",
  projectId: "suggestify1",
  storageBucket: "suggestify1.appspot.com",
  messagingSenderId: "49268818521",
  appId: "1:49268818521:web:44c5a0c6c4e3cd0ab72748",
  measurementId: "G-Y70LFLF94J",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGoogleRedirect = async () =>
  await signInWithRedirect(auth, googleProvider);

export const getGoogleRedirectResult = async () =>
  await getRedirectResult(auth);

export const signOutUser = () => signOut(auth);

export const isAuthenticated = () => auth.currentUser;

export const onAuthStateChangedListener = (callBack) =>
  onAuthStateChanged(auth, callBack);

//firestore
export const db = getFirestore();

// firestore--feedback //

//create
export const createSuggestionBox = async (name, timestamp, feedbackBoxId) => {
  const feedbackBoxCollection = doc(db, "feedbackBox", feedbackBoxId);
  await setDoc(feedbackBoxCollection, {
    name,
    timestamp,
  });
};

export const addFeedback = async (boxId, feedback) => {
  const feedbacksDoc = doc(db, "feedbackBox", boxId);
  // Now, you can add the feedback to the document.
  const feedbackCollection = collection(feedbacksDoc, "feedback"); // Assuming "feedback" is the subcollection name.
  return await addDoc(feedbackCollection, {
    feedback,
    isMarked: false,
    isRead: false,
    dateTime: Date.now(),
  });
};

// get data
export const getFeedbackCollection = async (boxId) => {
  const feedbacksDoc = collection(db, "feedbackBox", boxId, "feedback");

  try {
    const querySnapshot = await getDocs(feedbacksDoc);
    const feedbackCollection = [];
    querySnapshot.forEach((doc) => {
      feedbackCollection.push({ id: doc.id, ...doc.data() });
    });
    // console.log(feedbackCollection);
    return feedbackCollection;
  } catch (error) {
    console.error("Error retrieving feedback collection:", error);
  }
};

export const getUnreadFeedbackNumber = async (boxId) => {
  const feedbacksDoc = collection(db, "feedbackBox", boxId, "feedback");
  const unreadFeedbacksQuery = query(
    feedbacksDoc,
    where("isRead", "==", false)
  );

  try {
    const querySnapshot = await getDocs(unreadFeedbacksQuery);
    const unreadFeedbackNumber = querySnapshot.size;
    return unreadFeedbackNumber;
  } catch (error) {
    console.error("Error retrieving feedback collection:", error);
  }
};

export const getFeedbackBoxName = async (feedbackId) => {
  const feedbacksDoc = doc(db, "feedbackBox", feedbackId);
  const userSnapshot = await getDoc(feedbacksDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data().name;
  }
};

// delete
export const deleteFeedbackCollection = async (boxId, userId) => {
  const feedbackBoxDocRef = doc(db, "feedbackBox", boxId);
  const feedbackInUserRef = doc(db, "users", userId, "feedbacks", boxId);

  try {
    // Delete the document.
    await Promise.all([
      deleteDoc(feedbackBoxDocRef),
      deleteDoc(feedbackInUserRef),
    ]);
    console.log("Document with boxId:", boxId, "deleted.");
  } catch (error) {
    // Handle any potential errors.
    console.error("Error deleting document:", error);
  }
};

// update
export const updateMarkFeedback = async (boxId, feedbackId, MarkBoolean) => {
  const feedbackRef = doc(db, "feedbackBox", boxId, "feedback", feedbackId);
  await updateDoc(feedbackRef, {
    isMarked: MarkBoolean,
  });
};

export const updateReadStatusFeedback = async (boxId) => {
  const unreadFeedbackRef = collection(db, "feedbackBox", boxId, "feedback");
  const unreadFeedbacksQuery = query(
    unreadFeedbackRef,
    where("isRead", "==", false)
  );

  const querySnapshot = await getDocs(unreadFeedbacksQuery);
  querySnapshot.forEach((document) => {
    const unreadFeedbackDoc = doc(unreadFeedbackRef, document.id);
    updateDoc(unreadFeedbackDoc, {
      isRead: true,
    });
  });
};

// firestore--feedback //

// firestore--user //

export const createUserDocumentFormAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const { displayName, email } = userAuth;
  if (!userSnapshot.exists()) {
    const createAt = new Date();

    try {
      return await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      alert(error.message);
      return error.message;
    }
  }
};

export const addFeedbackBox = async (userId, name) => {
  const feedbackRef = doc(db, "users", userId);
  const feedbackCollection = collection(feedbackRef, "feedbacks");
  return await addDoc(feedbackCollection, { name });
};

export const getAllFeedbacks = async (userId) => {
  const feedbackRef = doc(db, "users", userId);
  const feedbackCollection = collection(feedbackRef, "feedbacks");

  try {
    const querySnapshot = await getDocs(feedbackCollection);

    const feedbackList = [];
    const feedbackPromises = querySnapshot.docs.map(async (doc) => {
      const unreadFeedbackNumber = await getUnreadFeedbackNumber(doc.id);
      return { id: doc.id, ...doc.data(), unreadFeedbackNumber };
    });

    // Wait for all promises to resolve
    const feedbackResults = await Promise.all(feedbackPromises);
    return feedbackResults;
  } catch (error) {
    // Handle any potential errors.
    console.error("Error retrieving feedback documents:", error);
  }
};
// firestore--user //
