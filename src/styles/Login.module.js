import styled, {keyframes} from "styled-components";

// ===================================
const AllSignWrapper = styled.div`
  margin: auto;
  width: 420px;
  height: 650px;
  background: red;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
    no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
  @-moz-document url-prefix() {
    div {
      background-color: gray;
    }
  }
`;

const SignupWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  backdrop-filter: blur(8px) invert(0%);
`;

const SigninWrapper = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* background: #eee; */
  background: #232323;

  border-radius: 60% / 10%;
  transform: ${(props) =>
    props.$isSignIn ? "translateY(-80px)" : "translateY(-600px)"};
  transition: 0.8s ease-in-out;
`;

const SigninTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  margin: ${(props) =>
    props.$isSignIn ? "20px auto 10px auto" : "50px auto 10px auto"};
  transition: 0.4s;
  font-weight: bold;
  cursor: pointer;
  color: snow;
`;

const SignupTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  margin: 50px auto 10px auto;
  transition: 0.4s;
  font-weight: bold;
  cursor: pointer;
  color: black;
`;

const SignInput = styled.input`
  width: 60%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SignUpRoleTypeWrapper = styled.div`
  width: 60%;
  height: 20px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SignUpRoleTypeLabel = styled.label`
  width: 100%;
  height: 20px;
  font-size: 1rem;
  line-height: 1.1;
  display: flex;
  /* margin: 20px auto; */
  transition: 0.4s;
  color: #232323;
  /* grid-template-columns: 1em auto;
  gap: 0.5em; */

  &:hover {
    color: #f68535;
    font-size: 1.1rem;
    text-shadow: lightgray 1px 0 1px;
  }

  /* :focus-within {
    color: #f68535;
  } */
`;

const SignUpRoleTypeInput = styled.input`
  appearance: none;
  background-color: #fff;
  margin: auto 15px;
  font: inherit;
  color: lightgray;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;

  ::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 0.2s transform ease-in-out;
    box-shadow: inset 1em 1em #f68535;
  }

  :checked::before {
    transform: scale(1);
  }

  :focus {
    outline: max(1px, 0.15em) solid #f68535;
    outline-offset: max(1px, 0.15em);
  }
`;

const SignButtonWrapper = styled.div`
  width: 60%;
  height: auto;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SignButton = styled.button`
  height: 40px;
  width: 150px;
  margin: auto;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 1.1rem;
  position: relative;
  box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
    0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);

  &:before {
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 5px;
    content: "";
    width: 21%;
    /* opacity:0.8; */
    height: 103%;
    /* background: #232323; */
    background: #272727;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover {
    &::before {
      width: 100%;
      height: 103%;
    }
  }
`;

const SignButtonSpan = styled.span`
  color: white;
  mix-blend-mode: difference;
`;

const blink = keyframes`

  20%,
  24%,
  55% {
    color: #111;
    text-shadow: none;
  }
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500;
    color: #fff6a9;
  }

`;

const NoAccount = styled.div`
  width: 60%;
  height: auto;
  margin: auto 20px 70px auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  transition: 0.4s;

  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  text-align: center;
  animation: ${blink} 10s infinite;
`;

export {
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
};
