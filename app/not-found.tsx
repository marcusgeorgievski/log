import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Layout from "./(home)/layout";

function NotFoundLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center border-b border-transparent hover:border-b-muted-foreground"
    >
      {children} <ExternalLink height={16} />
    </Link>
  );
}

export default function NotFound() {
  return (
    <Layout>
      <div className="flex items-center justify-center pt-[200px]">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="font-mono">404</h2>
          <div className="flex gap-4">
            <NotFoundLink href="/">Home</NotFoundLink>
            <NotFoundLink href="/notes">Notes</NotFoundLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}
