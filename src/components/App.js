import {getAuth} from "firebase/auth";
import {useState, useEffect, createContext} from "react";
import {initializeApp} from "firebase/app";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import GlobalStyle from "../styles/globalStyles";
import api from "../util/api";

import Collection from "./Collcetion";
import Navbar from "./Navbar";
import Homapage from "./Homapage";
import Profile from "./Profile";
import CreateNewPin from "./CreateNewPin";
import Login from "./Login";
import PinDetail from "./PinDetail";
import EditProfile from "./EditProfile";
import OtherUserProfile from "./OtherUserProfile";
import StartTattooPlan from "./StartTattooPlan";
import TattooPlan from "./TattooPlan";
import PageNotFound from "./PageNotFound";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const UserContext = createContext();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    api.checkLoginStatus(setUid, setIsLogin);
  }, []);

  useEffect(() => {
    uid && api.getUserData(uid, setUserData);
  }, [uid]);

  const routeDataList = [
    {
      path: "/",
      element: <Homapage uid={uid} isLogin={isLogin} />,
    },
    {
      path: "/profile",
      element: (
        <Profile
          uid={uid}
          auth={auth}
          setUid={setUid}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      ),
    },
    {
      path: "user/:otherUserId",
      element: <OtherUserProfile uid={uid} />,
    },
    {
      path: "edit-profile",
      element: <EditProfile uid={uid} />,
    },
    {
      path: "/create-pin",
      element: <CreateNewPin uid={uid} app={app} />,
    },
    {
      path: "pin-detail/:pinId",
      element: <PinDetail uid={uid} app={app} />,
    },
    {
      path: "collection/:collectionName",
      element: <Collection uid={uid} />,
    },
    {
      path: "/login",
      element: (
        <Login
          uid={uid}
          setUid={setUid}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      ),
    },
    {
      path: "/start-tattoo-plan",
      element: <StartTattooPlan uid={uid} />,
    },
    {
      path: "/tattoo-plan",
      element: <TattooPlan uid={uid} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];

  return (
    <UserContext.Provider value={userData}>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar uid={uid} />
        <Routes>
          {routeDataList.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

// export default App;
