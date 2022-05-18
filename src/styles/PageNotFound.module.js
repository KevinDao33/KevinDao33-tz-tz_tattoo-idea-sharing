import styled from "styled-components";

const AllErrorWrapper = styled.div`
  background: #000;
  color: snow;
  height: 100vh;
  line-height: 1.5;
  perspective: 40em;
`;

const ErrorWrapper = styled.div`
  width: 100vw;
  height: fit-content;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 200px auto auto auto;
`;

const ErrorTitle = styled.div`
  font-size: 2rem;
  color: #cccccc;
  margin: 20px auto;
`;

const ErrorTextArea = styled.div`
  color: black;
  resize: none;
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  padding: 16px;
  border-radius: 5px;
  margin: 20px auto;
  transition: 0.2s;
  overflow: scroll;
  border: 1px solid lightgray;
`;

export {AllErrorWrapper, ErrorWrapper, ErrorTitle, ErrorTextArea};
