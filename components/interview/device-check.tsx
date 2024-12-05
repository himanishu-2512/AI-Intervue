"use client";

import { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mic, Video, Speaker, Monitor, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useDeviceCheck } from "@/lib/hooks/use-device-check";

interface DeviceButtonProps {
  icon: any;
  label: string;
  checked: boolean;
  onClick: () => void;
  loading?: boolean;
}

function DeviceButton({ icon: Icon, label, checked, onClick, loading = false }: DeviceButtonProps) {
  return (
    <Button
      variant="outline"
      className={`w-full ${checked ? 'border-green-500' : ''}`}
      onClick={onClick}
      disabled={checked || loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {label}
      {checked ? (
        <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="ml-2 h-4 w-4 text-red-500" />
      )}
    </Button>
  );
}

export function DeviceCheck({ onComplete }: { onComplete: () => void }) {
  const {
    checks,
    speakerTestInProgress,
    checkMicrophone,
    checkCamera,
    checkSpeaker,
    checkScreenShare,
  } = useDeviceCheck();

  useEffect(() => {
    if (Object.values(checks).every(Boolean)) {
      onComplete();
    }
  }, [checks, onComplete]);

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Device Check</h2>
      <Alert>
        <AlertDescription>
          Please check your devices before starting the interview
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DeviceButton
          icon={Mic}
          label="Test Microphone"
          checked={checks.microphone}
          onClick={checkMicrophone}
        />
        <DeviceButton
          icon={Video}
          label="Test Camera"
          checked={checks.camera}
          onClick={checkCamera}
        />
        <DeviceButton
          icon={Speaker}
          label="Test Speaker"
          checked={checks.speaker}
          onClick={checkSpeaker}
          loading={speakerTestInProgress}
        />
        <DeviceButton
          icon={Monitor}
          label="Test Screen Share"
          checked={checks.screen}
          onClick={checkScreenShare}
        />
      </div>
    </Card>
  );
}