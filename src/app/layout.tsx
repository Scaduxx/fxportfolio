import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import MainShell from "./components/MainShell"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FX Portfolio",
  description: "My VFX portfolio",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`bg-black text-white ${inter.className}`}>
        <Navbar />
        <MainShell>{children}</MainShell>
      </body>
    </html>
  )
}
