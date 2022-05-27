import styled from "styled-components";
import viewMore from "../icon/more.png";
import viewMoreMove from "../icon/more-gif.gif";

const StartTattooPlanWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const StartTattooPlanImageWrapper = styled.div`
  background-color: #e4e4e4;
  flex-grow: 1;
  width: calc(100% - 720px);
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StartTattooPlanImage = styled.img`
  height: 100%;
  left: 0;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StartTattooPlanDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: 100%;
  min-height: 100vh;
  position: relative;
  overflow-y: scroll;
`;

const StartTattooPlanTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin: 40px auto 0 auto;
  max-width: 100%;
  padding: 24px 16px;
  width: 432px;
`;

const StartTattooPlanTitleSpan = styled.span`
  color: rgba(32, 33, 37, 0.6);
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const StartTattooPlanMainTitle = styled.h1`
  color: #202125;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.1;
  margin: 0;
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
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
  transform: rotate(90deg);

  background: url(${viewMore});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    background: url(${viewMoreMove});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
  }
`;

const StartTattooPlanMainDataSelectorWrapper = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 16px;
  padding-top: 32px;
  width: 432px;
`;

const StartTattooPlanMainDataForm = styled.form`
  display: block;
  margin: 0;
  padding-bottom: 50px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StartTattooPlanMainDataSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 28px 0;
  width: 100%;
  height: fit-content;
`;

const StartTattooPlanMainDataSectionTitle = styled.div`
  color: #202125;
  display: block;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.33;
  margin-bottom: 16px;
`;

const BlankDiv = styled.div`
  width: 100%;
  margin: 4px 0;
`;

const TattooPlanDescriptionTextarea = styled.textarea`
  appearance: none;
  background-color: #fff;
  border: 1px solid rgba(32, 33, 37, 0.12);
  border-radius: 8px;
  color: #202125;
  display: block;
  font-size: 14px;
  font-weight: 400;
  font-weight: 500;
  line-height: 1.25;
  min-height: 50px;
  padding: 8px 18px;
  resize: none;
  width: calc(100% - 18px - 18px);
`;

const TattooPlanDescriptionTextareaCounter = styled.div`
  color: rgba(32, 33, 37, 0.6);
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  text-align: right;
  width: 100%;
`;

const TattooPlanColorTypeMainWrapper = styled.div`
  width: calc(100% - 16px);
  height: fit-content;
  padding: 10px 0 10px 16px;
  display: flex;
  border-radius: 10px;
  background-color: white;

  border: 1px solid lightgrey;
`;

const TattooPlanColorTypeTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  width: 40%;
`;

const TattooPlanColorTypeWrapper = styled.div`
  width: 55%;
  height: 38px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TattooPlanColorTypeLabel = styled.label`
  width: 50%;
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  transition: 0.4s;
  color: ${(props) => (props.$isColor ? " #f68535" : "#232323")};

  &:hover {
    color: #f68535;
    font-size: 15px;
    text-shadow: lightgray 1px 0 1px;
  }
`;

const TattooPlanColorTypeInput = styled.input`
  appearance: none;
  background-color: #fff;
  margin: auto 10px;
  font: inherit;
  color: lightgray;
  width: 1.1em;
  height: 1.1em;
  border: 0.1em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  transition: 0.2s;

  :checked {
    background-color: #f68535;
  }

  :focus {
    transform: scale(0.9);
    outline: max(1px, 0.15em) solid #f68535;
    outline-offset: max(1px, 0.15em);
  }
`;

const TattooPlanCalandarWrapper = styled.div`
  width: ${(props) => (props.$isShowCalendar ? "fit-content" : "0")};
  height: ${(props) => (props.$isShowCalendar ? "fit-content" : "0")};
  overflow: hidden;
`;

const TattooPlanTimeSectionSelectorWrapper = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto 8px auto;
  height: fit-content;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const TattooPlanTimeSectionSelectorInput = styled.input`
  display: none;
  & + label {
    cursor: pointer;
    min-width: 120px;
    &:hover {
      background: none;
      color: #1a1a1a;
    }
    &:after {
      background: #1a1a1a;
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
      width: 100%;
      z-index: -1;
    }
  }
  &.toggle-left + label {
    border-right: 0;
    &:after {
      left: 100%;
    }
  }
  &.toggle-right + label {
    &:after {
      left: -100%;
    }
  }
  &:checked + label {
    cursor: default;
    color: #fff;
    transition: color 200ms;
    &:after {
      left: 0;
    }
  }
`;

