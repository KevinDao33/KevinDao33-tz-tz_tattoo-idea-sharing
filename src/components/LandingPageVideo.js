import React, {useEffect, useState} from "react";
import {
  LandingPageVideoWrapper,
  LandingPageVideo,
} from "../styles/LandingPageVideo.module";
import testVideo2 from "../icon/test2.mp4";
import testVideo1 from "../icon/test1.webm";

function LandingPage(props) {

  const closeVideo = () => {
    const closeTime = setTimeout(() => {
      props.setIsShowVideo(false);
      localStorage.setItem("visitHomepage", true);
    }, 7000);
  };

  useEffect(() => {
    closeVideo();
  }, []);

  return (
    <LandingPageVideoWrapper>
      <LandingPageVideo autoPlay={true} muted={true}>
        <source src={testVideo1} type='video/webm' />
        <source src={testVideo2} type='video/mp4' />
        Sorry, your browser doesn&apos;t support embedded videos.
      </LandingPageVideo>
    </LandingPageVideoWrapper>
  );
}

export default LandingPage;
