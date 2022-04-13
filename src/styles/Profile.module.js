import styled from "styled-components";

const PorfileWrapper = styled.div`
  width: 90vw;
  margin: 15px auto;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.div`
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: gray;
  margin: 20px auto 0px auto;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  margin: 15px auto 10px auto;
  font-weight: bold;
`;

const ShowFollow = styled.p`
  font-size: 1rem;
  margin: 2px auto;
`;

const ButtonWeapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px auto;
`;

const Button = styled.button`
  color: gray;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  margin: 10px;
`;

const UserStuffWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  border: 1px solid purple;
`;

const SelectSection = styled.p`
  font-size: 1rem;
  margin: 10px 30px;
  border-bottom: 1px solid gray;
`;

const UserPin = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  height: auto;
  min-height: 300px;
`;

const CollectionWarpper = styled.div`
  width: 200px;
  height: 270px;
  border: 1px solid orange;
  border-radius: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content:center; */
  align-items: center;
`;

const CollectionImage = styled.div`
  background-color: lightblue;
  width: 200px;
  height: 200px;
  margin: 0 0 10px 0;
  border-radius: 20px;
`;

const CollectionName = styled.h3`
  color: gray;
  font-size: 1.3rem;
  text-align: center;
  margin: 5px auto
`;

export {
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWeapper,
  Button,
  UserStuffWrapper,
  SelectSection,
  UserPin,
  CollectionWarpper,
  CollectionImage,
  CollectionName
};
