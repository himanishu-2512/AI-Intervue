"use client";

import React, { useEffect, useRef, useState } from "react";

const VideoRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chunk,setChunk]=useState<Blob[]>([])

  
  let timeoutId:NodeJS.Timeout;
  useEffect(()=>{
    timeoutId = setInterval(() => {
      sendChunkToServer(chunk);
    }, 30000);
  },[])

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support video recording.");
      return;
    }

    try {
      // Access user's camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      // Set the live stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Initialize MediaRecorder
     
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      

      // Collect chunks as they are recorded
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunk.push(event.data);

        }
      };

      // Handle when recording stops
      recorder.onstop = () => {
        const completeBlob = new Blob(chunk, { type: "video/webm" });
        console.log("Recording complete, video blob:", completeBlob);

        // Example: Download video locally
        const url = URL.createObjectURL(completeBlob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "recording.webm";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      };

      // Start recording
      recorder.start(1000); // 1000ms chunks
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Failed to start recording. Please ensure you have granted camera/microphone permissions.");
    }
  };

  const handleStopRecording = () => {
      if(mediaRecorder){
      mediaRecorder.stop();
      setIsRecording(false);
      }
  };

  const sendChunkToServer = async (chunk: Blob[]) => {
    try {
      const formData = new FormData();
      formData.append("video",chunk)
      setChunk([])
      await fetch("/api/upload-video-chunk", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Failed to send video chunk:", error);
    }
  };
  useEffect(() => {
    handleStartRecording()
    return () => {
     handleStopRecording();
     console.log("yes stop recording")
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          width: "200px",
          height: "auto",
          border: "2px solid #000",
        }}
      />
    </div>
  );
};

export default VideoRecorder;
