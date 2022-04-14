import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = useNavigate();

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        props.setLogin(true);
        console.log("hi", "user", user);
        writeUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        props.setLogin(false);

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
  }

  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        props.setLogin(true);
        console.log("hi", "user", user);
        getUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        props.setLogin(false);

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
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        props.setLogin(false);
      })
      .catch((error) => {});
  }

  function writeUserData(userId) {
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      email: email,
      password: password,
      clocks: [],
    });
    console.log("data written to database");
  }

  function getUserData(userId) {
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
  }

  return (
    <div className="login">
      {props.login === true ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <>
          <label>email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label>password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button
            onClick={async () => {
              signIn();
              props.login && redirect("/personal");
            }}
          >
            Login
          </button>
          <button
            onClick={async () => {
              signUp();
              props.login && redirect("/personal");
            }}
          >
            SignUp
          </button>
        </>
      )}
    </div>
  );
}

export default Login;