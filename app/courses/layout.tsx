import type { Metadata } from "next";
import curriculum from "../curriculum-metadata.json";

export const metadata: Metadata = {};

export default function PrimaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between py-16 gap-4">
      <div className="container">
        <p className="mb-6 text-sm text-muted-foreground">
          Curriculum snapshot:{" "}
          <time dateTime={curriculum.updatedAt}>{curriculum.updatedAt}</time>.{" "}
          <a
            className="underline"
            href="https://learn.cantrill.io/courses/category/aws"
          >
            Check the provider for current course details
          </a>
          .
        </p>
        {children}
      </div>
    </main>
  );
}
