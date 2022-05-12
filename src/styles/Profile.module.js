import styled, {keyframes} from "styled-components";
import noPin from "../icon/noPin.png";

const scroll = keyframes`
 100%{
    background-position:-5000px, 180px;
  }
`;

const ProfileBackgroundDisplay = styled.div`
  padding: 90px 0;
  width: 100vw;
  min-height: 100vh;
  z-index: -100;
  animation: ${scroll} 70s linear infinite;

  background-color: #f9f9f9;
  opacity: 1;
  background-image: linear-gradient(#cdcdcd 4px, transparent 4px),
    linear-gradient(to right, #cdcdcd 4px, #f9f9f9 4px);
  background-size: 80px 80px;
  /* position: relative; */
`;

const PorfileWrapper = styled.div`
  /* width: 1350px; */
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  backdrop-filter: blur(8px);
  position: relative;
`;

const UserImage = styled.img`
  border-radius: 200px;
  width: 210px;
  height: 210px;
  background-color: gray;
  margin: 25px auto 0 auto;
  transition: 0.2s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  @media (max-width: 1420px) {
    width: 180px;
    height: 180px;
  }
  @media (max-width: 1130px) {
    width: 140px;
    height: 140px;
  }
  @media (max-width: 500px) {
    width: 120px;
    height: 120px;
  }
`;

const UserName = styled.p`
  font-size: 2rem;
  margin: 15px auto 10px auto;
  font-weight: bold;
  transition: 0.2s;

  @media (max-width: 1420px) {
    font-size: 1.75rem;
  }
  @media (max-width: 1130px) {
    font-size: 1.5rem;
  }
  @media (max-width: 500px) {
    font-size: 1.45rem;
  }
`;

const ShowFollow = styled.p`
  font-size: 1.25rem;
  margin: 5px auto;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1420px) {
    font-size: 1.15rem;
  }
  @media (max-width: 1130px) {
    font-size: 1.1rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 10px auto;
  position: relative;
`;

const Button = styled.button`
  color: gray;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  margin: 10px;
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    background-color: #f68535;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }

  @media (max-width: 1420px) {
    font-size: 1.15rem;
  }
  @media (max-width: 1130px) {
    font-size: 1.1rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
  @media (max-width: 404px) {
    margin: 7px;
    padding: 7px;
  }
`;

const UserStuffWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid purple; */
  margin: 20px auto;
`;

const SelectSection = styled.p`
  font-size: 1.4rem;
  margin: 10px 30px;
  padding: 3px 10px;
  border-bottom: ${(props) =>
    props.$section ? "1px solid #dc762e" : "1px solid gray"};
  cursor: pointer;
  transition: 0.3s;
  color: ${(props) => (props.$section ? "#dc762e" : "rgb(26, 24, 27)")};

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1420px) {
    font-size: 1.3rem;
  }
  @media (max-width: 1130px) {
    font-size: 1.25rem;
  }
  @media (max-width: 488px) {
    font-size: 1rem;
    text-align: center;
    line-height: 1.5rem;
    padding: 3px 5px;
  }
`;

const MainAllCollectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: fit-content;
  width: 100%;
  margin: 0 auto;

  /* border: 1px solid green; */
`;

const AllCollectionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
  justify-content: center;
  height: auto;
  width: fit-content;
  margin: 0 auto;

  /* border: 1px solid red; */
`;

const CollectionWarpper = styled.div`
  width: 200px;
  height: 270px;
  border-radius: 20px;
  margin: 12.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  /* border: 1px solid blue; */
`;

const CollectionImage = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 0 10px 0;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  background: url(${(props) => (props.$pinImg ? props.$pinImg : noPin)}) white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: 0.3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
`;

const CollectionName = styled.h3`
  color: gray;
  font-size: 1.3rem;
  text-align: center;
  margin: 5px auto;
`;

