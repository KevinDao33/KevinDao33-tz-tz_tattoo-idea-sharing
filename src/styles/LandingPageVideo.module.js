import styled from "styled-components";

const LandingPageVideoWrapper = styled.div`
  width: 100vw;
  height: calc(100vh);
  z-index: 10;
  /* background-color: #EBC9AD; */
  background-color: black;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
`;

const LandingPageVideo = styled.video`
  width: 1400px;
  z-index: 12;
  border-radius: 10px;
`;

export {LandingPageVideoWrapper, LandingPageVideo};
