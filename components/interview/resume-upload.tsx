"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";



export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  
  useEffect(()=>{
    const handleFileUpload = async () => {
      if (!file) return;
    
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
    
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
    
      try {
        const formData = new FormData();
        formData.append("file", file);
    
        const response = await fetch("/api/parse-resume", {
          method: "POST",
          body: formData,
        });
    
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || "Failed to parse resume";
          throw new Error(errorMessage);
        }
    
        const data = await response.json();
        console.log("Parsed Resume Data:", data);
    
        toast({
          title: "Success",
          description: "Resume parsed successfully!",
        });
    
        setFile(null); // Clear file input for a better user experience
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to parse resume. Please try again.",
          variant: "destructive",
        });
      } finally {
        // setIsLoading(false);
      }
    };
    
    handleFileUpload();
  
  },[file])

 

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Upload Resume
      </label>
      
      <Card
        {...getRootProps()}
        className={`p-8 border-dashed cursor-pointer ${
          isDragActive ? "border-primary" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {file ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
              </div>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Drag & drop your resume here, or click to select
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports PDF, DOC, DOCX
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}