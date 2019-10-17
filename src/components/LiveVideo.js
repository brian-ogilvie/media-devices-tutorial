/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';

export default function LiveVideo({ stream }) {
  const video = useRef();

  useEffect(() => {
    if (video.current !== null) {
      video.current.volume = 0;
      video.current.srcObject = stream;
    }
  }, [video, stream]);

  return <video ref={video} autoPlay className="LiveVideo" />;
}
