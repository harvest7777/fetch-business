import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FailedDisplayProps {
  message: string;
  className?: string;
}

export function FailedDisplay({ message, className }: FailedDisplayProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="flex size-24 items-center justify-center rounded-full bg-red-100">
        <X className="size-12 text-red-600" strokeWidth={3} />
      </div>
      <p className="text-xl font-semibold text-red-600">{message}</p>
    </div>
  );
}
