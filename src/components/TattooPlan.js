import React, {useState, useEffect} from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

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

function TattooPlan({db, uid}) {
  const [plans, setPlans] = useState([]);
  // const [userData, setUserData] = useState([]);
  const [isShowFull, setIsShowFull] = useState(-1);

  const redirect = useNavigate();

  const getPlans = async () => {
    try {
      const notesSnapshot = await getDocs(collection(db, "plan"));
      const plans = notesSnapshot.docs.map((doc) => doc.data());
      setPlans(plans);

      return plans;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleSignUp = async (plan) => {
    const allPlanRef = doc(db, "plan", plan.planId);
    const ownerPlanRef = doc(
      db,
      "user",
      plan.planOwner.ownerId,
      "plan",
      plan.planId
    );
    await updateDoc(allPlanRef, {
      artists: arrayUnion(uid),
    });
    await updateDoc(ownerPlanRef, {
      artists: arrayUnion(uid),
    });

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
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default TattooPlan;
