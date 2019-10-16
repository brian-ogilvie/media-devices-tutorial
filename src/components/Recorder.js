import React, { useState, useEffect } from 'react';

export default function Recorder({ stream, onComplete }) {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [dataChunks, setDataChunks] = useState([]);

  const onDataAvailable = e => {
    const { data } = e;
    setDataChunks(current => [...current, data]);
  };

  const onStop = () => {
    const blob = new Blob(dataChunks, { type: 'video/mp4' });
    setDataChunks([]);
    onComplete(blob);
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
    <div>
      {recorder !== null && (
        <div>
          {isRecording ? (
            <button type="button" onClick={stopRecording}>
              Stop Recording
            </button>
          ) : (
            <button type="button" onClick={startRecording}>
              Start Recording
            </button>
          )}
        </div>
      )}
    </div>
  );
}
