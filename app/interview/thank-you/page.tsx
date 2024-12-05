import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
        <p className="text-muted-foreground">
          Your interview has been successfully recorded and submitted. We appreciate
          your time and will review your submission shortly.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button className="w-full">Return Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}