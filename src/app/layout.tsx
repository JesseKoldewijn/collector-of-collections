import { type Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/navigation/navbar/root";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Collector of Collections",
    absolute: "Collector of Collections",
    template: "%s - Collector of Collections",
  },
  description:
    "Collector of Collections - A simple way to manage collections like books, movies, music and such.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
