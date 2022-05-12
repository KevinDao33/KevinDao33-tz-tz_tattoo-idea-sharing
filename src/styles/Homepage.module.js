import styled, {keyframes} from "styled-components";
import {NavLink} from "react-router-dom";
import link from "../icon/link.png";

const MainTitle = styled.h1`
  padding-left: 10px;
  font-size: 4rem;
  display: flex;
  align-items: flex-end;
  margin: 80px 20px 15px 0;
  transition: 0.4s;
  color: black;
  font-weight: bolder;
  cursor: default;

  :hover {
    color: rgb(242, 242, 242);
    text-shadow: -5px 5px 0px rgba(204, 104, 35, 255), -10px 10px 0px #db9565,
      -15px 15px 0px #e6b491;
  }

  @media (max-width: 1730px) {
    font-size: 3.5rem;
  }
  @media (max-width: 1185px) {
    font-size: 3rem;
    margin: 40px 10px 15px 0;
  }
  @media (max-width: 1030px) {
    font-size: 2.25rem;
    margin: auto 10px 20px 0;
  }
  @media (max-width: 850px) {
    font-size: 2rem;
    margin: auto 10px 20px 0;
  }
  @media (max-width: 525px) {
    font-size: 1.75rem;
  }
  @media (max-width: 450px) {
    font-size: 1.5rem;
    margin: auto 20px 10px 0;
  }
  @media (max-width: 411px) {
    font-size: 1.75rem;
    margin: auto 10px 10px 0;
  }
  @media (max-width: 342px) {
    font-size: 1.5rem;
    margin: auto 10px 10px 0;
  }
`;

const ShowFilterKeyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85px;
`;

const ShowFilterKey = styled.h3`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5px auto 5px 0;
  /* margin: 80px auto 15px 0; */
  /* transition: 0.4s; */
  color: gray;
  font-weight: bolder;
  cursor: default;

  @media (max-width: 1730px) {
    font-size: 1.5rem;
  }
  @media (max-width: 1185px) {
    font-size: 1.25rem;
  }
  @media (max-width: 1030px) {
    font-size: 1rem;
    margin: 5px auto 0px 0;
  }
  @media (max-width: 750px) {
    display: none;
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
  /* width: 1400px; */
  /* width: fit-content; */
  width: 90%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  overflow: scroll;

  /* border: 1px solid orange; */
`;

const AllPinsWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: center;
  height: auto;

  //seem useless since its parent's width is fit-content
  width: 100%;
  // to prevent
  /* min-height: 100vh; */
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
  width: 260px;
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

  /* border: 1px solid blue; */
  @media (max-width: 630px) {
    width: 100%;
    margin: 3px;
  }
`;

const PinTagIntroduction = styled.div`
  padding: 20px 5px;
  width: 250px;
  border-radius: 10px;
  cursor: default;
  background-color: black;
  color: white;
  margin: 15px;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);

  @media (max-width: 630px) {
    width: 97%;
    margin: 3px;
    padding: 10px 3px;
  }
  /* 
  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
  } */
`;

const PinTagIntroductionTitle = styled.h1`
  margin: 0px auto 20px 20px;
  color: white;
  font-size: 1.75rem;
`;

const PinTagIntroductionContext = styled.p`
  margin: 0 20px 0 20px;
  line-height: 2rem;
  font-size: 1.2rem;
  color: white;

  @media (max-width: 630px) {
    margin: 0 10px 0 10px;
    line-height: 1.5rem;
    font-size: 1rem;
  }
`;

const SaveButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(255, 84, 84);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: ${(props) => (props.$like ? "28px" : "-30px")};
  opacity: ${(props) => (props.$like ? 1 : 0)};
  top: 15px;
  font-size: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const Heart = styled.div`
  display: inline-block;
  width: 26px;
  aspect-ratio: 1;
  border-image: radial-gradient(white 69%, #0000 70%) 84.5% fill/100%;
  clip-path: polygon(-41% 0, 50% 91%, 141% 0);
`;

const LinkButton = styled.button`
  width: 40px;
  height: 40px;
  /* background-color: lightgray; */
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: ${(props) => (props.$link ? "28px" : "-30px")};
  opacity: ${(props) => (props.$link ? 1 : 0)};
  top: 75px;
  font-size: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  transition: all 0.65s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background: url(${link}) white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
`;

const FilterTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //RWD width should be %
  /* width: 1400px; */
  width: 90%;
  margin: 15px auto;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  min-height: 30px;
  transition: 0.4s;
  height: fit-content;

  /* border: 1px solid red; */

  @media (max-width: 450px) {
    min-height: 10px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //RWD width should be %
  /* width: 1400px; */
  width: 98%;
  margin: auto;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  min-height: 30px;
  transition: 0.4s;
  height: fit-content;

  /* border: 1px solid coral; */
`;

const FilterButton = styled.button`
  margin: 20px 10px 20px auto;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 33px;
  font-size: 2rem;
  position: relative;
  box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
    0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  transition: all 0.65s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:before {
    transition: all 0.65s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 5px;
    content: "";
    width: 50%;
    height: 100%;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover {
    &::before {
      width: 100%;
    }
  }

  @media (max-width: 1730px) {
    padding: 8px 23px;
    font-size: 1.75rem;
  }

  @media (max-width: 1185px) {
    padding: 6px 20px;
    font-size: 1.55rem;
  }

  @media (max-width: 525px) {
    padding: 3px 15px;
    font-size: 1.25rem;
  }

  @media (max-width: 450px) {
    padding: 3px 15px;
    font-size: 1.25rem;
    margin: auto 10px 10px 10px;
  }
`;

const FilterButtonSpan = styled.span`
  color: white;
  mix-blend-mode: difference;
`;

const FilterTitle = styled.div`
  color: black;
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 20px 30px 10px 20px;
  transition: 0.4s;

  @media (max-width: 525px) {
    font-size: 1.25rem;
  }
`;

const FitlerTagWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  height: 1.25rem;
  justify-content: center;
  margin: 15px 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: white;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;

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

  @media (max-width: 1730px) {
    margin: 12px 7px;
  }
  @media (max-width: 1185px) {
    margin: 10px 7px;
    padding: 6px 8px;
  }
  @media (max-width: 1008px) {
    padding: 4px 6px;
    margin: 8px 7px;
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
  @media (max-width: 1185px) {
    font-size: 1.15rem;
  }

  @media (max-width: 1008px) {
    font-size: 1rem;
  }
`;

const ClearFitlerTagWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  height: 1.25rem;
  justify-content: center;
  margin: 10px 10px 10px 0;
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
  @media (max-width: 1730px) {
    margin: 12px 7px;
  }
  @media (max-width: 1185px) {
    margin: 10px 7px;
    padding: 6px 8px;
  }
  @media (max-width: 1008px) {
    padding: 4px 6px;
    margin: 8px 7px;
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
  @media (max-width: 1185px) {
    font-size: 1.15rem;
  }

  @media (max-width: 1008px) {
    font-size: 1rem;
  }
`;

const MainFilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* width: 1380px; */
  width: 88%;
  margin: 10px auto 30px auto;
  border-radius: 10px;
  background-color: white;
  border: 1px solid lightgray;
  box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
    0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  height: ${(props) => (props.$filter ? "500px" : "0px")};

  @media (max-width: 1665px) {
    height: ${(props) => (props.$filter ? "550px" : "0px")};
  }
  @media (max-width: 1530px) {
    height: ${(props) => (props.$filter ? "600px" : "0px")};
  }
  @media (max-width: 1255px) {
    height: ${(props) => (props.$filter ? "650px" : "0px")};
  }
  @media (max-width: 1185px) {
    height: ${(props) => (props.$filter ? "700px" : "0px")};
  }
  @media (max-width: 1008px) {
    height: ${(props) => (props.$filter ? "550px" : "0px")};
  }
  @media (max-width: 980px) {
    height: ${(props) => (props.$filter ? "600px" : "0px")};
  }
  @media (max-width: 773px) {
    height: ${(props) => (props.$filter ? "650px" : "0px")};
  }
  @media (max-width: 631px) {
    height: ${(props) => (props.$filter ? "750px" : "0px")};
  }
  @media (max-width: 568px) {
    height: ${(props) => (props.$filter ? "850px" : "0px")};
  }
  @media (max-width: 512px) {
    height: ${(props) => (props.$filter ? "900px" : "0px")};
  }
  @media (max-width: 462px) {
    height: ${(props) => (props.$filter ? "fit-content" : "0px")};
  }
`;

const HoverPinName = styled.div`
  display: flex;
  width: calc(260px - 10px + 2px);
  height: ${(props) => (props.$name ? "40px" : "0px")};
  transform: scale(${(props) => (props.$name ? 1.1 : 1)});
  align-items: flex-end;
  padding: ${(props) => (props.$name ? "0 0 10px 10px" : "0px")};
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  bottom: ${(props) => (props.$name ? "2px" : "21px")};
  left: 15px;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
  transition: 0.2s ease-in-out;
  background-image: linear-gradient(
    to top,
    rgb(65, 65, 65, 0.8),
    rgb(106, 106, 106, 0)
  );
  text-shadow: 0.25px 0.25px rgba(220, 220, 220, 0.8),
    0.5px 0.5px rgba(220, 220, 220, 0.8), 0.75px 0.75px rgba(220, 220, 220, 0.8),
    1px 1px rgba(220, 220, 220, 0.8), 1.25px 1.25px rgba(220, 220, 220, 0.8);
`;

const FooterBlank = styled.div`
  width: 100vw;
  height: 50px;
  /* border: 1px solid rebeccapurple; */
`;

export {
  BackgroundDisplay,
  MainTitle,
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
  FilterTitleWrapper,
  FilterWrapper,
  FilterButton,
  FilterButtonSpan,
  FilterTitle,
  ShowFilterKeyWrapper,
  ShowFilterKey,
  FitlerTagWrapper,
  FilterTagLink,
  ClearFitlerTagWrapper,
  ClearFilterTagLink,
  MainFilterWrapper,
  Heart,
  HoverPinName,
  LinkButton,
  PinTagIntroduction,
  PinTagIntroductionTitle,
  PinTagIntroductionContext,
  FooterBlank,
};
