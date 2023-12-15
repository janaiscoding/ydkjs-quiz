import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "./context/userContext";
import { QuizzesContextProvider } from "./context/quizzesContext";
import { ViewContextProvider } from "./context/viewContext";
import Footer from "./components/navigation/Footer";
import Navbar from "./components/navigation/Navbar";
import Background from "./components/ui/Background";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz CMS",
  description: "Perform admin operations on YDKJS-Quiz dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} flex flex-col items-center bg-neutral-950 text-neutral-50 min-h-screen`}
      >
        <UserContextProvider>
          <ViewContextProvider>
            <QuizzesContextProvider>
              <Navbar />
              <main className="p-4">
                {children}
              </main>
              <Background />
              <Footer />
            </QuizzesContextProvider>
          </ViewContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
