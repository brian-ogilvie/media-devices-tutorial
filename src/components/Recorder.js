/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import RecordingTimer from './RecordingTimer';

export default function Recorder({ stream, onComplete }) {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const setDataChunks = useState([])[1];

  const onDataAvailable = e => {
    const { data } = e;
    setDataChunks(currentChunks => [...currentChunks, data]);
  };

  const onStop = () => {
    setDataChunks(currentChunks => {
      const blob = new Blob(currentChunks, { type: 'video/mp4' });
      setTimeout(() => onComplete(blob), 0);
      return [];
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    recorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recorder.stop();
  };

  const handleNoRecorder = () => {
    if (window.safari !== undefined) {
      alert(
        'It appears that you are using the Safari browser. In order to use this site, you will need to enable the MediaRecorder feature.\nPlease select the following from the Menu Bar:\n Develop -> Experinental Features -> MediaRecorder\nThen refresh your page.'
      );
      return;
    }
    const { userAgent } = navigator;
    const iOS = /iP[ad|hone]/i.test(userAgent);
    const webKit = /WebKit/i.test(userAgent);
    const iOSSafari = iOS && webKit && !/CriOS/i.test(userAgent);
    if (iOSSafari) {
      alert(
        'It appears that you are using iOS Safari. In order to use this site, you will need to enable the MediaRecorder feature.\nPlease do so by going to Settings -> Safari -> Advanced -> Experimental Features, and toggle MediaRecorder on.\nThen refresh your page.'
      );
      return;
    }
    alert(
      'Unfortunately your browser does not support the features of this app. Please visit this site in Chrome, Firefox, or Safari.'
    );
  };

  useEffect(() => {
    if (!window.MediaRecorder) {
      handleNoRecorder();
      return;
    }
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = onDataAvailable;
    mediaRecorder.onstop = onStop;
    setRecorder(mediaRecorder);
  }, [stream]);

  return (
    <div className="Recorder">
      <RecordingTimer running={isRecording} />
      {recorder !== null && (
        <div className="Recorder__button-row">
          <button
            className="Recorder__button Recorder__start"
            type="button"
            onClick={startRecording}
            disabled={isRecording}
          >
            Start Recording
          </button>
          <button
            className="Recorder__button Recorder__stop"
            type="button"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            Stop Recording
          </button>
        </div>
      )}
    </div>
  );
}
