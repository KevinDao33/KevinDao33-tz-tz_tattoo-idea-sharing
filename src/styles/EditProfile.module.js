import styled from "styled-components";

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1300px;
  height: 1100px;
  margin: 90px auto 50px auto;
  border-radius: 20px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const EditNavAllWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin: 0 0 70px 0;
`;

const EditNavLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto 30px;
`;

const EditNavRightWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto 30px;
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
    /* transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px; */
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const EditTitle = styled.h2`
  font-size: 1.5rem;
  margin: auto 10px;
`;

const CancelButton = styled.button`
  width: 130px;
  height: 50px;
  color: gray;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  margin: auto 30px auto 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  text-align: center;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    /* transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px; */
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const SaveButton = styled.button`
  width: 130px;
  height: 50px;
  color: white;
  background-color: green;
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
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const InputTextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  height: 60px;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  margin: 30px auto 0 auto;
  transition: 0.4s;
  border-radius: 20px;
  border: 1px solid green;

  &:hover {
    transform: scale(1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const InputDescTextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  height: 250px;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  margin: 30px auto 0 auto;
  transition: 0.4s;
  border-radius: 20px;
  border: 1px solid green;

  &:hover {
    transform: scale(1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const InputFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50%;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  margin: 30px auto 0 auto;
  border-radius: 20px;
  border: 1px solid green;
  /* transition: 0.4s;

  &:hover {
    transform: scale(1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  } */
`;

const InputFileTitle = styled.span`
  width: 90px;
  margin: 10px auto;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
`;

const LabelFile = styled.label`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  margin: 10px auto;
  border: 1px solid green;
  transition: 0.4s;

  &:hover {
    transform: scale(1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const PhotoDisplay = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

const InputFile = styled.input`
  display: none;
`;

const InputTextTitle = styled.span`
  width: 150px;
  margin: auto 20px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid gray;
`;

const InputText = styled.input`
  width: 60%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: auto 20px;
  font-size: 1.5rem;
  padding-left: 15px;
  border: 1px solid green;

  &:focus {
    outline: none;
  }
`;

const InputDesc = styled.textarea`
  width: 60%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: auto 20px;
  font-size: 1.5rem;
  padding-left: 15px;
  border: 1px solid green;

  &:focus {
    outline: none;
  }
`;

// display: block;
// width: 100%;
// overflow: hidden;
// resize: both;
// min-height: 40px;
// line-height: 20px;

export {
  EditWrapper,
  EditNavAllWrapper,
  EditNavLeftWrapper,
  EditNavRightWrapper,
  BackButton,
  EditTitle,
  CancelButton,
  SaveButton,
  InputTextWrapper,
  InputDescTextWrapper,
  InputTextTitle,
  InputText,
  InputFileWrapper,
  InputFileTitle,
  LabelFile,
  PhotoDisplay,
  InputFile,
  InputDesc,
};
