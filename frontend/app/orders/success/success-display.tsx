import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessDisplayProps {
  message: string;
  className?: string;
}

export function SuccessDisplay({ message, className }: SuccessDisplayProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="flex size-24 items-center justify-center rounded-full bg-green-100">
        <Check className="size-12 text-green-600" strokeWidth={3} />
      </div>
      <p className="text-xl font-semibold text-green-600">{message}</p>
    </div>
  );
}
