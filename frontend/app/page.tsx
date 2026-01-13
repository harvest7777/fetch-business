import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 text-zinc-900">
      <div className="flex flex-col items-center gap-8 text-center w-full max-w-md">
        <h1 className="text-3xl font-semibold">Fetch Business</h1>

        <nav className="w-full">
          <ul className="divide-y-2 divide-border rounded-lg ">
            <li>
              <Link
                href="/orders"
                className="block px-3 py-2 hover:bg-accent transition-colors"
              >
                Orders
              </Link>
            </li>
            <li>
              <span
                className="block px-3 py-2 text-muted-foreground cursor-not-allowed opacity-50"
                aria-disabled="true"
              >
                Restaurants
              </span>
            </li>
            <li>
              <span
                className="block px-3 py-2 text-muted-foreground cursor-not-allowed opacity-50"
                aria-disabled="true"
              >
                Hotels
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
