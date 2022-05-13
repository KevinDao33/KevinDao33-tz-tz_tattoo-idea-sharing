import React, {useEffect} from "react";
import {
  LandingPageVideoWrapper,
  LandingPageVideo,
} from "../styles/LandingPageVideo.module";
// import testVideo2 from "../icon/test2.mp4";
// import testVideo1 from "../icon/test1.webm";
import tztzVideo from "../icon/tztz-video.mp4";

function LandingPage(props) {
  const closeVideo = () => {
    setTimeout(() => {
      localStorage.setItem("isShowVideo", true);
      // eslint-disable-next-line react/prop-types
      props.setIsShowVideo(true);
    }, 9000);
  };

  useEffect(() => {
    closeVideo();
  }, []);

  return (
    <LandingPageVideoWrapper>
      <LandingPageVideo autoPlay={true} muted={true}>
        <source src={tztzVideo} type='video/mp4' />
        Sorry, your browser doesn&apos;t support embedded videos.
      </LandingPageVideo>
    </LandingPageVideoWrapper>
  );
}

export default LandingPage;
