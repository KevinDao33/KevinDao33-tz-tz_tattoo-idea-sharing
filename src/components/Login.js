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
import {getDatabase, ref, set, child, get} from "firebase/database";

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
// const analytics = getAnalytics(app);

const auth = getAuth();
const database = getDatabase(app);

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const redirect = useNavigate();

  const showSingIn = () => {
    setIsShowSignWhat(SIGN_IN);
  };

  const showSingUp = () => {
    setIsShowSignWhat(SIGN_UP);
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
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
    signInWithEmailAndPassword(auth, email, password)
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
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      email: email,
      password: password,
    });
    console.log("data written to database");
  };

  const getUserData = (userId) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <LoginWrapper>
      <Button onClick={showSingIn}>Sign In</Button>
      <Button onClick={showSingUp}>Sign Up</Button>
      {isShowSignWhat === SIGN_IN && (
        <>
          <label>email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>

          <label>password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>

          <label>password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>

          <label>photo</label>
          <input
            type='file'
            accept='image/gif, image/jpeg, image/png, image/webp'
            value={userPhoto}
            onChange={(e) => setUserPhoto(e.target.value)}></input>

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
