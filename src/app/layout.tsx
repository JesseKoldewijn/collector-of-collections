import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/navigation/NavBar";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Librarian",
    absolute: "Librarian",
    template: "%s - Librarian",
  },
  description: "Librarian - A simple way to manage your book collection.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
