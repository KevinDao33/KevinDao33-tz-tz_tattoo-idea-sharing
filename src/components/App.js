/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import GlobalStyle from "../styles/globalStyles";
import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

import Collection from "./Collcetion";
import Navbar from "./Navbar";
import Homapage from "./Homapage";
import Profile from "./Profile";
import CreateNewPin from "./CreateNewPin";
import Login from "./Login";
import PinDetail from "./PinDetail";
import EditProfile from "./EditProfile";
import OtherUserProfile from "./OtherUserProfile";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState("");

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // keep this console for knowing login status; will remove it before release
        console.log("status : not login");

        return;
      }
      const uid = user.uid;
      // keep this console for knowing login status; will remove it before release
      console.log("status : login", uid);
      setUid(uid);
      setIsLogin(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Homapage uid={uid} isLogin={isLogin} db={db} />}
        />
        <Route
          path='/profile'
          element={
            <Profile
              uid={uid}
              db={db}
              auth={auth}
              setUid={setUid}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route
          path={`user/:otherUserId`}
          element={<OtherUserProfile uid={uid} db={db} />}
        />
        <Route
          path='edit-profile'
          element={<EditProfile uid={uid} app={app} db={db} />}
        />
        <Route
          path='/create-pin'
          element={<CreateNewPin uid={uid} app={app} db={db} />}
        />
        <Route
          path={`pin-detail/:pinId`}
          element={<PinDetail uid={uid} app={app} db={db} />}
        />
        <Route
          path={`collection/:collectionName`}
          element={<Collection uid={uid} db={db} />}
        />
        <Route
          path='/login'
          element={
            <Login
              uid={uid}
              db={db}
              auth={auth}
              setUid={setUid}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route path='pin-detail' element={<PinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
