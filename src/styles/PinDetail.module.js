import styled, {keyframes} from "styled-components";
import {NavLink} from "react-router-dom";
import viewMore from "../icon/more.png";
import viewMoreMove from "../icon/more-gif.gif";

const scroll = keyframes`
 100%{
    background-position: -3000px 1500px;
  }
`;

const DarkBackgroundDisplay = styled.div`
  width: 100vw;
  min-height: 100vh;
  z-index: -100;
  animation: ${scroll} 120s linear infinite;
  padding: 100px 0 0 0;

  /* background-color: #f9f9f9;
  opacity: 1;
  background-image: radial-gradient(#515151 1.1px, transparent 1.1px),
    radial-gradient(#515151 1.1px, #f9f9f9 1.1px);
  background-size: 44px 44px;
  background-position: 0 0, 22px 22px; */
  background-color: #f9f9f9;
  opacity: 1;
  background-image: radial-gradient(#cdcdcd 2px, transparent 2px),
    radial-gradient(#cdcdcd 2px, #f9f9f9 2px);
  background-size: 80px 80px;
  background-position: 0 0, 40px 40px;
`;

const breath = keyframes`
  0% {
    box-shadow: 20px 28px 24px -20px black;
  }
  33% {
    box-shadow: 30px 38px 34px -26px gray;
  }
  100% {
    box-shadow: 20px 28px 24px -20px black;
  }
`;

const PinDetailWrapper = styled.div`
  width: 65%;
  height: auto;
  border-radius: 20px;
  margin: 0 auto 50px auto;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid lightgray;
  box-shadow: 20px 28px 24px -20px gray;
  transition: 0.4s;
  animation: ${breath} 2.5s ease-in-out infinite;
`;

const PinImageWrapper = styled.div`
  width: 55%;
  height: auto;
  border-radius: 20px 0 0 20px;

  @media (max-width: 1400px) {
    width: 100%;
    border-radius: 20px 20px 0 0;
  }
`;

const PinImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px 0 0 20px;

  @media (max-width: 1400px) {
    border-radius: 20px 20px 0 0;
  }
`;

const PinDetailDataWrapper = styled.div`
  /* background-color: rgba(330, 330, 330, 0.2); */
  /* filter: blur(5px); */
  border-radius: 0 10px 10px 0;
  /* opacity: 0.8; */
  width: 45%;
  /* margin-left: 3%; */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(2px);

  @media (max-width: 1400px) {
    width: 100%;
    height: fit-content;
    min-height: 700px;
    border-radius: 0 10px 10px 0;
  }

  @media (max-width: 1400px) {
    width: 100%;
    height: fit-content;
    min-height: 700px;
    border-radius: 0 10px 10px 0;
  }
`;

const PinDetailSubNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  min-width: 187px;
  position: absolute;
  right: 0px;
  top: 20px;
  transition: 0.3s;

  @media (max-width: 875px) {
    right: 0px;
    top: 10px;
  }
`;

const CollectionSelector = styled.select`
  width: 40%;
  height: 40px;
  border-radius: 10px;
  background-color: lightgray;
  border: none;
  /* color: gray; */
  color: gray;
  font-size: 1rem;
  text-align: center;
  margin: auto 0 auto auto;

  @media (max-width: 2100px) {
    width: 39%;
    height: 40px;
  }
  @media (max-width: 1800px) {
    width: 40%;
    height: 35px;
  }
  @media (max-width: 1680px) {
    width: 45%;
    height: 35px;
  }
  @media (max-width: 1580px) {
    width: 45%;
    height: 35px;
  }
  @media (max-width: 1363px) {
    width: 40%;
    height: 35px;
  }
  @media (max-width: 1205px) {
    width: 40%;
    height: 30px;
  }
  @media (max-width: 875px) {
    width: 40%;
    height: 25px;
  }
`;

const CollectionName = styled.option`
  font-size: 1rem;
`;

const SaveButton = styled.button`
  color: snow;
  /* color: white; */
  /* background-color: black; */
  background-color: gray;
  border: none;
  border-radius: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  padding: 10px;
  margin: auto 20px;
  text-align: center;
  transition: 0.4s;

  &:hover {
    /* animation: none; */
    background-color: #f68535;
    color: white;
  }

  @media (max-width: 2100px) {
    padding: 10px;
    margin: auto 20px;
  }
  @media (max-width: 1800px) {
    padding: 0 10px;
    height: 35px;
    margin: auto 20px;
  }
  @media (max-width: 1680px) {
    padding: 0 10px;
    height: 35px;
    margin: auto 10px auto 20px;
  }
  @media (max-width: 1270px) {
    padding: 0 10px;
    height: 35px;
    margin: auto 10px auto 20px;
  }
  @media (max-width: 1205px) {
    padding: 0 10px;
    height: 30px;
    margin: auto 10px auto 20px;
  }
  @media (max-width: 875px) {
    padding: 0 10px;
    height: 25px;
    margin: auto 10px auto 20px;
  }
`;

