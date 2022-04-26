/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {initializeApp} from "firebase/app";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {Button} from "../styles/Profile.module";
import {getFirestore, doc, setDoc, onSnapshot} from "firebase/firestore";

import {LoginWrapper} from "../styles/Login.module";
import * as myConstClass from "../const";

function Login(props) {

  const [showSignWhat, setshowSignWhat] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userLink, setUserLink] = useState("");

  const redirect = useNavigate();

  // const app = initializeApp(props.firebaseConfig);
  // const db = getFirestore(app);
  const auth = getAuth();

  const showSignIn = () => {
    setshowSignWhat(myConstClass.SIGN_IN);
  };

  const showSignUp = () => {
    setshowSignWhat(myConstClass.SIGN_UP);
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
        console.error("errorCode", errorCode);
        console.error("errorMessage", errorMessage);

        switch (errorCode) {
          case "auth/wrong-password":
            alert(myConstClass.AUTH_WRONG_PASSWORD);
            break;
          case "auth/user-not-found":
            alert(myConstClass.AUTH_USER_NOT_FOUND);
            break;
          case "auth/weak-password":
            alert(myConstClass.AUTH_WEAK_PASSWORD);
            break;
          default:
            alert(myConstClass.AUTH_LOGIN_FAIL);
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
    setDoc(doc(props.db, `user/${userId}`), {
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
    const handleUserData = onSnapshot(doc(props.db, `user/${userId}`), (doc) => {
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

  async function handleSignIn() {
    signIn();
    props.isLogin && redirect("/profile");
  }
  async function handleSignUp() {
    signUp();
    props.isLogin && redirect("/profile");
  }

  return (
    <LoginWrapper>
      <Button onClick={showSignIn}>Sign In</Button>
      <Button onClick={showSignUp}>Sign Up</Button>
      {/* elements below will be written in styled components */}
      {showSignWhat === myConstClass.SIGN_IN && (
        <>
          <label>email</label>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}></input>

          <label>password</label>
          <input
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}></input>

          <button onClick={handleSignIn}>Sign In</button>
        </>
      )}
      {showSignWhat === myConstClass.SIGN_UP && (
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

          <button onClick={handleSignUp}>Sign Up</button>
        </>
      )}
    </LoginWrapper>
  );
}

export default Login;
