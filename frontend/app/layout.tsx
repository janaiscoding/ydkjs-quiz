import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Background from "./ui/background";
import Footer from "./components/navigation/Footer";
import { QuizzesContextProvider } from "./context/QuizzesContext";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YDKJS Quiz!",
  description: "A fun, educative JavaScript quiz game. Made by @janaiscoding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QuizzesContextProvider>
        <body
          className={`${roboto.className} tracking-tighter bg-background text-stone-400 min-h-screen flex flex-col justify-between`}
        >
         <main>{children}</main>
          <Footer />
          <Background />
        </body>
      </QuizzesContextProvider>
    </html>
  );
}
