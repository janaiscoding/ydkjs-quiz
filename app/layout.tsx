import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Background from "./ui/background";
import Navbar from "./components/navigation/navbar";
import Footer from "./components/navigation/footer";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YDKJS - The Quiz!",
  description: "A fun, educative quiz game inspired by You Don't Know JS book, by Kyle Simpson. Made by @janaiscoding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-background py-4 max-md:px-4`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Background />
      </body>
    </html>
  );
}
