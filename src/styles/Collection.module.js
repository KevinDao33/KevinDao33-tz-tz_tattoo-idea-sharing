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
  padding-top: 120px;
  animation: ${scroll} 120s linear infinite;

  background-color: #f9f9f9;
  background: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23eeeeee' fill-opacity='1'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

// ======================header section==================================
const CollectionHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1350px;
  /* height: 300px; */
  margin: 0 auto 10px auto;
  border-radius: 20px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
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
`;

const AllButtonWrapper = styled.div`
  width: 30%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
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
`;

const ButtonName = styled.h2`
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
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
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: center;
  /* border-top: 1px solid gray; */

  /* border: 1px solid blue; */
  height: auto;
`;

const PinWrapper = styled.div`
  /* width: 325px;
  height: auto;
  border: 1px solid red;
  border-radius: 20px;
  margin: 10px;
  background-color: lightblue; */
  position: relative;
`;

const PinImage = styled.img`
  width: 300px;
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
`;

const PinImageDelete = styled.img`
  width: 300px;
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
`;

const PinImageArrange = styled.img`
  width: 300px;
  border-radius: 10px;
  cursor: pointer;
  margin: 15px;
  transition: 0.2s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);

  &:hover {
    /* transform: scale(1.1); */
    transform: rotate(5deg);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
    /* animation: shake 0.5s; */
    /* animation-iteration-count:infinite; */
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
  width: 1400px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 70px auto 0 auto;
`;

const BackButton = styled.div`
  position: absolute;
  top: 40px;
  left: 35px;
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
  }
`;

const SaveButton = styled.button`
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
  SaveButton,
  PinImageDelete,
};
