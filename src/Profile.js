import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PorfileWrapper = styled.div`
  width: 90vw;
  margin: 15px auto;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

function Profile() {
  return (
    <>
      <PorfileWrapper>
          <h1>welcome to profile page</h1>
      </PorfileWrapper>
    </>
  );
}

export default Profile;