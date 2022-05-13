import styled, {keyframes} from "styled-components";
import viewMore from "../icon/more.png";
import viewMoreMove from "../icon/more-gif.gif";

const scroll = keyframes`
 100%{
    background-position:-3000px 0px;
  }
`;

const CollectionBackgroundDisplay = styled.div`
  width: 100vw;
  min-height: 100vh;
  z-index: -100;
  padding-top: 90px;
  animation: ${scroll} 120s linear infinite;

  background-color: #f9f9f9;
  background: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23eeeeee' fill-opacity='1'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  @media (max-width: 1053px) {
    padding-top: 70px;
  }
  @media (max-width: 680px) {
    padding-top: 50px;
  }
`;

// ======================header section==================================
const CollectionHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  /* height: 300px; */
  margin: 0 auto 10px auto;
  border-radius: 20px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);

  /* border: 5px solid red; */
`;

const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px auto;
  border-radius: 100px;
`;

const CollectionName = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin: 60px auto 10px auto;
  cursor: pointer;

  @media (max-width: 1053px) {
    font-size: 2.25rem;
  }
  @media (max-width: 637px) {
    font-size: 2rem;
  }
  @media (max-width: 400px) {
    font-size: 1.75rem;
  }
`;

const AllButtonWrapper = styled.div`
  width: 30%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  transition: 0.3s;

  @media (max-width: 1313px) {
    width: 50%;
  }
  @media (max-width: 777px) {
    width: 70%;
  }
  @media (max-width: 513px) {
    width: 90%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Button = styled.img`
  width: 55px;
  height: 55px;
  margin: 10px auto;
  background-color: #ecebe4;
  opacity: 0.8;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    background-color: #d3d3d3;
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }

  @media (max-width: 965px) {
    width: 45px;
    height: 45px;
  }
  @media (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const ButtonName = styled.h2`
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  @media (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const SaveOrderButton = styled.button`
  width: 130px;
  height: 50px;
  color: white;
  background-color: lightgray;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: auto 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
    background-color: coral;
  }
`;

// ======================Pin section==================================
const MainWrapper = styled.div`
  width: 1400px;
  margin: 15px auto;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
`;

const AllPinsWrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
  align-items: flex-start;
  justify-content: center;
  /* border-top: 1px solid gray; */
  /* 
  background-color:red; */

  /* border: 5px solid blue; */
  height: auto;

  @media (max-width: 630px) {
  }
`;

const PinWrapper = styled.div`
  /* width: 325px;
  height: auto;
  border: 1px solid red;
  border-radius: 20px;
  margin: 10px;
  background-color: lightblue; */
  position: relative;
  display: flex;
  justify-content: center;

  @media (max-width: 630px) {
    /* width: 80%; */
  }
`;

const PinImage = styled.img`
  width: 260px;
  border-radius: 10px;
  cursor: pointer;
  margin: 15px;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
    /* animation: shake 0.5s;
    animation-iteration-count: infinite; */
  }

  /* @media (max-width: 630px) {
    width: 80%;
  } */
  @media (max-width: 1460px) {
    width: 95%;
  }
`;

const PinImageDelete = styled.img`
  width: 260px;
  border-radius: 10px;
  cursor: pointer;
  margin: 15px;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  animation: shake 0.5s;
  animation-iteration-count: infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
  }

  @media (max-width: 630px) {
    width: 80%;
  }
  @media (max-width: 440px) {
    width: 95%;
  }
`;

const PinImageArrange = styled.img`
  width: 85%;
  border-radius: 10px;
  cursor: pointer;
  margin: 15px auto;
  transition: 0.2s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  position: static;

  /* border: 3px solid cornflowerblue; */

  &:hover {
    /* transform: scale(1.1); */
    transform: rotate(5deg);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
    /* animation: shake 0.5s; */
    /* animation-iteration-count:infinite; */
  }
  @media (max-width: 538px) {
    margin: 8px;
  }
  @media (max-width: 408px) {
    margin: 4px;
  }
  @media (max-width: 350px) {
    margin: 2px;
  }
