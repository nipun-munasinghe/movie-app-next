import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Providers from "./Providers";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import { Suspense } from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Movie Radar ",
  description: "This is a movie radar app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Header />
          <Suspense fallback={<div className="flex dark:bg-green-500 bg-green-100 p-5 lg:text-lg justify-center gap-6">Loading navigation...</div>}>
            <Navbar />
          </Suspense>
          <SearchBox />
          {children}
        </Providers>
      </body>
    </html>
  );
}