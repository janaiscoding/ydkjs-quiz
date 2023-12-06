import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Background from "./ui/background";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-background py-4 flex justify-center max-auto`}
      >
        <Navbar />
        <main>{children}</main>
        <Background />
      </body>
    </html>
  );
}
