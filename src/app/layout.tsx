import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/ui/floating-contact";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Web Squad | Design, Develop, Automate, Grow",
  description: "Sri Web Squad is a software company providing Website Development, Mobile App Development, AI Automation, Business Software, and Custom Software Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Logo Watermark Background (Fills Screen) */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.12] bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat" />
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <FloatingContact />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
