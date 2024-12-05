"use client";

import { Toast } from "@/components/ui/toast";

type ToastProps = React.ComponentProps<typeof Toast>;

export function useToast() {
  const toast = ({ title, description, action, variant }: ToastProps) => {
    // Implementation of toast functionality
    console.log({ title, description, action, variant });
  };

  return { toast };
}