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

  useEffect(() => {
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
