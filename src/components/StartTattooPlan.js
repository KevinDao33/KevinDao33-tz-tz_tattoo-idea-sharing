import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import Select from "react-select";
import Calendar from "react-calendar";
import {placementsOptions, sizeOptions, budgetOption, cities} from "../const";
import {collection, getDocs, getDoc, doc, setDoc} from "firebase/firestore";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

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

function StartTattooPlan({db, uid}) {
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
    if (!uid) {
      return;
    }
    const userSnapshot = await getDoc(doc(db, "user", uid));
    setUserData(userSnapshot.data());

    return;
  };

  useEffect(() => {
    getuserData();
  }, [uid]);

  const getCollectionPins = async (id) => {
    const querySnapshot = await getDocs(
      collection(db, `user/${id}`, "collection")
    );

    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push(...doc.data().pins);
    });

    setCollectionPins(myCollections);

    return;
  };

  useEffect(() => {
    uid && getCollectionPins(uid);
  }, [uid]);

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure all fields are filled :(",
      });

      return;
    }

    const allNewPlanRef = collection(db, "plan");
    const newPlanRef = doc(allNewPlanRef);
    const userNewPlanRef = doc(db, "user", uid, "plan", newPlanRef.id);

    await setDoc(newPlanRef, {
      artists: [],
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
      artists: [],
    });

    await Swal.fire(
      `Plan created!`,
      "sooooooo~ excited about your new tattoo",
      "success"
    );
    redirect("/profile");
  };

  return (
    <>
      {uid ? (
        <StartTattooPlanWrapper>
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
                </SelectReferencePinWrapper>
              </DisplayAllPinWrapper>
            </DisplayAllPinOverlay>
          )}

          <StartTattooPlanDataWrapper>
            <StartTattooPlanTitleWrapper>
              <StartTattooPlanTitleSpan>
                Start your plan
              </StartTattooPlanTitleSpan>
              <StartTattooPlanMainTitle>
                Describe your tattoo
              </StartTattooPlanMainTitle>
            </StartTattooPlanTitleWrapper>
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
                            setIsColor(true);
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
                            setIsColor(false);
                          }}
                        />
                        No Color
                      </TattooPlanColorTypeLabel>
                    </TattooPlanColorTypeWrapper>
                  </TattooPlanColorTypeMainWrapper>
                </StartTattooPlanMainDataSectionWrapper>

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
                      selectRange={true}
                      calendarType={"US"}
                    />
                  </TattooPlanCalandarWrapper>
                </StartTattooPlanMainDataSectionWrapper>
                <StartPlanButtonWrapper>
                  <StartPlanButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleStartPlan();
                    }}>
                    <StartPlanButtonSpan>Start Plan</StartPlanButtonSpan>
                  </StartPlanButton>
                </StartPlanButtonWrapper>
              </StartTattooPlanMainDataForm>
            </StartTattooPlanMainDataSelectorWrapper>
          </StartTattooPlanDataWrapper>
          <StartTattooPlanImageWrapper>
            <StartTattooPlanImage
              src={
                "https://d1kq2dqeox7x40.cloudfront.net/web/book/background.jpg?w=720"
              }
            />
          </StartTattooPlanImageWrapper>
        </StartTattooPlanWrapper>
      ) : (
        <Profile></Profile>
      )}
    </>
  );
}

StartTattooPlan.propTypes = {
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default StartTattooPlan;
