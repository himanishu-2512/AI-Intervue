export interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  expectedDuration: number;
}

export interface Answer {
  questionId: string;
  audioBlob: Blob;
}

export interface InterviewSettings {
  jobTitle: string;
  techStack: string;
  duration: number;
  resumeFile: File | null;
}

export interface Score {
  clarity: number;
  relevance: number;
  technicalAccuracy: number;
  overall: number;
  feedback: string;
}