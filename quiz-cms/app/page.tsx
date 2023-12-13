"use client";
import { useEffect } from "react";
import useTokenVerification from "./hooks/useTokenVerification";

export default function Home() {
  useTokenVerification();
  useEffect(() => {}, []);
  return (
    <main className="min-h-screen py-2">
      <h1 className="text-3xl"> Add your new question</h1>
    </main>
  );
}
