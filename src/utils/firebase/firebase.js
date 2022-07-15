import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjGOjQVB9VJAujwLkwDy2et0TutXSuwzU",
  authDomain: "crwn-db-95bb4.firebaseapp.com",
  projectId: "crwn-db-95bb4",
  storageBucket: "crwn-db-95bb4.appspot.com",
  messagingSenderId: "801551367461",
  appId: "1:801551367461:web:7f37d594dc9f742dcdeecc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
   if(!userAuth) return;
   const userDocRef = doc(db, 'users', userAuth.uid);
   const userSnapshot = await getDoc(userDocRef);
   if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
      } catch (error) {
         console.log('Error creating user:', error);
      }
   }

   return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
}