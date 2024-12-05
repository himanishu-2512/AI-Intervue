"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mic, MicOff, Loader2, AlertTriangle } from "lucide-react";
import { useMediaRecorder } from "@/hooks/use-media-recorder";
import { toast } from "@/hooks/use-toast";

interface AnswerRecorderProps {
  onAnswerComplete: (audioBlob: Blob) => void;
  timeLimit: number;
  index:number;
}

function AudioPlayer({ audioBlobUrl }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioBlobUrl;
    }
  }, [audioBlobUrl]);

  return (
    <audio ref={audioRef} controls>
      Your browser does not support the audio element.
    </audio>
  );
}

export function AnswerRecorder({ onAnswerComplete, timeLimit,index }: AnswerRecorderProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isRecording, startRecording, stopRecording, audioBlob } = useMediaRecorder(); 
  const [audioUrl, setAudioUrl] = useState<string>('');

  useEffect(()=>{
    setAudioUrl('');
  },[index])
  
  useEffect(() => {
    if (audioBlob) { 
      setAudioUrl(URL.createObjectURL(audioBlob));
    }
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioBlob]);

  useEffect(() => {
    if (isRecording) {
      setTimeLeft(timeLimit); // Reset the timer when recording starts

      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            stopRecording();
            toast({
              title: "Time's up!",
              description: "Oops...",
              variant: "destructive",
            });
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!); // Cleanup on unmount or stop
  }, [isRecording]);

  useEffect(() => {
    if (audioBlob?.size) {
      onAnswerComplete(audioBlob);
    }
  }, [audioBlob]);


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="space-y-4">
      {isRecording && (
        <Alert className="bg-yellow-50 dark:bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="">Time remaining: {formatTime(timeLeft)}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col justify-center items-start space-x-4">
      {audioUrl && (
        <div className="mb-4">
          <h3>Your Answer:</h3>
          <AudioPlayer audioBlobUrl={audioUrl}/>
          <h4>If this answer is perfect then submit otherwise Record again</h4>
        </div>
      )}
        <Button
          variant={isRecording ? "destructive" : "default"}
          onClick={isRecording ? stopRecording : startRecording}
          className="w-40"
        >
          {isRecording ? (
            <>
              <MicOff className="h-4 w-4 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Start Recording
            </>
          )}
        </Button>

        {isRecording && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Recording...
          </div>
        )}
      </div>

      {/* Audio Player */}
      

    </div>
  );
}
