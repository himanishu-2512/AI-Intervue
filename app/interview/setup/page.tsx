"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ResumeUpload } from "@/components/interview/resume-upload";
import { DeviceCheck } from "@/components/interview/device-check";

export default function InterviewSetup() {
  const router = useRouter();
  const [duration, setDuration] = useState(30);
  const [jobTitle, setJobTitle] = useState("");
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");
  const [deviceCheckComplete, setDeviceCheckComplete] = useState(true);

  const handleStart = async () => {
    if (jobTitle && techStack && deviceCheckComplete&&experience) {
      console.log(techStack, duration, experience);
      router.push(`/interview/session/${techStack}:${duration}:${experience}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">Interview Setup</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Position</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience in years</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g. 3 years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack">Primary Technology</Label>
              <Select value={techStack} onValueChange={setTechStack}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="node">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Interview Duration (minutes)</Label>
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                min={15}
                max={60}
                step={5}
              />
              <p className="text-sm text-muted-foreground">
                {duration} minutes
              </p>
            </div>
          </div>
        </Card>

        <DeviceCheck onComplete={() => setDeviceCheckComplete(true)} />

        <Button
          className="w-full"
          size="lg"
          onClick={handleStart}
          disabled={!jobTitle || !techStack || !deviceCheckComplete||!experience}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}
