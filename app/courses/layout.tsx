import type { Metadata } from "next";

export const metadata: Metadata = {};

export default function PrimaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-16 gap-4">
      <div className="container">{children}</div>
    </main>
  );
}
