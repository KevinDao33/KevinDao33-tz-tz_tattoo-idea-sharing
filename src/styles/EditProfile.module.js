import styled from "styled-components";

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1300px;
  height: 800px;
  margin: 90px auto 50px auto;
  border-radius: 20px;
  border: 1px solid coral;
`;

const EditNavAllWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  /* flex-direction:row; */
  /* flex-wrap: nowrap; */
  margin: 0 0 70px 0;
  border: 1px solid red;
`;

const EditNavLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid blue;
`;

const EditNavRightWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid blue;
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
  margin: auto 10px;
  cursor: pointer;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
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
  margin: auto 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  text-align: center;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const SaveButton = styled.button`
  width: 130px;
  height: 50px;
  color: white;
  background-color: black;
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
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const InputWrapper = styled.div`
  width: 50%;
  height: 60px;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  margin: 20px auto 0 auto;
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

const InputTitle = styled.span`
  width: 100%;
  height: 50%;
  border: 1px solid green;
`;

export {
  EditWrapper,
  EditNavAllWrapper,
  EditNavLeftWrapper,
  EditNavRightWrapper,
  BackButton,
  EditTitle,
  CancelButton,
  SaveButton,
  InputWrapper,
  InputTitle
};
