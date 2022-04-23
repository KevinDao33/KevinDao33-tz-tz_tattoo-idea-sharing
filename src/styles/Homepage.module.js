import styled from "styled-components";

const MainWrapper = styled.div`
  width: 90vw;
  margin: 15px auto;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

const AllPinsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid blue;
  height: auto;
`;

const PinWrapper = styled.div`
  width: 325px;
  height: auto;
  border: 1px solid red;
  border-radius: 20px;
  margin: 10px;
  background-color: lightblue;
  position: relative;
`;

const PinImage = styled.img`
  width: 325px;
  border-radius: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  color: inherit;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1.5rem;
`;

export {MainWrapper, AllPinsWrapper, PinWrapper, PinImage, SaveButton};
