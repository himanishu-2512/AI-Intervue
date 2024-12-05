"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/interview/question-display";
import { AnswerRecorder } from "@/components/interview/answer-recorder";
import { generateQuestions } from "@/services/generate-questions";
import { Question, Answer } from "@/lib/types/interview";
import VideoRecorder from "@/components/interview/video-recorder";
import ScreenSharing from "@/components/interview/screen-sharing";
import { useParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";


export default function Page() {
  const { id } = useParams(); // Dynamic param based on the URL
  const idArray=id.split("%3A");
  const router= useRouter()
  const [timeLeft, setTimeLeft] = useState(idArray[1]*60);
  const [answerTimeLeft, setAnswerTimeLeft] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAnswer,setCurrentAnswer]=useState<Answer>();
  const [submitAnswer,setSubmitAnswer]=useState<boolean>(false);

  // Fetch the questions dynamically based on the tech
  const call=useCallback(() => {
    const fetchQuestions = async () => {
      try {
        const generatedQuestions = await generateQuestions(idArray[0],idArray[2],idArray[1]); // Assuming 'id' is used for filtering
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(()=>{
call();
  },[])
  // Global Interview Timer
  useEffect(() => {
    if(questions){
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);}
  }, [questions]);

  // Answer Time Limit Timer
  useEffect(() => {
    if (answerTimeLeft === 0) return;

    const answerTimer = setInterval(() => {
      setAnswerTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(answerTimer);
  }, [answerTimeLeft, currentQuestionIndex]);

  const handleAnswerComplete = (audioBlob: Blob) => {
    const answer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      audioBlob,
    };
    setCurrentAnswer(answer);
    setAnswers((prev) => [...prev, answer]);
  };

  const handleNext = async() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
    if (
      !answers.some((a) => a.questionId === questions[currentQuestionIndex].id)
    ) {
      alert("Please answer the current question before proceeding.");
      return;
    }
    else{
      setSubmitAnswer(true);
      try {
        const formData = new FormData();
        formData.append("audioChunk", currentAnswer?.audioBlob);
        formData.append("answerId",currentAnswer?.questionId);
  
        await fetch("/api/upload-audio-chunk", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Failed to send video chunk:", error);
      }
      finally{
        setSubmitAnswer(false)
      }

    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswerTimeLeft(questions[currentQuestionIndex].expectedDuration); // Reset answer timer for next question
    }
    else{
      router.push("/interview/thank-you");
    }
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }
  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const isNextDisabled =
    !answers.some((a) => a.questionId === questions[currentQuestionIndex].id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-3">
        <Progress value={((currentQuestionIndex+1)/questions.length)*100} className="w-[60vw] my-[50px] mx-auto"/>
        <Label className="text-black text-md mx-auto">{currentQuestionIndex+1} out of {questions.length} </Label>
        </div>
      
        <div className="max-w-4xl mx-auto space-y-8">
          <VideoRecorder />
          <QuestionDisplay
            question={questions[currentQuestionIndex]}
            currentNumber={currentQuestionIndex + 1}
            totalTime={idArray[1]*60}
            timeLeft={timeLeft}
            handleAnswerComplete={handleAnswerComplete}
          />
          <div className="flex justify-between">
            <Button className="px-7" onClick={handleNext} disabled={isNextDisabled||submitAnswer}>
              {currentQuestionIndex===questions.length - 1?"Submit":"Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
