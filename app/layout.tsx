import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Background from "./ui/background";
import Footer from "./components/navigation/footer";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YDKJS - The Quiz!",
  description:
    "A fun, educative quiz game inspired by You Don't Know JS book, by Kyle Simpson. Made by @janaiscoding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} tracking-tighter bg-background p-4 text-stone-400 min-h-screen flex flex-col items-center justify-between`}
      >
        <main className="mx-auto max-w-5xl">{children}</main>
        <Footer />
        <Background />
      </body>
    </html>
  );
}
