import styled from "styled-components";

// ======================header section==================================
const CollectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 1350px;
  /* height: 300px; */
  margin: 90px auto 10px auto;
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
  font-size: 2rem;
  text-align: center;
  margin: 30px auto 10px auto;
  cursor: pointer;
`;

const AllButtonWrapper = styled.div`
  width: 30%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-color: #ecebe4;
  opacity: 0.8;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    transform: scale(1);
    background-color: #d3d3d3;
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const ButtonName = styled.h2`
  font-size: 0.5rem;
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
  border: 1px solid red;
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
  border-top: 1px solid gray;

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
    animation: shake 0.5s;
    animation-iteration-count: infinite;
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
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid lightgray;
  border-radius: 50px;
  margin: auto 20px auto 0;
  cursor: pointer;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
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
};