const PinName = styled.h2`
  font-size: 3.5rem;
  color: #39393a;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: calc(16%) auto calc(1%) 30px;
  transition: 0.3s;

  @media (max-width: 2100px) {
    font-size: 3.25rem;
    margin: calc(16%) auto calc(1%) 30px;
  }
  @media (max-width: 1800px) {
    font-size: 3rem;
    margin: calc(16%) auto calc(1%) 30px;
  }
  @media (max-width: 1680px) {
    font-size: 2.75rem;
    margin: calc(17%) auto calc(1%) 30px;
  }
  @media (max-width: 1580px) {
    font-size: 2.5rem;
    margin: calc(19%) auto calc(1%) 30px;
  }
  @media (max-width: 1400px) {
    font-size: 2.5rem;
    margin: 20px auto 10px 30px;
  }
  @media (max-width: 1200px) {
    font-size: 2.25rem;
    margin: 20px auto 10px 30px;
  }
  @media (max-width: 656px) {
    font-size: 2.25rem;
    margin: 45px auto 10px 30px;
  }

  /* @media (max-width: 1205px) {
    font-size: 2rem;
    margin: calc(23%) auto calc(1%) 30px;
  }
  @media (max-width: 1050px) {
    font-size: 1.75rem;
    margin: calc(27%) auto calc(1%) 20px;
  }
  @media (max-width: 875px) {
    font-size: 1.5rem;
    margin: calc(30%) auto calc(1%) 15px;
  } */
  /* @media (max-width: 650px) {
    font-size: 1.25rem;
    margin: calc(30%) auto calc(1%) 15px;
  } */
`;

const PinDescriptionWrapper = styled.div`
  display: block;
  margin: calc(1.5%) 30px;
  text-align: justify;
  line-height: 2rem;
  max-height: calc(23%);
  overflow: scroll;
  max-height: 210px;
`;

const PinDescription = styled.p`
  cursor: default;
  display: inline;
  font-size: 1.25rem;
  margin: 0 0 0 30px;
  color: #39393a;
  background-repeat: no-repeat;
  transition: all 0.8s ease-in-out;
  background-position: left;
  background-size: 0% 100%;
  background-image: linear-gradient(
    rgba(238, 109, 54, 0.6),
    rgba(238, 109, 54, 0.6)
  );

  &:hover {
    background-size: 100% 100%;
    /* color:snow; */
  }
  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const PinAuthorWrapper = styled(NavLink)`
  /* width: 100%; */
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  margin: 5px 20px 5px auto;
  /* border: 1px solid orange; */
  text-decoration: none;
  color: inherit;
`;

const PinAuthorPhoto = styled.img`
  border-radius: 50px;
  width: 55px;
  height: 55px;
  margin: 0 10px 0 10px;
  /* border: 1px solid red; */
  cursor: pointer;

  @media (max-width: 656px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 470px) {
    width: 45px;
    height: 45px;
    margin: 0 6px;
  }
`;

const PinAuthorName = styled.h6`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0 10px 0 10px;
  cursor: pointer;
  color: #39393a;

  @media (max-width: 656px) {
    font-size: 1.25rem;
  }
`;

const PinCommentTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 30px auto 15px 30px;
  color: #39393a;
  position: absolute;
  bottom: calc(25% + 100px);
  /* border: 1px solid red; */
  @media (max-width: 656px) {
    font-size: 1.25rem;
  }
  @media (max-width: 470px) {
    font-size: 1.15rem;
  }
`;

const AllPinCommentWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  background-color: rgba(230, 230, 230, 0.8);
  width: 90%;
  /* max-height: 380px; */
  height: calc(25%);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid rgba(230, 230, 230);
  margin: 0 auto 0 30px;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
`;

const OtherPinCommentWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  @media (max-width: 500px) {
    width: calc(100% - 30px);
    margin: 15px 0;
  }

  /* border: 1px solid orange; */
`;

const PinCommentWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: nowrap;
  margin: 20px 0;
  /* border-radius: 10px; */
  /* border: 1px solid lightgray; */
  /* box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2); */
  @media (max-width: 500px) {
    /* width: calc(100% - 30px); */
    margin: 15px 0;
  }
