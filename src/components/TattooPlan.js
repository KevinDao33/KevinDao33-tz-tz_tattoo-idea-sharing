import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import api from "../util/api";

import {
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
} from "../styles/TattooPlan.module";

function TattooPlan({uid}) {
  const [plans, setPlans] = useState([]);
  const [isShowFull, setIsShowFull] = useState(-1);

  const redirect = useNavigate();

  useEffect(() => {
    api.getPlans(setPlans);
  }, []);

  const handleSignUp = async (plan) => {
    await api.signUp4TattooPlan(uid, plan);
    Swal.fire("Sign up successfully!", "You're the tattoo master!", "success");
    setIsShowFull(-1);
  };

  return (
    <TattooPlanWrapper>
      <TattooPlanTitle>- Tattoo Plans -</TattooPlanTitle>
      <StartPlanButtonWrapper>
        <StartPlanButton
          onClick={() => {
            uid ? redirect("/start-tattoo-plan") : redirect("/profile");
          }}>
          <StartPlanButtonSpan>Start a plan</StartPlanButtonSpan>
        </StartPlanButton>
      </StartPlanButtonWrapper>
      <AllTattooPlanCardWrapper>
        {plans.length > 0 &&
          plans.map((plan, index) => {
            return (
              <FullTattooPlanCardWrapper key={plan.planId}>
                <TattooPlanCardWrapper
                  onClick={() => {
                    setIsShowFull(index);
                  }}>
                  <TattooPlanCardImg src={plan.reference.pinImage} />
                  <TattooPlanCardUser>
                    <TattooPlanCardUserPic src={plan.planOwner.ownerPic} />
                    <TattooPlanCardUserInfoWrapper>
                      <TattooPlanCardUserName>
                        {plan.planOwner.ownerName}
                      </TattooPlanCardUserName>
                      <TattooPlanCardUserMail>
                        {plan.planOwner.ownerMail}
                      </TattooPlanCardUserMail>
                    </TattooPlanCardUserInfoWrapper>
                  </TattooPlanCardUser>
                  <TattooPlanCardBriefDataMainWrapper>
                    <TattooPlanCardBriefDataWrapper>
                      <TattooPlanCardBriefDataCity>
                        {plan.city}
                      </TattooPlanCardBriefDataCity>
                      <TattooPlanCardBriefDataBudget>
                        {plan.budget}
                      </TattooPlanCardBriefDataBudget>
                    </TattooPlanCardBriefDataWrapper>
                  </TattooPlanCardBriefDataMainWrapper>
                </TattooPlanCardWrapper>
                <TattooPlanCardDetailDataMainWrapper
                  $showAll={isShowFull === index}>
                  <CloseButton
                    onClick={() => {
                      setIsShowFull(() => -1);
                    }}>
                    x
                  </CloseButton>
                  <TattooPlanCardDetailDataTitle>
                    Plan Detail
                  </TattooPlanCardDetailDataTitle>
                  <TattooPlanCardDetailDataPlacement>
                    {`・${plan.placement}`}
                  </TattooPlanCardDetailDataPlacement>
                  <TattooPlanCardDetailDataSize>
                    {`・${plan.size}`}
                  </TattooPlanCardDetailDataSize>
                  <TattooPlanCardDetailDataColor>
                    {plan.isColor ? `・Colored` : `・No color`}
                  </TattooPlanCardDetailDataColor>
                  <TattooPlanCardDetailDataDate>
                    {plan.date.length === 2
                      ? `・${new Date(
                          plan.date[0] * 1000
                        ).getMonth()}/${new Date(
                          plan.date[0] * 1000
                        ).getDate()} - ${new Date(
                          plan.date[1] * 1000
                        ).getMonth()}/${new Date(
                          plan.date[1] * 1000
                        ).getDate()}`
                      : new Date(plan.date[0]) === new Date(-2209017600000)
                      ? "Anytime"
                      : `・${new Date(
                          plan.date[0] * 1000
                        ).getMonth()}/${new Date(
                          plan.date[0] * 1000
                        ).getDate()}`}
                  </TattooPlanCardDetailDataDate>
                  <TattooPlanCardDetailDataDescription>
                    {`${plan.description}`}
                  </TattooPlanCardDetailDataDescription>
                  <SignUpPlanButtonWrapper>
                    <SignUpPlanButton
                      onClick={() => {
                        handleSignUp(plan);
                      }}>
                      <SignUpPlanButtonSpan>I can do it</SignUpPlanButtonSpan>
                    </SignUpPlanButton>
                  </SignUpPlanButtonWrapper>
                </TattooPlanCardDetailDataMainWrapper>
              </FullTattooPlanCardWrapper>
            );
          })}
      </AllTattooPlanCardWrapper>
    </TattooPlanWrapper>
  );
}

TattooPlan.propTypes = {
  uid: PropTypes.string,
};

export default TattooPlan;
