import React, { useState, useEffect } from 'react';
import './App.css';
import LiveVideo from './components/LiveVideo';
import VideosList from './components/VideosList';
import OrientationWarning from './components/OrientationWarning';

function App() {
  const [stream, setStream] = useState(null);
  const [videos, setVideos] = useState([]);

  const getStream = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setStream(mediaStream);
  };

  const releaseStream = () => {
    if (stream !== null) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    getStream();
    return releaseStream;
  }, []);

  return (
    <div className="App">
      <h1 className="top-heading">Go Vlog Yourself</h1>
      <main>
        <div className="Recorder__container">
          <h2 className="secondary-heading">Just Vlog It!</h2>
          {stream !== null && <LiveVideo stream={stream} />}
        </div>
        <VideosList videos={videos} />
      </main>
      <OrientationWarning />
    </div>
  );
}

export default App;
