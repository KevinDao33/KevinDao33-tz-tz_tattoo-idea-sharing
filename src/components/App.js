import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import GlobalStyle from "../styles/globalStyles";

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
const db = getFirestore(app);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("status : not login");

        return;
      }
      const uid = user.uid;
      console.log("status : login", uid);
      setUid(uid);
      setIsLogin(true);
    });
  }, []);

  const routeDataList = [
    {
      path: "/",
      element: <Homapage uid={uid} isLogin={isLogin} db={db} />,
    },
    {
      path: "/profile",
      element: (
        <Profile
          uid={uid}
          db={db}
          auth={auth}
          setUid={setUid}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      ),
    },
    {
      path: "user/:otherUserId",
      element: <OtherUserProfile uid={uid} db={db} />,
    },
    {
      path: "edit-profile",
      element: <EditProfile uid={uid} db={db} />,
    },
    {
      path: "/create-pin",
      element: <CreateNewPin uid={uid} app={app} db={db} />,
    },
    {
      path: "pin-detail/:pinId",
      element: <PinDetail uid={uid} app={app} db={db} />,
    },
    {
      path: "collection/:collectionName",
      element: <Collection uid={uid} db={db} />,
    },
    {
      path: "/login",
      element: (
        <Login
          uid={uid}
          db={db}
          setUid={setUid}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      ),
    },
    {
      path: "/start-tattoo-plan",
      element: <StartTattooPlan uid={uid} db={db} />,
    },
    {
      path: "/tattoo-plan",
      element: <TattooPlan uid={uid} db={db} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar uid={uid} db={db} />
      <Routes>
        {routeDataList.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
