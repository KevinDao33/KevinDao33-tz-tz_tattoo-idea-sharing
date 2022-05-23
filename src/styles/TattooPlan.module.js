import styled from "styled-components";

const TattooPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 120px;
  position: relative;
`;

const TattooPlanTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  margin: 40px auto 0 auto;
  padding: 24px 16px;
  color: #202125;
  font-weight: 600;
  line-height: 1.1;
`;

const AllTattooPlanCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  height: fit-content;
  min-height: 50vh;
  position: relative;
  overflow-y: scroll;
  padding: 30px 20px;
  gap: 30px;
`;

const FullTattooPlanCardWrapper = styled.div`
  background-color: #f7f7f7;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%), 0 0 1px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: row;
  transition: 0.3s;
  width: fit-content;
  height: 340px;
  padding: 0;
  overflow: hidden;
  cursor: default;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const TattooPlanCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  height: 340px;
  padding: 0;
  cursor: pointer;
`;

const TattooPlanCardImg = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 16px 16px 3px 3px;
  object-fit: cover;
`;

const TattooPlanCardUser = styled.div`
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%), 0 0 1px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0.4, 1);
  width: calc(100% - 32px);
  height: 40px;
`;

const TattooPlanCardUserPic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 0.5px solid lightgray;
`;

const TattooPlanCardUserInfoWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TattooPlanCardUserName = styled.div`
  display: block;
  font-size: 16px;
  font-weight: 700;
  height: 1.18em;
  line-height: 1.18em;
  overflow: hidden;
  margin: auto auto 2px 12px;
`;

const TattooPlanCardUserMail = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 1.3em;
  line-height: 1.3;
  margin: 0 auto 0 12px;
  opacity: 0.6;
`;

const TattooPlanCardBriefDataMainWrapper = styled.div`
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%), 0 0 1px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0.4, 1);
  width: calc(100% - 32px);
  height: 52px;
  border-radius: 0 0 16px 16px;
`;

const TattooPlanCardBriefDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TattooPlanCardBriefDataCity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 550;
  width: fit-content;
  height: fit-content;
  margin: auto 0;
`;

const TattooPlanCardBriefDataBudget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.8;
  width: fit-content;
  height: fit-content;
  margin: auto 0;
`;

const TattooPlanCardDetailDataMainWrapper = styled.div`
  position: relative;
  background-color: #f7f7f7;
  padding: ${(props) => (props.$showAll ? "16px" : "0")};
  opacity: ${(props) => (props.$showAll ? "1" : "0")};
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  transition: 0.4s;

  width: ${(props) => (props.$showAll ? "180px" : "0")};
  height: calc(100% - 32px);
  border-radius: 0 16px 16px 0;
`;

const TattooPlanCardDetailDataTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 550;
  margin: 0 auto 7px auto;
  border-bottom: 2px dashed gray;
  padding: 0 16px;
`;

const TattooPlanCardDetailDataPlacement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.8;
  font-size: 16px;
  font-weight: 400;
  margin: 0 auto 0 5px;
`;

const TattooPlanCardDetailDataSize = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.8;
  font-size: 16px;
  font-weight: 400;
  margin: 0 auto 0 5px;
`;

const TattooPlanCardDetailDataColor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.8;
  font-size: 16px;
  font-weight: 400;
  margin: 0 auto 0 5px;
`;

const TattooPlanCardDetailDataDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.8;
  font-size: 16px;
  font-weight: 400;
  margin: 0 auto 0 5px;
`;

const TattooPlanCardDetailDataDescription = styled.div`
  margin: 0 auto 0 0px;

  appearance: none;
  background-color: #fff;
  border: 1px solid rgba(32, 33, 37, 0.12);
  border-radius: 8px;
  color: #202125;
  display: block;
  font-size: 13px;
  font-weight: 400;
  font-weight: 500;
  line-height: 1.25;
  height: 80px;
  padding: 8px 18px;
  resize: none;
  overflow: scroll;
  cursor: text;
  width: calc(100% - 16px - 16px - 5px);
`;

const SignUpPlanButtonWrapper = styled.div`
  width: calc(100% - 32px);
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 15px;
`;

const SignUpPlanButton = styled.button`
  width: 100%;
  height: 25px;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  position: relative;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

const SignUpPlanButtonSpan = styled.span`
  color: white;
  mix-blend-mode: difference;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  opacity: 0.8;
`;

const StartPlanButtonWrapper = styled.div`
  width: 120px;
  display: flex;
  position: absolute;
  right: calc(21%);
  top: 65px;

  @media (max-width: 1075px) {
    right: 5%;
  }
  @media (max-width: 630px) {
    top: 100px;
    right: 40%;
  }
`;

const StartPlanButton = styled.button`
  width: 100%;
  height: 40px;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  position: relative;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  @media (max-width: 630px) {
    height: 30px;
  }
`;

const StartPlanButtonSpan = styled.span`
  color: white;
  mix-blend-mode: difference;
`;

export {
  TattooPlanWrapper,
  TattooPlanTitle,
  AllTattooPlanCardWrapper,
  FullTattooPlanCardWrapper,
  TattooPlanCardWrapper,
  TattooPlanCardImg,
  TattooPlanCardUser,
  TattooPlanCardUserPic,
  TattooPlanCardUserInfoWrapper,
  TattooPlanCardUserName,
  TattooPlanCardUserMail,
  TattooPlanCardBriefDataMainWrapper,
  TattooPlanCardBriefDataWrapper,
  TattooPlanCardBriefDataCity,
  TattooPlanCardBriefDataBudget,
  TattooPlanCardDetailDataMainWrapper,
  TattooPlanCardDetailDataTitle,
  TattooPlanCardDetailDataPlacement,
  TattooPlanCardDetailDataSize,
  TattooPlanCardDetailDataColor,
  TattooPlanCardDetailDataDate,
  TattooPlanCardDetailDataDescription,
  SignUpPlanButtonWrapper,
  SignUpPlanButton,
  SignUpPlanButtonSpan,
  CloseButton,
  StartPlanButtonWrapper,
  StartPlanButton,
  StartPlanButtonSpan,
};
