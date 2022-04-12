import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import AddPin from "./AddPin";

import chicken from "./test-images/chicken.jpg";
import kitty from "./test-images/kitty.jpg";
import wolf from "./test-images/wolf.jpg";
import flower from "./test-images/flower.jpg";
import bear from "./test-images/bear.jpg";
import cherry from "./test-images/cherry.jpg";
import death from "./test-images/death.jpg";
import frog from "./test-images/frog.jpg";
import guitarfrog from "./test-images/guitar-frog.jpg";
import hands from "./test-images/hands.jpg";
import raccoon from "./test-images/raccoon.jpg";
import trex from "./test-images/t-rex.jpg";
import uglyflower from "./test-images/ugly-flower.jpg";
import skateboard from "./test-images/skateboard.jpg";
import duck from "./test-images/duck.jpg";



const MainWrapper = styled.div`
  width: 90vw;
  margin: 15px auto;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

const AllPinsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid blue;
  height: auto;
`;

const PinWrapper = styled.div`
  width: 325px;
  border: 1px solid red;
  border-radius: 20px;
  margin: 10px;
  background-color: lightblue;
  position: relative;
`;

const PinImage = styled.img`
  width: 325px;
  border-radius: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  color: inherit;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1.5rem;
`;

function Homapage() {

    const [displayAddPin, setDisplayAddPin] = useState(false);

    const showAddPin = ()=>{
        setDisplayAddPin(true);
    }

  return (
    <MainWrapper>
      <AllPinsWrapper>

        <PinWrapper>
          <PinImage src={chicken} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={flower} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={kitty} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={wolf} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={bear} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={frog} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={death} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={uglyflower} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={trex} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={frog} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={duck} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={cherry} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={guitarfrog} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={hands} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={raccoon} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>
        <PinWrapper>
          <PinImage src={skateboard} />
          <SaveButton onClick={showAddPin} >save</SaveButton>
        </PinWrapper>

        {displayAddPin && <AddPin displayAddPin={displayAddPin} setDisplayAddPin={setDisplayAddPin} />}

      </AllPinsWrapper>
    </MainWrapper>
  );
}

export default Homapage;
