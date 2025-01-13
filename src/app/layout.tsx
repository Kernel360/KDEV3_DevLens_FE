import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";

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
      <body className={`${pretendard.variable}`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <NuqsAdapter>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="inset w-full overflow-hidden">
              <section className="h-full min-h-dvh w-full overflow-hidden px-6 py-2">
                {children}
              </section>
            </SidebarInset>
          </SidebarProvider>
        </NuqsAdapter>

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
