import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { AppProvider } from "@/context/app.context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cantrill AWS Courses Curriculum Comparer",
	// description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<HydrationOverlay>
					<AppProvider>
            {children}
            <Analytics debug={false} />
          </AppProvider>
				</HydrationOverlay>
			</body>
		</html>
	);
}
