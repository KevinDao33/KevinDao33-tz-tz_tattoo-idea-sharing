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

const UserImage = styled.img`
  border-radius: 100px;
  width: 150px;
  height: 150px;
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

const ButtonWrapper = styled.div`
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
  cursor: pointer;
`;

const AllCollectionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid blue;
  height: auto;
`;

const CollectionWarpper = styled.div`
  width: 200px;
  height: 270px;
  border: 1px solid orange;
  border-radius: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
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
  margin: 5px auto;
`;

const CreateButton = styled.button`
  width: 60px;
  height: 60px;
  color: white;
  background-color: coral;
  border: none;
  border-radius: 30px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 0.5rem;
  margin: 10px;
  position: fixed;
  bottom: 0;
  right: 30px;
`;

const Overlay = styled.div`
  position: relative;
  opacity: 0.8;
  background-color: #ccc;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2;
`;

const CreateCollectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  max-width: 650px;
  height: 30vh;
  right: 25%;
  top: 25%;
  align-items: center;
  justify-content: center;
  bottom: 45px;
  position: fixed;
  background-color: #f2f1eb;
  border-radius: 20px;
  z-index: 3;
`;

const NameNewCollectionTitle = styled.label`
  font-size: 2rem;
  color: gray;
  line-height: normal;
  text-align: center;
  z-index: 3;
  margin: 30px auto 10px auto;
`;

const NameNewCollection = styled.input`
  width: 50%;
  height: 35px;
  font-size: 1.5rem;
  border-radius: 30px;
  border: 1.5px solid #e3e0e0;
  background-color: white;
  margin: 10px auto;
  padding-left: 10px;
  cursor: text;
  z-index: 3;
`;

const SaveButton = styled.button`
  width: 35%;
  color: white;
  background-color: coral;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
  margin: 20px;
  z-index: 5;
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

export {
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWrapper,
  Button,
  UserStuffWrapper,
  SelectSection,
  AllCollectionsWrapper,
  CollectionWarpper,
  CollectionImage,
  CollectionName,
  CreateButton,
  Overlay,
  SaveButton,
  CreateCollectionWrapper,
  NameNewCollectionTitle,
  NameNewCollection,
  LeaveButton,
};
