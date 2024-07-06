import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoLink }) => {
  return (
    // <div className="react-player-wrapper">
      <ReactPlayer
        url={videoLink}
        width="100%"
        height="100%"
        controls={true}
        playing={false} // Set to true to autoplay the video
        className="react-player"
      />
    // </div>
  );
};

export default VideoPlayer;
