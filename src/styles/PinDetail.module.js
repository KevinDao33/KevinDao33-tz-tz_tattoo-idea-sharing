import styled from "styled-components";

const PinDetailWrapper = styled.div`
  width: 1000px;
  height: auto;
  border-radius: 20px;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
`;

const PinImageWrapper = styled.div`
  width: 45%;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const PinImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const PinDetailDataWrapper = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PinDetailSubNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid blue;
`;

const CollectionSelector = styled.select`
  width: 110px;
  height: 40px;
  border-radius: 20px;
  background-color: lightgray;
  border: none;
  color: gray;
  font-size: 1rem;
  text-align: center;
  margin: auto 0;
`;

const CollectionName = styled.option`
  font-size: 1rem;
`;

const SaveButton = styled.button`
  color: white;
  background-color: lightcoral;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  margin: 10px;
  text-align: center;
`;

const PinName = styled.h2`
  font-size: 2rem;
  margin: 20px auto 0 10px;
`;

const PinDescription = styled.p`
  width: 100%;
  font-size: 1rem;
  margin: 10px auto 10px;
  border: 1px solid red;
`;

const PinCommentTitle = styled.h4`
  font-size: 1.25rem;
  margin: 30px auto 0 10px;
  border: 1px solid red;
`;

const AllPinCommentWrapper = styled.div`
  width: 100%;
  /* min-height: 50px; */
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid green;
`;

const OtherPinCommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid orange;
`;

const PinCommentWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid red;
  margin: 10px 0;
`;

const MyPinCommentWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid red;
  margin: 10px 0;
  bottom: 10px;
`;

const UserPhoto = styled.img`
  border-radius: 50px;
  width: 30px;
  height: 30px;
  margin: auto 10px;
  border: 1px solid red;
  cursor: pointer;
`;

const MyPhoto = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin: auto 10px;
  border: 1px solid red;
  cursor: pointer;
`;

const PinCommentInput = styled.input`
  width: calc(100% - 40px - 10px - 10px - 10px);
  height: 30px;
  font-size: 1.5rem;
  border: 2px solid gray;
  border-radius: 20px;
  background-color: white;
  padding-left: 10px;
  margin: auto 10px auto 0;
  cursor: text;
`;

const UserName = styled.h6`
  font-size: 1rem;
  margin: 0 10px;
`;

const PinComment = styled.p`
  font-size: 1rem;
  margin: 0 auto 0 10px;
  border: 1px solid red;
`;

export {
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
};
