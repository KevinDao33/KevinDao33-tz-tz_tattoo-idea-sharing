import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PorfileWrapper = styled.div`
  width: 90vw;
  margin: 15px auto;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.div`
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: gray;
  margin: 20px auto 0px auto;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  margin: 15px auto 10px auto;
  font-weight: bold;
`;

const ShowFollow = styled.p`
  font-size: 1rem;
  margin: 2px auto;
`;

const ButtonWeapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px auto;
`;

const Button = styled.button`
  color: gray;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  margin: 10px;
`;

const UserStuffWrapper = styled.div`
  width: 90%;
  display: flex;
  border: 1px solid purple;
`;

const SelectSection = styled.p`
  font-size: 1rem;
  margin: 10px 30px;
  border-bottom: 1px solid gray;
`;

const UserPin = styled.div`
  border: 1px solid green;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  height: auto;
  min-height: 300px;
`;

function Profile() {
  return (
    <>
      <PorfileWrapper>
        <UserImage></UserImage>
        <UserName>Kevin Dao</UserName>
        <ShowFollow>{2} following</ShowFollow>
        <ShowFollow>{5} follower</ShowFollow>
        <ButtonWeapper>
          <Button>share</Button>
          <Button>edit</Button>
        </ButtonWeapper>

        <UserStuffWrapper>
          <ButtonWeapper>
            <SelectSection>my pin</SelectSection>
            <SelectSection>my collection</SelectSection>
          </ButtonWeapper>
        </UserStuffWrapper>
      </PorfileWrapper>
    </>
  );
}

export default Profile;