`;

const NoCommentMessage = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 150px; */
  margin: auto;
  font-size: 1.15rem;
  color: gray;
  font-weight: normal;
`;

const Link2CommentatorProfile = styled(NavLink)`
  min-width: 120px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  
  @media (max-width: 750px) {
    min-width: 45px;
  }
`;

const MyPinCommentWrapper = styled.div`
  position: absolute;
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: nowrap;
  /* border: 1px solid red; */
  margin: 10px 0;
  bottom: 20px;
`;

const UserPhoto = styled.img`
  border-radius: 50px;
  width: 45px;
  height: 45px;
  margin: auto 10px;
  /* border: 1px solid red; */
  cursor: pointer;
`;

const MyPhoto = styled.img`
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin: auto 10px;
  /* border: 1px solid red; */
  cursor: pointer;
`;

const PinCommentInput = styled.input`
  width: calc(100% - 60px - 10px - 10px - 10px);
  height: 35px;
  font-size: 1.5rem;
  /* border: 2px solid gray; */
  border-radius: 10px;
  background-color: white;
  padding-left: 15px;
  margin: auto 10px auto 0;
  border: 1px solid gray;
  cursor: text;
  &:focus {
    outline: none;
  }
`;

const UserName = styled.h6`
  font-size: 1.25rem;
  margin: 0 10px 0 0;
  color: #39393a;
  cursor: pointer;

  @media (max-width: 830px) {
    font-size: 1.15rem;
  }
  @media (max-width: 750px) {
    display: none;
  }
`;

const PinComment = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1rem;
  margin: 0 auto 0 10px;
  color: #39393a;
  width: fit-content;
  max-width: 55%;

  @media (max-width: 750px) {
    max-width: calc(100% - 50px);
    margin: 0 10px;
  }
`;

const RelatedPinsTitle = styled.h2`
  margin: 0 auto 15px auto;
  font-size: 1.5rem;
  text-align: center;
  color: #39393a;
  cursor: default;
`;

const ViewMoreIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin: 25px auto 30px auto;
  cursor: pointer;

  background: url(${viewMore}) snow;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  /* transform: rotate(180deg); */
  transform: ${(props) => (props.$similar ? "rotate(180deg)" : "rotate(0deg)")};

  &:hover {
    background: url(${viewMoreMove}) snow;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
  }
`;

const SubmitButton = styled.button`
  color: snow;
  background-color: #39393a;
  border: none;
  border-radius: 10px;
  padding: 3px 20px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  margin: auto 30px auto 0;
  text-align: center;
  line-height: 35px;
  transition: 0.4s;

  &:hover {
    color: white;
    background-color: #f68535;
  }
`;

const SimiliarPinsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  min-height: ${(props) => (props.$similar ? "150px" : "0px")};
  height: ${(props) => (props.$similar ? "auto" : "0px")};
  overflow: hidden;
  border: ${(props) => (props.$similar ? "1.5px solid gray" : "none")};
  border-radius: 20px;
  margin: 50px auto 0 auto;
  padding: ${(props) => (props.$similar ? "20px 0" : "0")};
  transition: 0.4s;
  background-color: snow;

  box-shadow: inset 0 4px 10px gray;
`;

const SimiliarPin = styled.img`
  width: 260px;
  height: auto;
  margin: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
  }
  @media (max-width: 740px) {
    width: 90%;
    margin: 14px;
  }
`;

const LoginReminder = styled.div`
  margin: auto 30px auto auto;
  cursor: pointer;
  font-weight: bold;
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
  }
`;

export {
  DarkBackgroundDisplay,
  PinDetailWrapper,
  PinImageWrapper,
  PinImage,
  PinDetailDataWrapper,
  PinDetailSubNav,
  CollectionSelector,
  CollectionName,
  SaveButton,
  PinName,
  PinDescriptionWrapper,
  PinDescription,
  PinAuthorWrapper,
  PinAuthorPhoto,
  PinAuthorName,
  PinCommentTitle,
  AllPinCommentWrapper,
  OtherPinCommentWrapper,
  NoCommentMessage,
  PinCommentWrapper,
  MyPinCommentWrapper,
  UserPhoto,
  MyPhoto,
  PinCommentInput,
  UserName,
  PinComment,
  RelatedPinsTitle,
  SubmitButton,
  SimiliarPinsWrapper,
  SimiliarPin,
  ViewMoreIconWrapper,
  Link2CommentatorProfile,
  LoginReminder,
};
