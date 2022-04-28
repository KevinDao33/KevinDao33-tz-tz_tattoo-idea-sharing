import styled from "styled-components";
import {arrangeIcon} from "../icon/arrange.png"

const CollectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 1300px;
  height: 300px;
  margin: 90px auto 10px auto;
  border-radius: 20px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px auto;
  border-radius: 100px;
`;

const CollectionName = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin: 10px auto;
`;

const ArrangeButton = styled.div`
  width: 130px;
  height: 130px;
  background-color: #ecebe4;
  opacity: 0.8;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;
  background-image: arrangeIcon;

  &:hover {
    transform: scale(1);
    background-color: #d3d3d3;
    box-shadow: rgba(67, 67, 67, 0.4) 0.5px 0.5px, rgba(67, 67, 67, 0.3) 2px 2px,
      rgba(67, 67, 67, 0.2) 6px 6px, rgba(67, 67, 67, 0.1) 8px 8px,
      rgba(67, 67, 67, 0.05) 12px 12px;
  }
`;

const SaveOrderButton = styled.button`
  width: 130px;
  height: 50px;
  color: white;
  background-color: lightgray;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: auto 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.25rem;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  transition: 0.4s;

  &:hover {
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
    background-color: coral;
  }
`;

export {
  CollectionHeader,
  UserPhoto,
  CollectionName,
  ArrangeButton,
  SaveOrderButton,
};
