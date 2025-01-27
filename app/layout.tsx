import type { Metadata } from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/themeProvider";
import { CommandDialogDemo } from "@/components/commandDialog";
import { Toaster } from 'sonner'

const montserrat = Montserrat({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "ShelfSpace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
          <body
            className={`${montserrat.className} antialiased`}
          >
          <ThemeProvider
        attribute="class"
        enableSystem
        defaultTheme="system"
        disableTransitionOnChange>
            <Toaster />
            <SidebarProvider>
              <Nav />
              <CommandDialogDemo />
              <main className="w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
