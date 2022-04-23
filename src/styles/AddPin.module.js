import styled from "styled-components";

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

const AddPinOptions = styled.div`
  position: absolute;
  position: fixed;
  top: 80px;
  right: 25%;
  border-radius: 20px;
  width: 50vw;
  height: 530px;
  z-index: 3;
  background-color: #f2f1eb;
  opacity: 1;
  overflow: auto;
  justify-content: center;
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
  font-size: 1.5rem;
`;

const PinImage = styled.img`
  height: 40%;
  border-radius: 20px;
  margin: 10px;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
`;

const PinName = styled.h2`
  font-size: 2rem;
  color: black;
  margin: 20px auto;
  line-height: normal;
  text-align: center;
`;

const AddToCollection = styled.div`
  width: 100%;
  height: 70px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CollectionName = styled.h3`
  font-size: 1.5rem;
  color: black;
  margin: 20px;
  line-height: normal;
  text-align: left;
`;

const SaveButton = styled.button`
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

const CreateCollectionWrapper = styled.div`
  display: flex;
  width: 50vw;
  height: 70px;
  right: 25%;
  align-items: center;
  justify-content: space-between;
  bottom: 45px;
  position: fixed;
  background-color: #f2f1eb;
  border-radius: 20px;
  z-index: 3;
`;

const NameNewCollectionTitle = styled.label`
  font-size: 1.5rem;
  color: gray;
  margin-left: 20px;
  line-height: normal;
  text-align: left;
`;

const NameNewCollection = styled.input`
  width: 35%;
  height: 35px;
  font-size: 1.5rem;
  border-radius: 30px;
  border: 1.5px solid #e3e0e0;
  background-color: white;
  margin: auto 10px;
  padding-left: 10px;
  cursor: text;
`;

export {
  Overlay,
  AddPinOptions,
  LeaveButton,
  PinImage,
  PinName,
  AddToCollection,
  CollectionName,
  SaveButton,
  CreateCollectionWrapper,
  NameNewCollectionTitle,
  NameNewCollection,
};
