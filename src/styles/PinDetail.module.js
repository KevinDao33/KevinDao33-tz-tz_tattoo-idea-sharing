import styled, {keyframes} from "styled-components";
import {NavLink} from "react-router-dom";
import viewMore from "../icon/more.png";
import viewMoreMove from "../icon/more-gif.gif";

const scroll = keyframes`
 100%{
    background-position: -3000px 0px;
  }
`;

const DarkBackgroundDisplay = styled.div`
  width: 100vw;
  min-height: 100vh;
  z-index: -100;
  animation: ${scroll} 120s linear infinite;
  padding: 100px 0 0 0;

  background-color: #1c1c1c;
  opacity: 1;
  background-image: radial-gradient(#515151 1.1px, transparent 1.1px),
    radial-gradient(#515151 1.1px, #1c1c1c 1.1px);
  background-size: 44px 44px;
  background-position: 0 0, 22px 22px;
`;

const breath = keyframes`
  0% {
    box-shadow: 20px 28px 24px -20px gray;
  }

  33% {
    box-shadow: 30px 38px 34px -26px lightgray;
  }

  /* 60% {
    box-shadow: 20px 28px 24px -20px gray;
  } */

  100% {
    /* box-shadow: 30px 38px 34px -26px lightgray; */
    box-shadow: 20px 28px 24px -20px gray;
  }
`;

const PinDetailWrapper = styled.div`
  width: 1300px;
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
`;

const PinImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const PinDetailDataWrapper = styled.div`
  width: 40%;
  margin-left: 3%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PinDetailSubNav = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  right: 0px;
  top: 20px;
`;

const CollectionSelector = styled.select`
  width: 110px;
  height: 40px;
  border-radius: 10px;
  background-color: lightgray;
  border: none;
  /* color: gray; */
  color: snow;
  font-size: 1rem;
  text-align: center;
  margin: auto 0;
`;

const CollectionName = styled.option`
  font-size: 1rem;
  /* color: snow; */
`;

const SaveButton = styled.button`
  color: black;
  /* color: white; */
  /* background-color: black; */
  background-color: snow;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  margin: 10px;
  text-align: center;
  transition: 0.4s;

  &:hover {
    background-color: #f68535;
    color: white;
  }
`;

const PinName = styled.h2`
  font-size: 3.5rem;
  color: snow;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 100px auto 20px 0;
`;

const PinDescription = styled.p`
  font-size: 1.25rem;
  margin: 0 auto 30px 10px;
  color: snow;
  line-height: 1.75rem;
  text-align: justify;
`;

const PinAuthorWrapper = styled(NavLink)`
  /* width: 100%; */
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  margin: 5px auto 5px 5px;
  /* border: 1px solid orange; */
  text-decoration: none;
  color: inherit;
`;

const PinAuthorPhoto = styled.img`
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin: 0 10px 0 10px;
  /* border: 1px solid red; */
  cursor: pointer;
`;

const PinAuthorName = styled.h6`
  font-size: 2rem;
  margin: 0 10px 0 10px;
  cursor: pointer;
  color: snow;
`;

const PinCommentTitle = styled.h4`
  font-size: 2rem;
  margin: 30px auto 20px 10px;
  color: snow;
  /* border: 1px solid red; */
`;

const AllPinCommentWrapper = styled.div`
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
`;

const OtherPinCommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

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
`;

const Link2CommentatorProfile = styled(NavLink)`
  min-width: 120px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
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
  color: snow;
  cursor: pointer;
`;

const PinComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin: 0 auto 0 10px;
  color: snow;
  /* border: 1px solid red; */
`;

const RelatedPinsTitle = styled.h2`
  margin: 0 auto 15px auto;
  font-size: 1.5rem;
  text-align: center;
  color: snow;
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

  &:hover {
    transform: scale(1.1);
    background: url(${viewMoreMove}) snow;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
  }
`;

const SubmitButton = styled.button`
  color: black;
  background-color: lightgray;
  border: none;
  border-radius: 10px;
  padding: 3px 20px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  margin: auto 10px auto 0;
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
  width: 80vw;
  min-height: ${(props) => (props.$similar ? "150px" : "0px")};
  height: ${(props) => (props.$similar ? "auto" : "0px")};
  overflow: hidden;
  border: ${(props) => (props.$similar ? "1px solid gray" : "none")};
  border-radius: 20px;
  margin: 30px auto 0 auto;
  padding-bottom: ${(props) => (props.$similar ? "50px" : "0")};
  transition: 0.4s;
`;

const SimiliarPin = styled.img`
  width: 300px;
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
  PinDescription,
  PinAuthorWrapper,
  PinAuthorPhoto,
  PinAuthorName,
  PinCommentTitle,
  AllPinCommentWrapper,
  OtherPinCommentWrapper,
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
};
