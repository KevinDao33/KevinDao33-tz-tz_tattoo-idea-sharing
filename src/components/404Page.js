import React from "react";

import {
  AllErrorWrapper,
  ErrorWrapper,
  ErrorText,
} from "../styles/404Page.mpdule";

function Error() {
  return (
    <AllErrorWrapper>
      <ErrorWrapper>
        <ErrorText>404</ErrorText>
      </ErrorWrapper>
    </AllErrorWrapper>
  );
}

export default Error;
