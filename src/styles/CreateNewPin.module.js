import styled from "styled-components";

const CreateNewPinWrapper = styled.div`
  /* background-color: lightgray; */
  width: 1250px;
  min-height: 75vh;
  display: flex;
  border-radius: 20px;
  margin: 35px auto;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
`;

const PinDataUploadWrapper = styled.div`
  position: relative;
  width: 50%;
  border: 1px solid green;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  /* padding-top: 50px; */
`;

const PinImageUploadWrapper = styled.div`
  width: 50%;
  /* height: 100%; */
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
  margin: 10px 0;
`;

const NewPinDataInput = styled.input`
  width: 50%;
  min-width: 90px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 20px;
  background-color: #7e7e7e;
  color: white;
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
  color: white;
  background-color: gray;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
  bottom: 20px;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    /* transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px; */
    transform: scale(0.97);
    background-color: purple;
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
  border-bottom: 1.5px solid #e3e0e0;
  background-color: white;
  padding-left: 20px;
  cursor: copy;
  margin: 20px auto 0 auto;
  color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
  position: relative;

  &:hover {
    color: lightgreen;
  }
`;

const UploadNewPinImageInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 90%;
  min-width: 250px;
  border-radius: 30px;
  border: none;
  margin: 20px auto 0 auto;
  font-size: 1.5rem;
  position: absolute;
  top: 0;
`;

const PlacementTitle = styled.label`
  width: 33%;
  font-size: 1.5rem;
  margin: 20px auto 20px 20px;
`;

const PinTypeWrapper = styled.div`
  width: 363px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PinTypeLabel = styled.label`
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.1;
  display: flex;
  margin: auto 20px auto 0;
  transition: 0.4s;
  /* grid-template-columns: 1em auto;
  gap: 0.5em; */

  &:hover {
    color: purple;
    font-size: 1.5rem;
    text-shadow: rgb(219, 119, 219) 1px 0 10px;
  }

  /* :focus-within {
    color: purple;
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
    box-shadow: inset 1em 1em purple;
  }

  :checked::before {
    transform: scale(1);
  }

  :focus {
    outline: max(1px, 0.15em) solid purple;
    outline-offset: max(1px, 0.15em);
  }
`;

export {
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
