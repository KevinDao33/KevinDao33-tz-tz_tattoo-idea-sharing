import styled from "styled-components";

const LandingPageVideoWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
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

  /* border:10px solid black; */
  /* padding: 2rem 1rem; */
  /* min-height: 3em;
  resize: both;
  background: #ffd73e33;
  border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E") 1; */
`;

export {LandingPageVideoWrapper, LandingPageVideo};
