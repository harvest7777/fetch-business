import { RippleButton } from "@/components/ui/ripple-button";
import InteractFetchAgent from "./_components/InteractFetchAgent";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 text-zinc-900">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-semibold">Fetch Business</h1>

        <Link href={"/orders/confirm"}>
          <RippleButton className="font-bold bg-app-purple-background border-app-purple-muted">
            Place Order
          </RippleButton>
        </Link>
        <InteractFetchAgent />
      </div>
    </main>
  );
}
