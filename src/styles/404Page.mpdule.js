import styled from "styled-components";

const AllErrorWrapper = styled.div`
  background: #000;
  color: snow;
  font: 1em Dosis, sans-serif;
  height: 100vh;
  line-height: 1.5;
  perspective: 40em;
`;

const ErrorWrapper = styled.div`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ErrorText = styled.div`
  color: black;
`;

export {AllErrorWrapper, ErrorWrapper, ErrorText};
