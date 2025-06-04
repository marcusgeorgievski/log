import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <p className="text-fd-muted-foreground">
        Go to{" "}
        <Link
          href="/notes"
          className="text-fd-foreground font-semibold underline"
        >
          /notes
        </Link>
        .
      </p>
    </main>
  );
}
