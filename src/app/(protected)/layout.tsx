import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui";

export const dynamic = "force-dynamic";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="inset h-full w-full overflow-hidden px-6 py-2">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
