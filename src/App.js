import GlobalStyle from "./globalStyles";
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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhSbQw18_zFQ7GzjqhjeAdNeDYl10udoY",
  authDomain: "tz-tz-fa8a7.firebaseapp.com",
  projectId: "tz-tz-fa8a7",
  storageBucket: "tz-tz-fa8a7.appspot.com",
  messagingSenderId: "325929538936",
  appId: "1:325929538936:web:982fb0931f435969f4e48d",
  measurementId: "G-F45EQNSF22",
};

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  const getUser = async (id) => {
    const user = await getDoc(doc(db, "user", id));
    if (user.exists()) {
      console.log("data", user.data());
      return user.data();
    } else {
      console.log("Note doesn't exist");
    }
  };

  // getUser("M49BbsijmzC2W5TxBbg2");

  const getPins = async () => {
    const notesSnapshot = await getDocs(collection(db, "pin"));
    const pinsList = notesSnapshot.docs.map((doc) => doc.data());
    console.log("pinList", pinsList);
    return pinsList;
  };
  // getPins();

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path='/' element={<Homapage />} />
          <Route
              path="/profile"
              element={<Profile />}
            />
            {/* <Route
              path="/login"
              element={<Login login={login} setLogin={setLogin} />}
            /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
