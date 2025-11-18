import { ThemeProvider } from "@/components/shared/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import StoreProvider from "./store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "ResumeBuilder - Build Your Perfect Career Documents in Minutes",
  description:
    "Create professional resumes, cover letters, and disclosure letters with AI-powered assistance.",
  openGraph: {
    title: "ResumeBuilder - Build Your Perfect Career Documents in Minutes",
    description:
      "Create professional resumes, cover letters, and disclosure letters with AI-powered assistance.",
    url: URL,
    siteName: "ResumeBuilder",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "ResumeBuilder Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeBuilder - Build Your Perfect Career Documents in Minutes",
    description:
      "Create professional resumes, cover letters, and disclosure letters with AI-powered assistance.",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            closeButton
            toastOptions={{
              classNames: {
                error: "bg-red-500/80! text-white! border-red-600!",
                success: "bg-green-500! text-white! border-green-600!",
              },
            }}
          />
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
