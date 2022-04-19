import GlobalStyle from "../styles/globalStyles";
import Navbar from "./Navbar";
import Homapage from "./Homapage";
import Profile from "./Profile";
import CreateNewPin from "./CreateNewPin";
import Login from "./Login";
import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function App() {
  const [login, setLogin] = useState(false);
  const [uid, setUid] = useState();

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
        <Route
          path='/'
          element={<Homapage uid={uid} login={login} />}
        />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
