/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import Select from "react-select";
import Calendar from "react-calendar";
import {placementsOptions, sizeOptions, budgetOption, cities} from "../const";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

import {
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
} from "../styles/StartTattooPlan.module";
import Profile from "./Profile";

function StartTattooPlan(props) {
  const [selectedPlacement, setSelectedPlacement] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isColor, setIsColor] = useState(true);
  const [planDescription, setPlanDescription] = useState("");
  const [planBudget, setPlanBudget] = useState("");
  const [planDate, setPlanDate] = useState(new Date());
  const [isShowCalandar, setIsShowCalandar] = useState(true);
  const [isShowAllPins, setIsShowAllPins] = useState(false);
  const [collectionPins, setCollectionPins] = useState([]);
  const [selectedReference, setSelectedReference] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [userData, setUserData] = useState([]);

  const redirect = useNavigate();

  const breakpointColumnsObj = {
    default: 3,
  };

  const getuserData = async () => {
    if (!props.uid) {
      return;
    }
    const userSnapshot = await getDoc(doc(props.db, "user", props.uid));
    setUserData(userSnapshot.data());

    return;
  };

  useEffect(() => {
    getuserData();
  }, [props.uid]);

  const getCollectionPins = async (id) => {
    const querySnapshot = await getDocs(
      collection(props.db, `user/${id}`, "collection")
    );

    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push(...doc.data().pins);
    });

    setCollectionPins(myCollections);

    return;
  };

  useEffect(() => {
    props.uid && getCollectionPins(props.uid);
  }, [props.uid]);

  const handleStartPlan = async () => {
    if (
      !selectedReference ||
      !planDate ||
      !planBudget ||
      !planDescription ||
      !selectedSize ||
      !selectedPlacement ||
      !selectedCity
    ) {
      // alert("Please make sure all fields are filled");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure all fields are filled :(",
        // footer: '<a href="">Why do I have this issue?</a>'
      });

      return;
    }
    console.log("we good to upload");

    const allNewPlanRef = collection(props.db, "plan");
    const newPlanRef = doc(allNewPlanRef);
    const userNewPlanRef = doc(
      props.db,
      "user",
      props.uid,
      "plan",
      newPlanRef.id
    );

    await setDoc(newPlanRef, {
      reference: selectedReference,
      date: planDate,
      budget: planBudget.value,
      description: planDescription,
      isColor: isColor,
      size: selectedSize.value,
      placement: selectedPlacement.value,
      city: selectedCity.value,
      planId: newPlanRef.id,
      planOwner: {
        ownerId: userData.uid,
        ownerName: userData.name,
        ownerPic: userData.pic,
        ownerMail: userData.email,
      },
    });

    await setDoc(userNewPlanRef, {
      reference: selectedReference,
      date: planDate,
      budget: planBudget.value,
      description: planDescription,
      isColor: isColor,
      size: selectedSize.value,
      placement: selectedPlacement.value,
      city: selectedCity.value,
      planId: newPlanRef.id,
    });

    // alert(`Plan created!`);
    await Swal.fire(
      `Plan created!`,
      'sooooooo~ excited about your new tattoo',
      'success'
    )
    redirect("/profile");
  };

  return (
    <>
      {props.uid ? (
        <StartTattooPlanWrapper>
          {/* ====================================================== */}

          {isShowAllPins && (
            <DisplayAllPinOverlay>
              <DisplayAllPinOverlay2></DisplayAllPinOverlay2>
              <DisplayAllPinWrapper>
                <CloseButton onClick={() => setIsShowAllPins(false)}>
                  x
                </CloseButton>
                <SelectReferencePinTitle>
                  Select a pin as reference
                </SelectReferencePinTitle>
                <SelectReferencePinWrapper>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className='my-masonry-grid'
                    columnClassName='my-masonry-grid_column'>
                    {collectionPins.length > 0 &&
                      collectionPins.map((pin, index) => (
                        <PinImage
                          key={index}
                          src={pin.pinImage}
                          onClick={() => {
                            setSelectedReference(pin);
                            setIsShowAllPins(false);
                          }}></PinImage>
                      ))}
                  </Masonry>
                  {/* <PinImage></PinImage> */}
                </SelectReferencePinWrapper>
              </DisplayAllPinWrapper>
            </DisplayAllPinOverlay>
          )}

          {/* ====================================================== */}

          <StartTattooPlanDataWrapper>
            <StartTattooPlanTitleWrapper>
              <StartTattooPlanTitleSpan>
                Start your plan
              </StartTattooPlanTitleSpan>
              <StartTattooPlanMainTitle>
                Describe your tattoo
              </StartTattooPlanMainTitle>
            </StartTattooPlanTitleWrapper>
            {/* ====================================================== */}
            <StartTattooPlanMainDataSelectorWrapper>
              <BackButton
                onClick={() => {
                  redirect("/");
                }}
              />
              <StartTattooPlanMainDataForm>
                <StartTattooPlanMainDataSectionWrapper>
                  <StartTattooPlanMainDataSectionTitle>
                    {"Placement & size"}
                  </StartTattooPlanMainDataSectionTitle>
                  <Select
                    defaultValue={selectedPlacement}
                    onChange={setSelectedPlacement}
                    options={placementsOptions}
                  />
                  <BlankDiv />
                  <Select
                    defaultValue={selectedSize}
                    onChange={setSelectedSize}
                    options={sizeOptions}
                  />
                </StartTattooPlanMainDataSectionWrapper>
                {/* ====================================================== */}
                <StartTattooPlanMainDataSectionWrapper>
                  <StartTattooPlanMainDataSectionTitle>
                    {"Short description"}
                  </StartTattooPlanMainDataSectionTitle>
                  <TattooPlanDescriptionTextarea
                    maxlength='200'
                    placeholder='Ex: “I would like the outline of a paper plane on my wrist around 3cm in size. I’d like the lines to be fine and as clean as possible.”'
                    value={planDescription}
                    onChange={(e) => {
                      setPlanDescription(e.target.value);
                    }}
                  />
                  <TattooPlanDescriptionTextareaCounter>
                    {`${planDescription.length}/200`}
                  </TattooPlanDescriptionTextareaCounter>
                  <BlankDiv />
                  <TattooPlanColorTypeMainWrapper>
                    <TattooPlanColorTypeTitle>
                      Do you want color?
                    </TattooPlanColorTypeTitle>
                    <TattooPlanColorTypeWrapper>
                      <TattooPlanColorTypeLabel
                        htmlFor='color'
                        $isColor={isColor === true}>
                        <TattooPlanColorTypeInput
                          $isColor={isColor === true}
                          type='radio'
                          name='type'
                          value='color'
                          id='color'
                          defaultChecked={true}
                          onClick={() => {
                            setIsColor((prev) => true);
                          }}
                        />
                        Color
                      </TattooPlanColorTypeLabel>

                      <TattooPlanColorTypeLabel
                        htmlFor='no-color'
                        $isColor={isColor === false}>
                        <TattooPlanColorTypeInput
                          $isColor={isColor === false}
                          type='radio'
                          name='type'
                          value='no-color'
                          id='no-color'
                          defaultChecked={false}
                          onClick={() => {
                            setIsColor((prev) => false);
                          }}
                        />
                        No Color
                      </TattooPlanColorTypeLabel>
                    </TattooPlanColorTypeWrapper>
                  </TattooPlanColorTypeMainWrapper>
                </StartTattooPlanMainDataSectionWrapper>
                {/* ====================================================== */}
                <StartTattooPlanMainDataSectionWrapper>
                  <StartTattooPlanMainDataSectionTitle>
                    Reference
                  </StartTattooPlanMainDataSectionTitle>

                  <StartPlanReferenceWrapper>
                    {selectedReference && (
                      <StartPlanReferencePreview
                        src={
                          selectedReference.pinImage
                        }></StartPlanReferencePreview>
                    )}
                    <StartPlanReferenceSelector
                      onClick={() => setIsShowAllPins(true)}>
                      +
                    </StartPlanReferenceSelector>
                  </StartPlanReferenceWrapper>
                </StartTattooPlanMainDataSectionWrapper>
                {/* ====================================================== */}
                <StartTattooPlanMainDataSectionWrapper>
                  <StartTattooPlanMainDataSectionTitle>
                    Budget
                  </StartTattooPlanMainDataSectionTitle>
                  <Select
                    defaultValue={planBudget}
                    onChange={setPlanBudget}
                    options={budgetOption}
                  />
                </StartTattooPlanMainDataSectionWrapper>
                {/* ====================================================== */}
                <StartTattooPlanMainDataSectionWrapper>
                  <StartTattooPlanMainDataSectionTitle>
                    City
                  </StartTattooPlanMainDataSectionTitle>
                  <Select
                    defaultValue={selectedCity}
                    onChange={setSelectedCity}
                    options={cities}
                  />
                </StartTattooPlanMainDataSectionWrapper>
                {/* ====================================================== */}
                <StartTattooPlanMainDataSectionWrapper>
                  <StartTattooPlanMainDataSectionTitle>
                    When do you want to get tattooed?
                  </StartTattooPlanMainDataSectionTitle>

                  <TattooPlanTimeSectionSelectorWrapper>
                    <TattooPlanTimeSectionSelectorInput
                      id='toggle-on'
                      className='toggle toggle-left'
                      name='toggle'
                      value='true'
                      type='radio'
                      defaultChecked
                      onClick={() => {
                        setIsShowCalandar(true);
                      }}
                    />
                    <TattooPlanTimeSectionSelectorLable
                      htmlFor='toggle-on'
                      className='btn'>
                      Pick a time
                    </TattooPlanTimeSectionSelectorLable>

                    <TattooPlanTimeSectionSelectorInput
                      id='toggle-off'
                      className='toggle toggle-right'
                      name='toggle'
                      value='false'
                      type='radio'
                      onClick={() => {
                        setIsShowCalandar(false);
                        setPlanDate(new Date(1900, 0, 1));
                      }}
                    />
                    <TattooPlanTimeSectionSelectorLable
                      htmlFor='toggle-off'
                      className='btn'>
                      {"I'm flexable"}
                    </TattooPlanTimeSectionSelectorLable>
                  </TattooPlanTimeSectionSelectorWrapper>

                  <TattooPlanCalandarWrapper $isShowCalendar={isShowCalandar}>
                    <Calendar
                      value={planDate}
                      onChange={setPlanDate}
                      locale={"en"}
                      minDate={new Date()}
                      // activeStartDate={planDate}
                      // activeStartDate={new Date()}
                      selectRange={true}
                      calendarType={"US"}
                    />
                  </TattooPlanCalandarWrapper>
                </StartTattooPlanMainDataSectionWrapper>
                {/* ====================================================== */}
                <StartPlanButtonWrapper>
                  <StartPlanButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleStartPlan();
                    }}>
                    <StartPlanButtonSpan>Start Plan</StartPlanButtonSpan>
                  </StartPlanButton>
                </StartPlanButtonWrapper>
                {/* ====================================================== */}
              </StartTattooPlanMainDataForm>
            </StartTattooPlanMainDataSelectorWrapper>
          </StartTattooPlanDataWrapper>
          {/* ====================================================== */}
          <StartTattooPlanImageWrapper>
            <StartTattooPlanImage
              src={
                "https://d1kq2dqeox7x40.cloudfront.net/web/book/background.jpg?w=720"
              }
            />
          </StartTattooPlanImageWrapper>

          {/* ====================================================== */}
        </StartTattooPlanWrapper>
      ) : (
        //nee to be fixed
        <Profile></Profile>
      )}
    </>
  );
}

export default StartTattooPlan;
