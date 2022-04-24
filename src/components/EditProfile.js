/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

import {
  EditWrapper,
  EditNavAllWrapper,
  EditNavLeftWrapper,
  EditNavRightWrapper,
  BackButton,
  EditTitle,
  CancelButton,
  SaveButton,
  InputWrapper,
  InputTitle,
} from "../styles/EditProfile.module";

function EditProfile() {
  return (
    <>
      <EditWrapper>
        <EditNavAllWrapper>
          <EditNavLeftWrapper>
            <BackButton>{"<-"}</BackButton>
            <EditTitle>Settings</EditTitle>
          </EditNavLeftWrapper>

          <EditNavRightWrapper>
            <CancelButton>Cancel</CancelButton>
            <SaveButton>Save</SaveButton>
          </EditNavRightWrapper>
        </EditNavAllWrapper>
        <InputWrapper>
          <InputTitle>Name</InputTitle>
        </InputWrapper>
      </EditWrapper>
    </>
  );
}

export default EditProfile;
