import { FailedDisplay } from "./failed-display";

export default function FailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <FailedDisplay message="Order failed" />
    </div>
  );
}
