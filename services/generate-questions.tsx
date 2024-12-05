import { Question } from '@/lib/types/interview';

interface GeminiAPIResponse {
  questions: {
    text: string;
    category: 'Technical' | 'Behavioral';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    expectedDuration: number;
  }[];
}

export const generateQuestions = async (
  techStack: string,
  experience: string,
  duration: number
): Promise<Question[]> => {
  const prompt = `Generate a list of interview questions for a candidate with ${experience} years of experience in ${techStack}. The total duration should be ${duration} minutes. Include questions of varying difficulty, covering  technical aspects, suitable for a remote interview format. Return the result as a JSON array in the following format: [{ "text": "Question text", "category": "Technical", "difficulty": "Easy/Medium/Hard", "expectedDuration": number }].`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBiX0gPebY-_EN-f1M6xlFHNt5USbwuef0`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"contents":[{"parts":[{"text":prompt}]}]})
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.statusText}`);
    }

    const data: GeminiAPIResponse = await response.json();
    const jsonString=data?.candidates[0].content.parts[0].text
    const cleanedJsonString = jsonString.replace(/```json|\`\`\`/g, '');
    const questionsData=JSON.parse(cleanedJsonString)

    const generatedQuestions: Question[] = questionsData.map((questionData:Question, index:number) => ({
      id: (index + 1).toString(),
      ...questionData
    }));

    return generatedQuestions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate interview questions. Please try again later.');
  }
};

// pages/index.js



