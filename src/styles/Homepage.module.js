import styled, {keyframes} from "styled-components";
import {NavLink} from "react-router-dom";

const MainTitle = styled.h1`
  padding-left: 30px;
  font-size: 3rem;
  display: flex;
  align-items: flex-end;
  margin: 60px auto 20px 0;
  transition: 0.4s;
  color: gray;
  font-weight: bolder;
  cursor: default;

  :hover {
    text-shadow: -10px 10px 0px #00e6e6, -20px 20px 0px #01cccc,
      -30px 30px 0px #00bdbd;
  }
`;

const scroll = keyframes`
 100%{
    background-position:0px -3000px;
  }
`;

const BackgroundDisplay = styled.div`
  width: 100vw;
  min-height: 100vh;
  z-index: -100;
  animation: ${scroll} 120s linear infinite;

  background-color: #f9f9f9;
  background: radial-gradient(
      circle,
      transparent 20%,
      #f9f9f9 20%,
      #f9f9f9 80%,
      transparent 80%,
      transparent
    ),
    radial-gradient(
        circle,
        transparent 20%,
        #f9f9f9 20%,
        #f9f9f9 80%,
        transparent 80%,
        transparent
      )
      27.5px 27.5px,
    linear-gradient(#cdcdcd 2.2px, transparent 2.2px) 0 -1.1px,
    linear-gradient(90deg, #cdcdcd 2.2px, #f9f9f9 2.2px) -1.1px 0;
  background-size: 55px 55px, 55px 55px, 27.5px 27.5px, 27.5px 27.5px;
`;

const MainWrapper = styled.div`
  width: 1400px;
  margin: 15px auto;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
`;

const AllPinsWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: center;
  /* border: 1px solid blue; */
  height: auto;
  width: 100%;
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
  }
`;

const SaveButton = styled.button`
  color: gray;
  background-color: lightgray;
  opacity: 0.6;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: 28px;
  top: 28px;
  font-size: 1.5rem;
  transition: 0.4s;

  &:hover {
    color: white;
    background-color: coral;
    opacity: 1;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1400px;
  margin: 15px auto;
  /* border: 1px solid red; */
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  min-height: 30px;
  transition: 0.4s;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  color: gray;
  border-radius: 10px;
  font-size: 1.75rem;
  padding: 6px 33px;
  margin: 20px 10px 20px auto;
  background-color: #fcfcfc;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    outline: none;
    border: 1px solid gray;
    color: black;
  }
  :focus {
    outline: none;
    border: 1px solid gray;
    color: black;
  }
`;

const FilterTitle = styled.div`
  color: black;
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 20px 30px 10px 20px;
`;

const FitlerTagWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  height: 1.25rem;
  justify-content: center;
  margin: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: white;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  cursor: text;

  &:hover {
    background-color: black;
    box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
      0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  }
  &:focus-within {
    background-color: black;
    box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
      0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  }
`;

const FilterTagLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 1.25rem;
  transition: 0.2s;

  &:hover {
    color: white;
  }

  &:focus-within {
    color: white;
  }
`;

const ClearFitlerTagWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  height: 1.25rem;
  justify-content: center;
  margin: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  /* border: 1px solid white; */
  background-color: lightgray;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);

  &:hover {
    background-color: gray;
    box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
      0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    background-color: black;
    box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
      0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  }
`;

const ClearFilterTagLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  transition: 0.2s;

  &:hover {
    color: white;
  }
  &:focus-within {
    color: black;
  }
`;

{
  /* MainFilterWrapper is set up for display filter smoothly, but its not working now, will fix it later */
}
const MainFilterWrapper = styled.div`
  width: 1400px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: white;
  border:1px solid lightgray;
  box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
    0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  height: ${(props) => (props.$filter ? "0px" : "450px")};
`;

export {
  BackgroundDisplay,
  MainTitle,
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
  FilterWrapper,
  FilterButton,
  FilterTitle,
  FitlerTagWrapper,
  FilterTagLink,
  ClearFitlerTagWrapper,
  ClearFilterTagLink,
  MainFilterWrapper,
};
