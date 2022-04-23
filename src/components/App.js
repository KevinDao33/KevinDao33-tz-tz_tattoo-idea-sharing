import GlobalStyle from "../styles/globalStyles";
import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";

import Collection from "./Collcetion";
import Navbar from "./Navbar";
import Homapage from "./Homapage";
import Profile from "./Profile";
import CreateNewPin from "./CreateNewPin";
import Login from "./Login";
import PinDetail from "./PinDetail";

function App() {
  const [login, setLogin] = useState(false);
  const [uid, setUid] = useState();

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  };

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("not login");

        return;
      }
      const uid = user.uid;
      console.log("login", uid);
      setUid(uid);
      setLogin(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path='/' element={<Homapage uid={uid} login={login} />} />
        <Route
          path='/profile'
          element={
            <Profile
              uid={uid}
              setUid={setUid}
              login={login}
              setLogin={setLogin}
            />
          }
        />
        <Route path='/create-pin' element={<CreateNewPin />} />
        <Route
          path={`pin-detail/:pinId`}
          element={<PinDetail uid={uid} firebaseConfig={firebaseConfig} />}
        />
        <Route
          path={`collection/:collectionName`}
          element={<Collection uid={uid} />}
        />
        <Route
          path='/login'
          element={
            <Login
              uid={uid}
              setUid={setUid}
              login={login}
              setLogin={setLogin}
            />
          }
        />
        <Route path='pin-detail' element={<PinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
