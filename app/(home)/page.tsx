"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const timer = 2;
  const [count, setCount] = useState(timer);

  useEffect(() => {
    if (count === 0) {
      redirect("/notes");
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <main className="flex flex-1 flex-col gap-4 justify-center text-center">
      <p className="text-fd-muted-foreground">Nothing here yet</p>
      <p className="text-fd-muted-foreground">
        Redirecting to{" "}
        <Link
          href="/notes"
          className="text-fd-foreground font-semibold underline"
        >
          /notes
        </Link>{" "}
        in {count}...
      </p>
    </main>
  );
}
