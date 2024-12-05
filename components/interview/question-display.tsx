"use client";

import { Question } from "@/lib/types/interview";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AIVoiceAssistant } from "./ai-voice-assistant";
import { AnswerRecorder } from "./answer-recorder";
import { useEffect, useState } from "react";
import { useMediaRecorder } from "@/hooks/use-media-recorder";
useMediaRecorder

interface QuestionDisplayProps {
  question: Question;
  currentNumber: number;
  totalTime: number;
  timeLeft: number;
  handleAnswerComplete: (audioBlob: Blob) => void;
}

export function QuestionDisplay({ 
  question, 
  currentNumber, 
  totalTime, 
  timeLeft,
  handleAnswerComplete
}: QuestionDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Question {currentNumber}</h2>
          <p className="text-muted-foreground">
            Time Remaining: {formatTime(timeLeft)}
          </p>
        </div>
        <Progress 
          value={(timeLeft/totalTime)*100} 
          className="w-32" 
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-lg">{question.text}</p>
          <AIVoiceAssistant text={question.text} autoPlay />
        </div>
      </div>
      
    <div className="my-12">
    <AnswerRecorder
    onAnswerComplete={handleAnswerComplete}
    timeLimit={question.expectedDuration*60}
    index={currentNumber}
  />
  
    </div>
    
  </Card>
  );
}