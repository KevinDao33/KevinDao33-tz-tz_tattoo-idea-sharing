import React, {useEffect, useState} from "react";

import {
  ErrorWrapper,
  ErrorTitle,
  ErrorTextArea,
} from "../styles/PageNotFound.module";
import {errorMessage} from "../const";

function PageNotFound() {
  const [shownText, setShownText] = useState("");

  const addMessage = () => {
    errorMessage.map((line) => setShownText((prev) => prev + line));
  };

  useEffect(() => {
    addMessage();
  }, []);

  return (
    <ErrorWrapper>
      <ErrorTitle>{"Sorry it's all gone pear-shaped."}</ErrorTitle>
      <ErrorTitle>{"Sometimes life's like that."}</ErrorTitle>
      <ErrorTextArea>{shownText}</ErrorTextArea>
      <ErrorTitle>{"(Error 404) - File does not exist."}</ErrorTitle>
      <ErrorTitle>{" I'm so sorry."}</ErrorTitle>
    </ErrorWrapper>
  );
}

export default PageNotFound;
