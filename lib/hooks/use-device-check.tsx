"use client";

import { useState, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";

export function useDeviceCheck() {
  const [checks, setChecks] = useState({
    microphone: false,
    camera: false,
    speaker: false,
    screen: false,
  });
  const [speakerTestInProgress, setSpeakerTestInProgress] = useState(false);

  const checkMicrophone = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setChecks(prev => ({ ...prev, microphone: true }));
      return true;
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone access to continue",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const checkCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setChecks(prev => ({ ...prev, camera: true }));
      return true;
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please enable camera access to continue",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const checkSpeaker = useCallback(() => {
    const onEnd = () => {
      setSpeakerTestInProgress(false);
      toast({
        title: "Speaker Test",
        description: "Did you hear the test sound? Click Yes if you heard it.",
        action: (
          <button
            onClick={() => {
              setChecks(prev => ({ ...prev, speaker: true }));
              setSpeakerTestInProgress(false);
            }}
            className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
          >
            Yes, I heard it
          </button>
        ),
      });
    };

    const onErrorPlay = () => {
      setSpeakerTestInProgress(false);
      toast({
        title: "Speaker Test Failed",
        description: "Please ensure your speakers are connected and unmuted",
        variant: "destructive",
      });
    };
    
    const speak = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Hello! My name is Himanshu . You Ai Interviewer. Can you hear me");
        utterance.onstart = () => setSpeakerTestInProgress(true);
        utterance.onend = () => onEnd()
        utterance.onerror=()=>  onErrorPlay()
        speechSynthesis.speak(utterance);
      }
    };
    try {
      speak();
      return true;
    } catch (error) {
      toast({
        title: "Speaker access denied",
        description: "Please check your browser settings",
        variant: "destructive",
      });
      return false;
    }
    
  
  }, [toast]);

  const checkScreenShare = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      setChecks(prev => ({ ...prev, screen: true }));
      return true;
    } catch (error) {
      toast({
        title: "Screen Share Access Denied",
        description: "Please enable screen sharing to continue",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return {
    checks,
    setChecks,
    checkMicrophone,
    checkCamera,
    checkSpeaker,
    checkScreenShare,
  };
}