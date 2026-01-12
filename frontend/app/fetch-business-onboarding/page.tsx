import InteractFetchAgent from "./components/InteractFetchAgent";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 text-zinc-900">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-semibold">Fetch Business</h1>
        <InteractFetchAgent />
      </div>
    </main>
  );
}
