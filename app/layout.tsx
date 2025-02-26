import { SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";
import Sidebar from "../components/layout/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <Sidebar>{children}</Sidebar>
        </SidebarProvider>
      </body>
    </html>
  );
}
