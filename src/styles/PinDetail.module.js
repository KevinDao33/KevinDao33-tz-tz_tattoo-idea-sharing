import styled from "styled-components";

const PinDetailWrapper = styled.div`
  width: 1300px;
  height: auto;
  border-radius: 20px;
  margin: 100px auto 50px auto;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
`;

const PinImageWrapper = styled.div`
  width: 55%;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const PinImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const PinDetailDataWrapper = styled.div`
  width: 45%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  position: relative;
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
  border-radius: 10px;
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
  background-color: black;
  border: none;
  border-radius: 10px;
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
  font-size: 1.5rem;
  margin: 10px auto 10px 10px;
  border: 1px solid red;
`;

const PinAuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid orange;
`;

const PinAuthorPhoto = styled.img`
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin: auto 10px;
  border: 1px solid red;
  cursor: pointer;
`;

const PinAuthorName = styled.h6`
  font-size: 1.25rem;
  margin: 0 10px 0 0;
  cursor: pointer;
`;

const PinCommentTitle = styled.h4`
  font-size: 1.25rem;
  margin: 30px auto 0 10px;
  border: 1px solid red;
`;

const AllPinCommentWrapper = styled.div`
  width: 100%;
  min-height: 50px;
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
  position: absolute;
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid red;
  margin: 10px 0;
  bottom: 0;
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
  width: 60px;
  height: 60px;
  margin: auto 10px;
  border: 1px solid red;
  cursor: pointer;
`;

const PinCommentInput = styled.input`
  width: calc(100% - 60px - 10px - 10px - 10px);
  height: 30px;
  font-size: 1.5rem;
  border: 2px solid gray;
  border-radius: 10px;
  background-color: white;
  padding-left: 15px;
  margin: auto 10px auto 0;
  cursor: text;
`;

const UserName = styled.h6`
  font-size: 1rem;
  margin: 0 10px 0 0;
  cursor: pointer;
`;

const PinComment = styled.p`
  font-size: 1rem;
  margin: 0 auto 0 10px;
  border: 1px solid red;
`;

const RelatedPinsTitle = styled.h2`
  margin: 0 auto 15px auto;
  font-size: 1.5rem;
  text-align: center;
`;

const SubmitButton = styled.button`
  color: white;
  background-color: #92C9B1;
  border: none;
  border-radius: 10px;
  padding: 3px 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1rem;
  margin: auto 10px auto 0;
  text-align: center;
  line-height: 30px;
`;

const SimiliarPinsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  min-height: 150px;
  border: 1px solid gray;
  border-radius: 20px;
  margin: 30px auto;
`;

const SimiliarPin = styled.img`
  width: 300px;
  height: auto;
  margin: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(67, 67, 67, 0.4) 3px 3px, rgba(67, 67, 67, 0.3) 8px 8px,
      rgba(67, 67, 67, 0.2) 12px 12px, rgba(67, 67, 67, 0.1) 18px 18px,
      rgba(67, 67, 67, 0.05) 20px 20px;
  }
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
  PinAuthorWrapper,
  PinAuthorPhoto,
  PinAuthorName,
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
  RelatedPinsTitle,
  SubmitButton,
  SimiliarPinsWrapper,
  SimiliarPin,
};
