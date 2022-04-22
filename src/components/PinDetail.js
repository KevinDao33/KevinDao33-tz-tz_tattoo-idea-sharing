import React from "react";
// import {initializeApp} from "firebase/app";
// import {
//   getFirestore,
//   collection as co,
//   getDocs,
//   doc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
// } from "firebase/firestore";

import {
  PinDetailWrapper,
  PinImageWrapper,
  PinImage,
  PinDetailDataWrapper,
  PinDetailSubNav,
  CollectionSelector,
  CollectionName,
  SaveButton,
  PinName,
  PinDescription,
  PinCommentTitle,
  AllPinCommentWrapper,
  OtherPinCommentWrapper,
  PinCommentWrapper,
  MyPinCommentWrapper,
  UserPhoto,
  MyPhoto,
  PinCommentInput,
  UserName,
  PinComment,
} from "../styles/PinDetail.module";

function PinDetail() {
  return (
    <PinDetailWrapper>
      <PinImageWrapper>
        <PinImage
          src={
            "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Fchicken?alt=media&token=2354b16e-791f-48e8-aa32-81a5415c3387"
          }></PinImage>
      </PinImageWrapper>

      <PinDetailDataWrapper>
        <PinDetailSubNav>
            <CollectionSelector>
            <CollectionName>arm idea</CollectionName>
            <CollectionName>back idea</CollectionName>
            <CollectionName>animals</CollectionName>
            <CollectionName>plants</CollectionName>
            <CollectionName>vintage</CollectionName>
            <CollectionName>black and white</CollectionName>
            </CollectionSelector>
            <SaveButton>save</SaveButton>
        </PinDetailSubNav>
        <PinName>Chicken</PinName>
        <PinDescription>
          welndlkwnc woec w ewcw ocpogo ewnerncw, d woe fre acbal ekrblfu wecanc arfehccn akern oirn iroeh orn facnaric ri oe ahfoiaenca ira eio rncao ier nc oirac oiernco rirneoc in ervn l 
        </PinDescription>
        <PinCommentTitle>comment</PinCommentTitle>
        <AllPinCommentWrapper>
          <OtherPinCommentWrapper>
            <PinCommentWrapper>
              <UserPhoto
                src={
                  "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Fcat?alt=media&token=b08b7508-c236-4ab5-b785-e93ea0b1feaf"
                }></UserPhoto>
              <UserName>kev</UserName>
              <PinComment>This is soooooo cooooooool~~~</PinComment>
            </PinCommentWrapper>
            <PinCommentWrapper>
              <UserPhoto
                src={
                  "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Fraccoon?alt=media&token=bb29b6c0-83ad-40ea-85b8-f7330c5ea153"
                }></UserPhoto>
              <UserName>chieh</UserName>
              <PinComment>Good Work!</PinComment>
            </PinCommentWrapper>
          </OtherPinCommentWrapper>
        </AllPinCommentWrapper>
        <MyPinCommentWrapper>
          <MyPhoto
            src={
              "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Ftztz?alt=media&token=5dbd2f43-2ef4-4699-832b-ec976f9d1e13"
            }></MyPhoto>
          <PinCommentInput></PinCommentInput>
        </MyPinCommentWrapper>

        {/* <AllPinCommentWrapper>
          <OtherPinCommentWrapper>
            <PinCommentWrapper>
              <UserPhoto
                src={
                  "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Fcat?alt=media&token=b08b7508-c236-4ab5-b785-e93ea0b1feaf"
                }></UserPhoto>
              <UserName>kev</UserName>
              <PinComment>This is soooooo cooooooool~~~</PinComment>
            </PinCommentWrapper>
          </OtherPinCommentWrapper>

          <PinCommentInputWrapper>
            <MyPhoto
              src={
                "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Ftztz?alt=media&token=5dbd2f43-2ef4-4699-832b-ec976f9d1e13"
              }></MyPhoto>
            <PinCommentInput></PinCommentInput>
          </PinCommentInputWrapper>
        </AllPinCommentWrapper> */}
      </PinDetailDataWrapper>
    </PinDetailWrapper>
  );
}

export default PinDetail;
