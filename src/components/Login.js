import styled from "styled-components";
import {initializeApp} from "firebase/app";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {Button} from "../styles/Profile.module";
// import {getDatabase, ref, doc, child, get} from "firebase/database";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const LoginWrapper = styled.div`
  margin: 20px auto 0 auto;
  width: 30%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

function Login(props) {
  const SIGN_IN = "sign_in";
  const SIGN_UP = "sign_up";

  const [isShowSignWhat, setIsShowSignWhat] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userLink, setUserLink] = useState("");

  const redirect = useNavigate();

  const showSingIn = () => {
    setIsShowSignWhat(SIGN_IN);
  };

  const showSingUp = () => {
    setIsShowSignWhat(SIGN_UP);
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("hi", "user", user);
        writeUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);

        switch (errorCode) {
          case "auth/wrong-password":
            alert("密碼錯誤喔");
            break;
          case "auth/user-not-found":
            alert("帳號不存在喔");
            break;
          case "auth/weak-password":
            alert("密碼需至少六碼喔");
            break;
          default:
            alert("登入失敗QQ");
        }
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("hi", "user", user);
        getUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);

        switch (errorCode) {
          case "auth/wrong-password":
            alert("密碼錯誤喔");
            break;
          case "auth/user-not-found":
            alert("帳號不存在喔");
            break;

          default:
            alert("登入失敗QQ");
        }
      });
  };

  const writeUserData = (userId) => {
    setDoc(doc(db, "user/" + userId), {
      email: userEmail,
      password: userPassword,
      name: userName,
      link: userLink,
      uid: userId,
      follower: [],
      following: [],
      pic: userPhoto,
      role: userRole,
    });
    console.log("data written to database");
  };

  const getUserData = (userId) => {
    const unsub = onSnapshot(doc(db, "user/" + userId), (doc) => {
      console.log("Current data: ", doc.data());
    });

    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `users/${userId}`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <LoginWrapper>
      <Button onClick={showSingIn}>Sign In</Button>
      <Button onClick={showSingUp}>Sign Up</Button>
      {isShowSignWhat === SIGN_IN && (
        <>
          <label>email</label>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}></input>

          <label>password</label>
          <input
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}></input>

          <button
            onClick={async () => {
              signIn();
              props.login && redirect("/profile");
            }}>
            Sign In
          </button>
        </>
      )}
      {isShowSignWhat === SIGN_UP && (
        <>
          <label>name</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}></input>

          <label>email</label>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}></input>

          <label>password</label>
          <input
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}></input>

          <label>photo</label>
          <input
            type='file'
            accept='image/gif, image/jpeg, image/png, image/webp'
            value={userPhoto}
            onChange={(e) => setUserPhoto(e.target.value)}></input>

          <label>role</label>
          <input
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}></input>

          <label>link</label>
          <input
            value={userLink}
            onChange={(e) => setUserLink(e.target.value)}></input>

          <button
            onClick={async () => {
              signUp();
              props.login && redirect("/profile");
            }}>
            Sign Up
          </button>
        </>
      )}
    </LoginWrapper>
  );
}

export default Login;
