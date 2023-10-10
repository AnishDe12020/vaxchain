import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SolanaProvider } from "@/components/wrappers/SolanaProvider";
import SessionProviderWrapper from "@/components/wrappers/SessionProvider";
import Toaster from "@/components/wrappers/SonnerToaster";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Vaxchain App",
  description: "vaccine supply chain built on solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans bg-background antialiase">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SolanaProvider>
            <SessionProviderWrapper>
            <Header />
              <NextTopLoader
                color="#ffffff"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
              <Toaster />
              {children}
            </SessionProviderWrapper>
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
