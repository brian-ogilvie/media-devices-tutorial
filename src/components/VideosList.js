/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

export default function VideosList({ videos }) {
  const renderVideos = () => {
    if (videos.length === 0) return null;
    return videos.map((video, i) => {
      const { id, url } = video;
      return (
        <li key={id}>
          <details>
            <summary>{`Video ${i + 1}`}</summary>
            <video
              controls
              src={url}
              type="video/mp4"
              className="VideosList__video"
            />
          </details>
        </li>
      );
    });
  };

  return (
    <div>
      <h2 className="secondary-heading">My Vlogs</h2>
      <ul className="VideosList__ul">{renderVideos()}</ul>
    </div>
  );
}
