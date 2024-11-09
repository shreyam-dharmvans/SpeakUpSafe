import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import Wrapper from "@/context/Wrapper";






const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpeakUpSafe",
  description: "SpeakUpSafes to share feedback without revealing identity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Wrapper>
            {children}
          </Wrapper>
        </body>
      </AuthProvider>
    </html>
  );
}
