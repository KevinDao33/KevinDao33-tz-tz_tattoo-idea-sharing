import {useEffect} from "react";
import PropTypes from "prop-types";

import {
  LandingPageVideoWrapper,
  LandingPageVideo,
} from "../styles/LandingPageVideo.module";
import tztzVideo from "../icon/tztz-video.mp4";

function LandingPage({setIsShowVideo}) {
  const closeVideo = () => {
    setTimeout(() => {
      localStorage.setItem("isShowVideo", true);
      setIsShowVideo(true);
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

LandingPage.propTypes = {
  setIsShowVideo: PropTypes.func,
};

export default LandingPage;
