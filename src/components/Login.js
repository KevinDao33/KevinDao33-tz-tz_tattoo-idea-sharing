import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import api from "../util/api";

import {
  AllSignWrapper,
  SignupWrapper,
  SigninWrapper,
  SigninTitle,
  SignupTitle,
  SignInput,
  SignUpRoleTypeWrapper,
  SignUpRoleTypeLabel,
  SignUpRoleTypeInput,
  SignButtonWrapper,
  SignButton,
  SignButtonSpan,
  NoAccount,
} from "../styles/Login.module";
import * as myConstClass from "../config";

function Login({auth, isLogin}) {
  const [isShowSignIn, setIsShowSignIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  // const [userPhoto, setUserPhoto] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userLink, setUserLink] = useState("");

  const redirect = useNavigate();

  const handleIsShowSignIn = () => {
    setIsShowSignIn((prev) => !prev);
  };

  const signUp = () => {
    if (
      !userEmail ||
      !userPassword ||
      userPassword.length < 6 ||
      !userName ||
      !userRole
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check if all blanks are filled",
      });
      return;
    }
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        user && writeUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("errorCode", errorCode);
        console.error("errorMessage", errorMessage);

        switch (errorCode) {
          case "auth/wrong-password":
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: myConstClass.AUTH_WRONG_PASSWORD,
            });
            break;
          case "auth/user-not-found":
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: myConstClass.AUTH_USER_NOT_FOUND,
            });
            break;
          case "auth/weak-password":
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: myConstClass.AUTH_WEAK_PASSWORD,
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: myConstClass.AUTH_LOGIN_FAIL,
            });
        }
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("errorCode", errorCode);
      console.error("errorMessage", errorMessage);

      switch (errorCode) {
        case "auth/wrong-password":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "密碼錯誤喔",
          });

          break;
        case "auth/user-not-found":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "帳號不存在喔",
          });
          break;
      }
    });
  };

  const writeUserData = (userId) => {
    const newUserData = {
      email: userEmail,
      password: userPassword,
      name: userName,
      link: userLink,
      role: userRole,
    };
    api.createNewUser(userId, newUserData);
  };

  async function handleSignIn() {
    signIn();
    isLogin && redirect("/profile");
  }
  async function handleSignUp() {
    signUp();
    isLogin && redirect("/profile");
  }

  return (
    <>
      <AllSignWrapper>
        <SignupWrapper>
          <SignupTitle onClick={handleIsShowSignIn}>Sign up</SignupTitle>
          <SignInput
            placeholder='Name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}></SignInput>
          <SignInput
            placeholder='Email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}></SignInput>
          <SignInput
            type='password'
            placeholder='Password (at least 6 characters)'
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}></SignInput>
          <SignInput
            placeholder='Instagram Link (Optional)'
            value={userLink}
            onChange={(e) => setUserLink(e.target.value)}></SignInput>
          <SignUpRoleTypeWrapper>
            <SignUpRoleTypeLabel htmlFor='user'>
              <SignUpRoleTypeInput
                type='radio'
                name='type'
                value='user'
                id='user'
                defaultChecked={true}
                onClick={() => {
                  setUserRole("user");
                }}
              />
              User
            </SignUpRoleTypeLabel>
            <SignUpRoleTypeLabel htmlFor='artist'>
              <SignUpRoleTypeInput
                type='radio'
                name='type'
                value='artist'
                id='artist'
                defaultChecked={false}
                onClick={() => {
                  setUserRole("artist");
                }}
              />
              Artist
            </SignUpRoleTypeLabel>
          </SignUpRoleTypeWrapper>
          <SignButtonWrapper>
            <SignButton onClick={handleSignUp}>
              <SignButtonSpan>Sign up</SignButtonSpan>
            </SignButton>
          </SignButtonWrapper>
        </SignupWrapper>

        <SigninWrapper $isSignIn={isShowSignIn}>
          <SigninTitle onClick={handleIsShowSignIn} $isSignIn={isShowSignIn}>
            Sign in
          </SigninTitle>
          <SignInput
            type='text'
            placeholder='Email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}></SignInput>
          <SignInput
            type='password'
            placeholder='password'
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}></SignInput>
          <SignButtonWrapper>
            <SignButton onClick={handleSignIn}>
              <SignButtonSpan>Sign in</SignButtonSpan>
            </SignButton>
          </SignButtonWrapper>
          <NoAccount onClick={handleIsShowSignIn}>
            Do not have an account ?
          </NoAccount>
        </SigninWrapper>
      </AllSignWrapper>
    </>
  );
}

Login.propTypes = {
  auth: PropTypes.object,
  isLogin: PropTypes.bool,
};

export default Login;
