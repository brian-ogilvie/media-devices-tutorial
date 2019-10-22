import React, { useState, useEffect } from 'react';
import './App.css';
import LiveVideo from './components/LiveVideo';
import Recorder from './components/Recorder';
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

  const processDataBlob = blob => {
    const url = URL.createObjectURL(blob);
    setVideos(prev =>
      prev.concat({
        url,
        id: Math.ceil(Math.random() * 1000),
      })
    );
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
        <div className="recorder-container">
          <h2 className="secondary-heading">Just Vlog It!</h2>
          {stream !== null && (
            <>
              <LiveVideo stream={stream} />
              <Recorder stream={stream} onComplete={processDataBlob} />
            </>
          )}
        </div>
        <VideosList videos={videos} />
      </main>
      <OrientationWarning />
    </div>
  );
}

export default App;
