import QueryProvider from "@/providers/query-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Dev Lens | Project Managing System",
  description: "프로젝트 관리 시스템 데브렌즈",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} flex h-full min-h-dvh flex-col`}>
        <QueryProvider>
          <NuqsAdapter>
            <section className="flex w-full grow overflow-hidden">
              {children}
              <Toaster richColors position="top-center" />
            </section>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
