"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { BookText } from 'lucide-react';
import { Mic } from 'lucide-react';
import { MessageSquareMore } from 'lucide-react';
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center space-x-3">
            <BrainCircuit className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">AI Interview Assistant</h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Experience the future of job interviews with our AI-powered interview simulator.
            Upload your resume, practice with dynamic questions, and receive instant feedback.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mt-12">
            <Card className="p-6 hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
            <BookText className="w-12 h-auto mb-5 stroke-2"/>
              <h3 className="text-lg font-semibold mb-2">Resume Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Our AI analyzes your resume to create personalized interview questions
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
              <Mic className="w-12 h-auto mb-5 stroke-2"/>
              <h3 className="text-lg font-semibold mb-2">Voice Recognition</h3>
              <p className="text-muted-foreground mb-4">
                Speak naturally while our system records and analyzes your responses
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
              <MessageSquareMore className="w-12 h-auto mb-5 stroke-2"/>
              <h3 className="text-lg font-semibold mb-2">Smart Feedback</h3>
              <p className="text-muted-foreground mb-4">
                Get detailed feedback and scoring on your interview performance
              </p>
            </Card>
          </div>

          <Link href="/interview/setup">
            <Button size="lg" className="mt-8">
              Start Your Interview
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}