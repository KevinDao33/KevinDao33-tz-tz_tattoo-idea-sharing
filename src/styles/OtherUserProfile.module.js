import styled from "styled-components";

const FollowButton = styled.button`
  width: 130px;
  height: 50px;
  color: gray;
  background-color: white;
  color: black;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  text-align: center;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
    transform: scale(0.97);
  }
`;

const UnFollowButton = styled.button`
  width: 130px;
  height: 50px;
  color: gray;
  background-color: #d8d8d8;
  color: black;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  text-align: center;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
    transform: scale(0.97);
  }
`;

export {FollowButton, UnFollowButton};