`;

const RemoveButton = styled.button`
  width: 40px;
  height: 40px;
  color: gray;
  background-color: lightgray;
  opacity: 0.9;
  border: none;
  border-radius: 30px;
  /* padding: 10px; */
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 1.5rem;
  transition: 0.4s;

  &:hover {
    color: white;
    background-color: coral;
    opacity: 1;
  }

  @media (max-width: 630px) {
    width: 6vw;
    height: 6vw;
  }
  @media (max-width: 450px) {
    font-size: 1.25rem;
    line-height: 1.25rem;
  }
  @media (max-width: 337px) {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

const DragPinWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ShowEmptyMessage = styled.div`
  text-align: center;
  margin: 20px auto;
`;

const ArrangeNavWrapper = styled.div`
  width: 75%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 70px auto 0 auto; */
  margin: auto;

  /* border: 5px solid green; */
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  /* border: 1px solid lightgray; */
  border-radius: 50px;
  margin: auto 20px auto 0;
  cursor: pointer;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;
  transform: rotate(90deg);

  background: url(${viewMore});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    background: url(${viewMoreMove});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
  }

  @media (max-width: 637px) {
    top: 55px;
    width: 45px;
    height: 45px;
  }
 
`;

const ArrangeBackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  /* border: 1px solid lightgray; */
  border-radius: 50px;
  margin: auto 20px auto 0;
  cursor: pointer;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;
  transform: rotate(90deg);

  background: url(${viewMore});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    background: url(${viewMoreMove});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
  }

  @media (max-width: 650px) {
    top: 30px;
    left: 15px;
    width: 40px;
    height: 40px;
  }
  @media (max-width: 440px) {
    top: 8px;
    left: 5px;
    width: 30px;
    height: 30px;
  }

`;

const ArrangeTitle = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: auto;
  font-weight: bold;
  transition: 0.3s;

  @media (max-width: 1850px) {
    font-size: 1.75rem;
  }
  @media (max-width: 1300px) {
    font-size: 1.5rem;
  }
  @media (max-width: 950px) {
    font-size: 1.25rem;
  }
  @media (max-width: 650px) {
    font-size: 1rem;
  }
  @media (max-width: 450px) {
    font-size: 0.95rem;
  }
`;

const SaveButton = styled.button`
  position: absolute;
  right: 10px;
  width: 130px;
  height: 50px;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: auto 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    /* transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px; */
    background-color: coral;
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1850px) {
    right: 10px;
    width: 110px;
    height: 40px;
    padding: 10px;
    margin: auto 10px;
    font-size: 1.25rem;
  }
  @media (max-width: 1300px) {
    right: 10px;
    width: 100px;
    height: 40px;
    padding: 10px;
    margin: auto 10px;
    font-size: 1.25rem;
  }
  @media (max-width: 950px) {
    right: 10px;
    width: 80px;
    height: 35px;
    padding: 10px;
    margin: auto 10px;
    font-size: 1.1rem;
  }
  @media (max-width: 680px) {
    right: 6px;
    width: 60px;
    height: 30px;
    padding: 7px;
    margin: auto 10px;
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    right: 6px;
    width: 40px;
    height: 25px;
    padding: 3px;
    margin: auto 10px;
    font-size: 0.8rem;
  }
  @media (max-width: 440px) {
    top: 8px;
    right: 0px;
    width: 40px;
    height: 25px;
    padding: 3px;
    margin: auto 10px;
    font-size: 0.8rem;
  }
`;

export {
  CollectionBackgroundDisplay,
  CollectionHeader,
  UserPhoto,
  CollectionName,
  AllButtonWrapper,
  ButtonWrapper,
  Button,
  ButtonName,
  SaveOrderButton,
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  RemoveButton,
  DragPinWrapper,
  ShowEmptyMessage,
  PinImageArrange,
  ArrangeNavWrapper,
  BackButton,
  ArrangeBackButton,
  ArrangeTitle,
  SaveButton,
  PinImageDelete,
};
