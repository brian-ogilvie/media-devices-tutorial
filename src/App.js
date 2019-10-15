import React, { useState, useEffect } from 'react';
import './App.css';
import LiveVideo from './components/LiveVideo';

function App() {
  const [stream, setStream] = useState(null);

  async function getStream() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setStream(mediaStream);
  }

  function releaseStream() {
    if (stream !== null) {
      console.log('releasing stream');
      stream.getTracks().forEach(track => track.stop());
    }
  }

  useEffect(() => {
    getStream();
    return releaseStream;
  }, []);

  return (
    <div className="App">
      <h1>Go Vlog Yourself</h1>
      {stream !== null && <LiveVideo stream={stream} />}
    </div>
  );
}

export default App;
