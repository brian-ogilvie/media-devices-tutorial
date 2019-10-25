import React, { useState, useEffect } from 'react';
import './App.css';
import VideosList from './components/VideosList';
import OrientationWarning from './components/OrientationWarning';

function App() {
  const [videos, setVideos] = useState([]);

  return (
    <div className="App">
      <h1 className="top-heading">Go Vlog Yourself</h1>
      <main>
        <div className="Recorder__container">
          <h2 className="secondary-heading">Just Vlog It!</h2>
        </div>
        <VideosList videos={videos} />
      </main>
      <OrientationWarning />
    </div>
  );
}

export default App;