const CreateButtonWrapper = styled.div`
  /* width: 100%; */
  /* height: auto; */
  display: flex;
  /* justify-content: flex-end; */
  /* margin: */
  position: absolute;
  right: -5px;
  bottom: 3px;

  @media (max-width: 1140px) {
    right: -5px;
    bottom: 380px;
  }
  @media (max-width: 500px) {
    right: -5px;
    bottom: 360px;
  }
  /* @media (max-width: 404px) {
    right: -5px;
    bottom: 340px;
  } */
`;

const CreateButton = styled.button`
  height: 40px;
  margin: 0 30px 0 auto;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 18px;
  font-size: 1.25rem;
  position: relative;
  box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
    0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);

  &:before {
    transition: all 0.55s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 5px;
    content: "";
    width: 8%;
    height: 30%;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover {
    &::before {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: 1140px) {
    font-size: 1.5rem;
  }
  @media (max-width: 740px) {
    height: 35px;
    margin: 0 30px 0 auto;
    padding: 8px 12px;
  }
  @media (max-width: 482px) {
    height: 35px;
    margin: 0 30px 0 auto;
    padding: 8px 12px;
  }
`;

const CreateButtonSpan = styled.span`
  color: white;
  mix-blend-mode: difference;
`;

const Overlay = styled.div`
  /* opacity: ${(props) => (props.$showOverlay ? "0.7" : "0")}; */
  opacity: 0.7;
  background-color: gray;
  position: fixed;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* z-index: ${(props) => (props.$showOverlay ? "20" : "0")}; */
  z-index: 2;
`;

const CreateCollectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  max-width: 650px;
  height: 30vh;
  right: 25%;
  top: 25%;
  align-items: center;
  justify-content: center;
  bottom: 45px;
  position: fixed;
  background-color: #f2f1eb;
  border-radius: 10px;
  z-index: 3;
`;

const NameNewCollectionTitle = styled.label`
  font-size: 2rem;
  color: gray;
  line-height: normal;
  text-align: center;
  z-index: 3;
  margin: 15px auto 20px auto;
`;

const NameNewCollection = styled.input`
  width: 50%;
  height: 35px;
  font-size: 1.5rem;
  border-radius: 10px;
  border: 1.5px solid #e3e0e0;
  background-color: white;
  margin: 10px auto 15px auto;
  padding-left: 10px;
  cursor: text;
  z-index: 3;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const SaveButton = styled.button`
  width: 30%;
  color: snow;
  background-color: #39393a;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
  margin: 20px auto;
  z-index: 5;
  transition: 0.3s;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  &:hover {
    color: snow;
    background-color: #f68535;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
`;

const LeaveButton = styled.button`
  color: gray;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.5rem;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  /* margin: ${(props) => (props.$showFollow ? "0 583px 0 0" : "0 541px")}; */
  margin: ${(props) => (props.$showFollow ? "0 83px 0 0" : "0 541px")};

  @media (max-width: 2229px) {
    margin: ${(props) => (props.$showFollow ? "0 183px 0 0" : "0 541px")};
  }
  @media (max-width: 1868px) {
    margin: ${(props) => (props.$showFollow ? "0 253px 0 0" : "0 541px")};
  }
  @media (max-width: 1745px) {
    margin: ${(props) => (props.$showFollow ? "0 353px 0 0" : "0 541px")};
  }
  @media (max-width: 1571px) {
    margin: ${(props) => (props.$showFollow ? "0 453px 0 0" : "0 541px")};
  }
  @media (max-width: 1420px) {
    margin: ${(props) => (props.$showFollow ? "0 553px 0 0" : "0 541px")};
  }
  @media (max-width: 1072px) {
    margin: ${(props) => (props.$showFollow ? "0 auto 250px auto" : "0 541px")};
    /* margin: 0 auto 250px auto; */
  }
`;

const FollowInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 0;
  opacity: ${(props) => (props.$showFollow ? "1" : "0")};
  width: ${(props) => (props.$showFollow ? "600px" : "0px")};
  height: ${(props) => (props.$showFollow ? "300px" : "0px")};
  overflow-x: scroll;
  position: absolute;
  border-radius: 10px;
  top: 45px;
  right: 150px;
  transition: 0.5s;
  border: ${(props) => (props.$showFollow ? "1px solid lightgray" : "none")};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;

  @media (max-width: 2229px) {
    top: 45px;
    right: 80px;
  }
  @media (max-width: 1745px) {
    width: ${(props) => (props.$showFollow ? "560px" : "0px")};
    height: ${(props) => (props.$showFollow ? "300px" : "0px")};
  }
  @media (max-width: 1571px) {
    top: 75px;
    right: 60px;
    width: ${(props) => (props.$showFollow ? "560px" : "0px")};
    height: ${(props) => (props.$showFollow ? "280px" : "0px")};
  }
  @media (max-width: 1420px) {
    top: 60px;
    right: 60px;
    width: ${(props) => (props.$showFollow ? "460px" : "0px")};
    height: ${(props) => (props.$showFollow ? "250px" : "0px")};
  }
  @media (max-width: 1140px) {
    top: 140px;
    right: 60px;
    width: ${(props) => (props.$showFollow ? "460px" : "0px")};
    height: ${(props) => (props.$showFollow ? "250px" : "0px")};
  }
  @media (max-width: 1128px) {
    top: 80px;
    right: 60px;
    width: ${(props) => (props.$showFollow ? "460px" : "0px")};
    height: ${(props) => (props.$showFollow ? "250px" : "0px")};
  }
  @media (max-width: 1072px) {
    top: 350px;
    right: 10%;
    width: ${(props) => (props.$showFollow ? "80%" : "0px")};
    height: ${(props) => (props.$showFollow ? "250px" : "0px")};
  }
`;

const FollowTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* width:100%; */
  height: 25px;
  border-radius: 3px;
  margin: 15px auto 10px 15px;
  padding: 10px;
  backdrop-filter: blur(16px);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #dc762e;
  color: white;
  cursor: default;

  @media (max-width: 1420px) {
    margin: 15px auto 10px 15px;
    font-size: 1.25rem;
    height: 20px;
  }

  @media (max-width: 1140px) {
    margin: 15px auto 10px 15px;
    font-size: 1rem;
    height: 16px;
  }
`;

const FollowUserWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: calc(100% - 25px - 25px);
  min-height: 210px;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: auto 25px;

  @media (max-width: 1420px) {
    min-height: 100px;
    height: fit-content;
    margin: auto 25px 10px 25px;
  }
  @media (max-width: 1072px) {
    min-height: 100px;
    height: fit-content;
    width: fit-content;
    margin: auto auto 10px auto;
    /* border: 1px solid red; */
  }
`;

const FollowUser = styled.div`
  width: 150px;
  height: 90%;
  display: flex;
  flex-direction: column;
  margin: auto 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1420px) {
    width: 120px;
    height: fit-content;
    margin: 20px 10px;
  }
`;

const FollowUserImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  margin: 0 auto 10px auto;
  transition: 0.4s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1420px) {
    width: 90px;
    height: 90px;
    margin: 0 10px 10px 10px;
  }
  @media (max-width: 1140px) {
    width: 70px;
    height: 70px;
    margin: 0 10px 10px 10px;
  }
`;

const FollowUserName = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: gray;
  cursor: pointer;
`;

export {
  ProfileBackgroundDisplay,
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWrapper,
  Button,
  UserStuffWrapper,
  SelectSection,
  MainAllCollectionWrapper,
  AllCollectionsWrapper,
  CollectionWarpper,
  CollectionImage,
  CollectionName,
  CreateButtonWrapper,
  CreateButton,
  CreateButtonSpan,
  Overlay,
  SaveButton,
  CreateCollectionWrapper,
  NameNewCollectionTitle,
  NameNewCollection,
  LeaveButton,
  UserInfoWrapper,
  FollowInfoWrapper,
  FollowTitle,
  FollowUserWrapper,
  FollowUser,
  FollowUserImage,
  FollowUserName,
  CloseButton,
};