const TattooPlanTimeSectionSelectorLable = styled.label`
  border: 3px solid #1a1a1a;
  border-radius: 1px;
  display: inline-block;
  padding: 4px 38px;
  position: relative;
  text-align: center;
  transition: background 0.6s ease, color 0.6s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const StartPlanButtonWrapper = styled.div`
  width: fit-content;
  display: flex;

  position: absolute;
  right: calc((100% - 340px) / 2);
  bottom: 50px;
`;

const StartPlanButton = styled.button`
  width: 340px;
  height: 40px;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 18px;
  font-size: 1rem;
  position: relative;
  box-shadow: 0px 1px 0px #b2a98f, 0px 8px 6px rgba(0, 0, 0, 0.15),
    0px 12px 2px rgba(0, 0, 0, 0.1), 0px 20px 18px rgba(0, 0, 0, 0.1);

  &:before {
    transition: all 0.55s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 5px;
    content: "";
    width: 10%;
    height: 102%;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover {
    &::before {
      width: 100%;
      height: 100%;
    }
  }
`;

const StartPlanReferenceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: calc(100% - 7px -7px);
  height: fit-content;
  padding: 7px;

  border-radius: 10px;
  background-color: white;
  border: 1px solid lightgrey;
`;

// ======================================
const StartPlanReferenceSelector = styled.div`
  border-radius: 10px;
  border: 1px solid lightgray;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: gray;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StartPlanReferencePreview = styled.img`
  margin-right: 10px;
  border-radius: 10px;
  border: 1px solid lightgray;
  width: 72px;
  height: 72px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const DisplayAllPinOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const DisplayAllPinOverlay2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
  z-index: 20;
`;

const DisplayAllPinWrapper = styled.div`
  width: 45vw;
  height: 50vh;
  background-color: snow;
  border-radius: 10px;
  position: fixed;
  z-index: 25;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
`;

const SelectReferencePinTitle = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 25px auto 10px 25px;
`;

const SelectReferencePinWrapper = styled.div`
  width: 90%;
  height: calc(100% - 120px);
  margin: auto;
  padding: 15px;
  overflow-y: scroll;
`;

const PinImage = styled.img`
  cursor: pointer;
  margin: 5px;
  width: 180px;
  border-radius: 10px;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
  }
`;

const StartPlanButtonSpan = styled.span`
  color: white;
  mix-blend-mode: difference;
`;

export {
  StartTattooPlanWrapper,
  StartTattooPlanImageWrapper,
  StartTattooPlanImage,
  StartTattooPlanDataWrapper,
  StartTattooPlanTitleWrapper,
  StartTattooPlanTitleSpan,
  StartTattooPlanMainTitle,
  BackButton,
  StartTattooPlanMainDataSelectorWrapper,
  StartTattooPlanMainDataForm,
  StartTattooPlanMainDataSectionWrapper,
  StartTattooPlanMainDataSectionTitle,
  BlankDiv,
  TattooPlanDescriptionTextarea,
  TattooPlanDescriptionTextareaCounter,
  TattooPlanColorTypeMainWrapper,
  TattooPlanColorTypeTitle,
  TattooPlanColorTypeWrapper,
  TattooPlanColorTypeLabel,
  TattooPlanColorTypeInput,
  TattooPlanCalandarWrapper,
  TattooPlanTimeSectionSelectorWrapper,
  TattooPlanTimeSectionSelectorInput,
  TattooPlanTimeSectionSelectorLable,
  StartPlanButtonWrapper,
  StartPlanButton,
  StartPlanButtonSpan,
  StartPlanReferenceWrapper,
  StartPlanReferenceSelector,
  StartPlanReferencePreview,
  DisplayAllPinOverlay,
  DisplayAllPinWrapper,
  CloseButton,
  DisplayAllPinOverlay2,
  SelectReferencePinTitle,
  SelectReferencePinWrapper,
  PinImage,
};
