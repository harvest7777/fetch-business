import { SuccessDisplay } from "./success-display";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SuccessDisplay message="Order success" />
    </div>
  );
}
