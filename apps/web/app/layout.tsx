import "./globals.css"

import type { Metadata } from "next"
import Head from "next/head"
import NextTopLoader from "nextjs-toploader"

import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/theme-provider"
import SessionProviderWrapper from "@/components/wrappers/SessionProvider"
import { SolanaProvider } from "@/components/wrappers/SolanaProvider"
import Toaster from "@/components/wrappers/SonnerToaster"

export const metadata: Metadata = {
  title: "Vaxchain App",
  description:
    "Safe, efficient, and rewarding vaccine storage with DePIN and IoT on Solana",
  openGraph: {
    type: "website",
    description:
      "Safe, efficient, and rewarding vaccine storage with DePIN and IoT on Solana",
    title: "Vaxchain",
    url: "https://vaxchain.xyz",
    images: [
      {
        url: "http://res.cloudinary.com/anishde12020/image/upload/v1697432175/kupxob5ezzgiachzo8r1.png",
        width: 1920,
        height: 1080,
        alt: "Vaxchain",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "http://res.cloudinary.com/anishde12020/image/upload/v1697432175/kupxob5ezzgiachzo8r1.png",
        width: 1920,
        height: 1080,
        alt: "Vaxchain",
      },
    ],
    title: "Vaxchain",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />

        <meta name="msapplication-TileColor" content="#010101" />
        <meta name="theme-color" content="#010101" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
      </head>

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
  )
}
