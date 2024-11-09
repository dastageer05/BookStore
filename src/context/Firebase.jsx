import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "bookify-c9934.firebaseapp.com",
  projectId: "bookify-c9934",
  storageBucket: "bookify-c9934.firebasestorage.app",
  messagingSenderId: "106289544895",
  appId: "1:106289544895:web:7a75890b5e6fa9222d100a"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
  
  const signout = (email, password) =>
    firebaseAuth.signOut();

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    // const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    // const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      // imageURL: uploadResult.ref.fullPath,
      imageURL: `${window.location.origin}/images/imagename.jpg`,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  
  const getImageURL = (path) => {
    // return getDownloadURL(ref(storage, path));
    return `${window.location.origin}/images/imagename.jpg`
  };
  
  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };
  
  const placeOrder = async (bookId, bookName, bookPrice, author, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    
    const segments = result._key?.path?.segments[3];
    console.log(segments);
    //User collection
    const userBooksRef = doc(firestore, "UserBooks", user.uid );
    const userBookDocRef = doc(userBooksRef, "orders",  segments);
    console.log("User Book Document Reference:", userBookDocRef.path);

    await setDoc(userBookDocRef, {
      bookId,
     bookName,
     bookPrice,
     author,
     qty: Number(qty)
    }, { merge: true });

    return result;
  };

  const deletePlaceOrder = async (orderId, bookId) => {
   try {
     const orderRef = doc(firestore, "books", bookId, "orders", orderId);
     await deleteDoc(orderRef);
 
     //User collection
     const userOrderRef = doc(firestore, "UserBooks", user.uid, "orders", orderId);
     await deleteDoc(userOrderRef);
     console.log(`Order ${orderId} deleted from UserBooks/${user.uid}/orders.`);
 
     await deleteDoc(userOrderRef)
   } catch (error) {
      console.log("deletion error", error)
   }

  };

  const getUserOrders = async (userId) => {
    const ordersRef = collection(firestore, "UserBooks", userId, "orders");
    const ordersQuery = query(ordersRef);
    const ordersSnapshot = await getDocs(ordersQuery);
    return ordersSnapshot;
};

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);

    const books = [];
    for (const doc of result.docs){
      books.push({id: doc.id, ...doc.data()});
    }
    return books;
  };

  //working
  const fetchMyBookswithOrders = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);

    const booksWithOrders = [];
  
    for (const doc of result.docs) {
      const ordersSnapshot = await getOrders(doc.id);
      if (!ordersSnapshot.empty) {
        booksWithOrders.push({ id: doc.id, ...doc.data() });
      }
    }

    return booksWithOrders;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        signout,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        fetchMyBookswithOrders,
        getOrders,
        getUserOrders,
        deletePlaceOrder,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};