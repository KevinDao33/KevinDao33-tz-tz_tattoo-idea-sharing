/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

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

function TattooPlan(props) {
  const [plans, setPlans] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isShowFull, setIsShowFull] = useState(-1);

  const redirect = useNavigate();

  const getuserData = async () => {
    if (!props.uid) {
      return;
    }
    const userSnapshot = await getDoc(doc(props.db, "user", props.uid));
    setUserData(userSnapshot.data());

    return;
  };

  useEffect(() => {
    props.uid && getuserData();
  }, [props.uid]);

  const getPlans = async () => {
    try {
      const notesSnapshot = await getDocs(collection(props.db, "plan"));
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
    console.log(plan);

    const allPlanRef = doc(props.db, "plan", plan.planId);
    const ownerPlanRef = doc(
      props.db,
      "user",
      plan.planOwner.ownerId,
      "plan",
      plan.planId
    );
    await updateDoc(allPlanRef, {
      // artists: [props.uid],
      artists: arrayUnion(props.uid),
    });
    await updateDoc(ownerPlanRef, {
      // artists: [props.uid],
      artists: arrayUnion(props.uid),
    });

    // alert("Sign up successfully!");
    Swal.fire("Sign up successfully!", "You're the tattoo master!", "success");
    setIsShowFull(-1);
  };

  return (
    <TattooPlanWrapper>
      <TattooPlanTitle>- Tattoo Plans -</TattooPlanTitle>
      <StartPlanButtonWrapper>
        <StartPlanButton
          onClick={() => {
            props.uid ? redirect("/start-tattoo-plan") : redirect("/profile");
          }}>
          <StartPlanButtonSpan>Start a plan</StartPlanButtonSpan>
        </StartPlanButton>
      </StartPlanButtonWrapper>

      <AllTattooPlanCardWrapper>
        {/* ======================================= */}

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
                {/* ===================================== */}

                <TattooPlanCardDetailDataMainWrapper
                  $showAll={isShowFull === index}>
                  <CloseButton
                    onClick={() => {
                      setIsShowFull((prev) => -1);
                    }}>
                    x
                  </CloseButton>
                  <TattooPlanCardDetailDataTitle>
                    Plan Detail
                  </TattooPlanCardDetailDataTitle>
                  <TattooPlanCardDetailDataPlacement>
                    {/* ・Back-lower */}
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

export default TattooPlan;
