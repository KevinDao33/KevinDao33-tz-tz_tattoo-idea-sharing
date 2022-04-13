import React, { useState, useEffect } from "react";
import {
  CreateNewPinWrapper,
  PinDataUploadWrapper,
  NewPinDataWrapper,
  NewPinDataTitle,
  NewPinDataInput,
  CreatePinButton,
} from "../styles/CreateNewPin.module";

function CreateNewPin() {
  return (
    <CreateNewPinWrapper>
      <PinDataUploadWrapper></PinDataUploadWrapper>

      <PinDataUploadWrapper>
        <NewPinDataWrapper>
          {/* <NewPinDataTitle>Pin Name |</NewPinDataTitle> */}
          <NewPinDataInput placeholder='Enter Pin Name'></NewPinDataInput>
        </NewPinDataWrapper>
        <NewPinDataWrapper>
          {/* <NewPinDataTitle>Pin Descrption |</NewPinDataTitle> */}
          <NewPinDataInput placeholder='Enter Pin Desc'></NewPinDataInput>
        </NewPinDataWrapper>
        <NewPinDataWrapper>
          {/* <NewPinDataTitle>Pin Link |</NewPinDataTitle> */}
          <NewPinDataInput placeholder='Enter Pin Link'></NewPinDataInput>
        </NewPinDataWrapper>

        <CreatePinButton>Create</CreatePinButton>
      </PinDataUploadWrapper>
      
    </CreateNewPinWrapper>
  );
}

export default CreateNewPin;
