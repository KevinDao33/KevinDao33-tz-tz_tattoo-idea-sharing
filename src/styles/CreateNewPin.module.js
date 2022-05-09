import styled, {keyframes} from "styled-components";

const scroll = keyframes`
 100%{
    background-position: -3000px 1500px;
  }
`;

const DarkBackgroundDisplay = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  z-index: -100;
  animation: ${scroll} 120s linear infinite;
  padding: 90px 0 0 0;

  background-color: #f9f9f9;
  opacity: 1;
  background-image: repeating-linear-gradient(
      45deg,
      #ececec 25%,
      transparent 25%,
      transparent 75%,
      #ececec 75%,
      #ececec
    ),
    repeating-linear-gradient(
      45deg,
      #ececec 25%,
      #f9f9f9 25%,
      #f9f9f9 75%,
      #ececec 75%,
      #ececec
    );
  background-position: 0 0, 29px 29px;
  background-size: 58px 58px;
`;

const CreateNewPinWrapper = styled.div`
  width: 1250px;
  min-height: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  backdrop-filter: blur(8px) invert(85%);

  @-moz-document url-prefix() {
    div {
      background-color: white;
      color: black;
    }
    label {
      color: black;
    }
  }
`;

const PinDataUploadWrapper = styled.div`
  position: relative;
  width: 50%;
  /* border: 1px solid green; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  /* padding-top: 50px; */
  @-moz-document url-prefix() {
    div {
      border-radius: 0 20px 20px 0;
    }
  }
`;

const PinImageUploadWrapper = styled.div`
  width: 50%;
  position: relative;
  padding: 0 0 80px 0;
  /* height: 100%; */
  /* border-right: 4px dashed lightgray; */
  /* box-shadow: rgba(0, 0, 0, 0.3) 0 0 38px; */
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const NewPinDataWrapper = styled.div`
  width: 100%;
  /* border: 1px solid blue; */
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 0 0;
`;

const NewPinDataInput = styled.input`
  width: 50%;
  min-width: 90px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 20px;
  background-color: snow;
  /* color: white; */
  padding-left: 20px;
  cursor: text;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
  transition: 0.4s;

  :focus {
    outline: none;
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const CreatePinButton = styled.button`
  position: absolute;
  bottom: 20px;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    transform: scale(0.97);
    background-color: #f68535;
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const UploadNewPinImageLabel = styled.label`
  width: 90%;
  min-height: 300px;
  min-width: 300px;
  height: 80%;
  border-radius: 30px;
  border: none;
  /* border-bottom: 1.5px solid #e3e0e0; */
  /* background-color: white; */
  padding-left: 20px;
  cursor: copy;
  margin: 20px auto 0 auto;
  color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  /* -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2)); */
  /* filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2)); */
  font-size: 1.5rem;
  position: relative;

  &:hover {
    color: lightgreen;
  }
`;

const UploadNewPinImageInput = styled.input`
  display: none;
`;

const breath = keyframes`
  0% {
    box-shadow: 20px 28px 24px -25px snow;
  }
  33% {
    box-shadow: 30px 38px 34px -31px gray;
  }
  100% {
    box-shadow: 20px 28px 24px -25px snow;
  }
`;

const PreviewImage = styled.img`
  width: 90%;
  /* min-width: 250px; */
  max-height: 730px;
  border-radius: 30px;
  border: none;
  margin: 50px auto auto auto;
  font-size: 1.5rem;
  position: absolute;
  top: 0;
  /* box-shadow: 20px 28px 24px -20px snow; */
  transition: 0.8s;
  animation: ${breath} 2.5s ease-in-out infinite;
`;

const PlacementTitle = styled.label`
  width: 33%;
  font-size: 1.6rem;
  margin: 20px auto 20px 20px;
  color: snow;
`;

const PinTypeWrapper = styled.div`
  width: 363px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PinTypeLabel = styled.label`
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.1;
  display: flex;
  margin: auto 20px auto 0;
  transition: 0.4s;
  color: snow;
  /* grid-template-columns: 1em auto;
  gap: 0.5em; */

  &:hover {
    color: #f68535;
    font-size: 1.5rem;
    text-shadow: lightgray 1px 0 1px;
  }

  /* :focus-within {
    color: #f68535;
  } */
`;

const PinTypeInput = styled.input`
  appearance: none;
  background-color: #fff;
  margin: auto 15px;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;

  ::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 0.2s transform ease-in-out;
    box-shadow: inset 1em 1em #f68535;
  }

  :checked::before {
    transform: scale(1);
  }

  :focus {
    outline: max(1px, 0.15em) solid #f68535;
    outline-offset: max(1px, 0.15em);
  }
`;

export {
  DarkBackgroundDisplay,
  CreateNewPinWrapper,
  PinDataUploadWrapper,
  NewPinDataWrapper,
  PinImageUploadWrapper,
  NewPinDataInput,
  CreatePinButton,
  UploadNewPinImageLabel,
  UploadNewPinImageInput,
  PreviewImage,
  PlacementTitle,
  PinTypeWrapper,
  PinTypeLabel,
  PinTypeInput,
};
