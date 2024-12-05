"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, RefreshCw } from "lucide-react";

export function AIVoiceAssistant({ 
  text, 
  autoPlay = false 
}: { 
  text: string;
  autoPlay?: boolean;
}) {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      speak();
    }
  }, [text]);

  const handleRepeat = () => {
    if (speaking) {
      speechSynthesis.cancel();
    }
    speak();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRepeat}
      className="flex items-center space-x-2"
    >
      {speaking ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      <span>{speaking ? "Speaking..." : "Repeat Question"}</span>
    </Button>
  );
}