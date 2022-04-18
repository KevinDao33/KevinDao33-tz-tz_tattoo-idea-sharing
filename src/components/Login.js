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
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import {LoginWrapper} from "../styles/Login.module";

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
        writeUserData(user.uid);
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
        getUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("errorCode", errorCode);
        console.error("errorMessage", errorMessage);

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
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: doc.data().name,
          email: doc.data().email,
          role: doc.data().role,
          following: doc.data().following,
          follower: doc.data().follower,
          pic: doc.data().pic,
          id: doc.data().uid,
          link: doc.data().link,
        })
      );
      props.setUserData({
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
        following: doc.data().following,
        follower: doc.data().follower,
        pic: doc.data().pic,
        id: doc.data().uid,
        link: doc.data().link,
      });
    });
  };

  return (
    <LoginWrapper>
      <Button onClick={showSingIn}>Sign In</Button>
      <Button onClick={showSingUp}>Sign Up</Button>
      {/* elements below will be written in styled components */}
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

          {/* decide to give a picture as user's profile photo, users will be able to change it at edit-page */}
          {/* <label>photo</label>
          <input
            type='file'
            accept='image/gif, image/jpeg, image/png, image/webp'
            value={userPhoto}
            onChange={(e) => setUserPhoto(e.target.value)}></input> */}

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
