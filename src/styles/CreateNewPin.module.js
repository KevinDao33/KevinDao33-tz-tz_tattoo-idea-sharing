import styled from "styled-components";

const CreateNewPinWrapper = styled.div`
  background-color: lightgray;
  width: 80vw;
  height: 75vh;
  display: flex;
  border-radius: 20px;
  margin: 35px auto;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
`;

const PinDataUploadWrapper = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid blue;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const PinImageUploadWrapper = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid red;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const NewPinDataWrapper = styled.div`
  width: 100%;
  border: 1px solid blue;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const NewPinDataTitle = styled.label`
  font-size: 1rem;
  font-weight: normal;
  color: gray;
  margin: 10px 20px 10px 35px;
`;

const NewPinDataInput = styled.input`
  width: 100%;
  max-width: 200px;
  min-width: 90px;
  height: 40px;
  /* border-radius: 30px; */
  border: none;
  border-bottom: 1.5px solid #e3e0e0;
  background-color: white;
  padding-left: 20px;
  cursor: text;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
`;

const CreatePinButton = styled.button`
  color: white;
  background-color: coral;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
`;

const UploadNewPinImageLabel = styled.label`
  width: 90%;
  min-height: 300px;
  min-width: 300px;
  height: 80%;
  border-radius: 30px;
  border: none;
  border-bottom: 1.5px solid #e3e0e0;
  background-color: white;
  padding-left: 20px;
  cursor: copy;
  margin: 20px 0 0 0;
  color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;

  &:hover {
    color: lightgreen;
  }
`;

const UploadNewPinImageInput = styled.input`
  display: none;
`;

export {
  CreateNewPinWrapper,
  PinDataUploadWrapper,
  NewPinDataWrapper,
  PinImageUploadWrapper,
  NewPinDataTitle,
  NewPinDataInput,
  CreatePinButton,
  UploadNewPinImageLabel,
  UploadNewPinImageInput,
};
