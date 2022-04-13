import GlobalStyle from "../styles/globalStyles";
import Navbar from "./Navbar";
import Homapage from "./Homapage";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  doc,
  Timestamp,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};


function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  // line 41-59 is testing getting from firebase
  // will be used later when developing functions
  const getUser = async (id) => {
    const user = await getDoc(doc(db, "user", id));
    if (user.exists()) {
   
      return user.data();
    } else {
      console.error("Note doesn't exist");
    }
  };
  // getUser("M49BbsijmzC2W5TxBbg2");

  const getPins = async () => {
    const notesSnapshot = await getDocs(collection(db, "pin"));
    const pins = notesSnapshot.docs.map((doc) => doc.data());

    return pins;
  };
  // getPins();

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path='/' element={<Homapage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
