"use client";

import React, { useRef, useState } from "react";

const ScreenSharing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, // Set to true if you want to include audio
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsSharing(true);

      // Stop sharing when the user ends the stream
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        setIsSharing(false);
        if (videoRef.current) videoRef.current.srcObject = null;
      });
    } catch (error) {
      console.error("Error starting screen sharing:", error);
    }
  };

  const stopScreenSharing = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsSharing(false);
  };

  return (
    <div>
      <button
        onClick={isSharing ? stopScreenSharing : startScreenSharing}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {isSharing ? "Stop Sharing" : "Start Screen Sharing"}
      </button>
      <div className="relative w-1/4 h-1/4 top-0 right-0">
        <video
          ref={videoRef}
          className="border rounded"
          style={{ width: "100%", height: "auto" }}
          autoPlay
          muted
        ></video>
      </div>
    </div>
  );
};

export default ScreenSharing;
