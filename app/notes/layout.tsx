import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { House, User } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      links={[
        {
          text: "Me",
          url: "https://marcusgeorgievski.com",
          icon: <User />,
        },
        // {
        //   text: "Home",
        //   url: "/",
        //   icon: <House />,
        // },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
