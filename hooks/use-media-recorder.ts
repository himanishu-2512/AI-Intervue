"use client";

import { useState, useCallback, useEffect } from "react";

export function useMediaRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [recognition, setRecognition] = useState(null); // Store the recognition instance
  useEffect(() => {
    if (audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      console.log("Blob size:", blob.size); // Check if the blob has a valid size
      setAudioBlob(blob);
    }
  }, [audioChunks]);
  const startRecording = useCallback(async () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
    setAudioChunks([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorderMimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/wav";
      const recorder = new MediaRecorder(stream, {
        mimeType: recorderMimeType,
      });

      // const recorder = new MediaRecorder(stream);

      // Speech recognition setup
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("SpeechRecognition is not supported in this browser.");
        return;
      }
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true; // Keep recognition running
      recognitionInstance.interimResults = true; // Show intermediate results
      recognitionInstance.lang = "en-US";

      recorder.ondataavailable = (e) => {
        console.log("Data available:", e.data.size);
        if (e.data.size > 0) {
          setAudioChunks((prevChunks) => [...prevChunks, e.data]);
        }
      };

      // When recording stops, create an audio blob
      recorder.onstop = () => {
        setTimeout(() => {
          // Reset audio chunks after stop
          recognitionInstance.stop(); // Stop speech recognition when recording stops
        }, 100); // Delay for 100ms to ensure data is available
      };

      // Start speech recognition
      recognitionInstance.onresult = (event) => {
        const results = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(" ");
          console.log(results)
        setTranscript(results); // Update transcript as speech is recognized
      };

      // Error handling for speech recognition
      recognitionInstance.onerror = (err: any) => {
        console.error("Speech recognition error:", err);
      };

      recognitionInstance.start(); // Start speech recognition

      // Start audio recording
      setMediaRecorder(recorder);
      setRecognition(recognitionInstance); // Store the recognition instance
      recorder.start();
      setIsRecording(true); // Update recording state
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, [audioChunks]);

  // Stop recording and speech recognition
  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }

    if (recognition) {
      recognition.stop(); // Stop speech recognition when stopping the recording
    }
  }, [mediaRecorder, recognition]);

  return {
    transcript,
    isRecording,
    startRecording,
    stopRecording,
    audioBlob,
  };
}
