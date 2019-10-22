/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';

export default function LiveVideo({ stream }) {
  const video = useRef();

  useEffect(() => {
    if (video.current !== null) {
      video.current.srcObject = stream;
    }
  }, [video, stream]);

  return <video ref={video} autoPlay muted className="LiveVideo" playsInline />;
}
