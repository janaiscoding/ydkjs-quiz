"use client";
import { useEffect } from "react";
import useTokenVerification from "./hooks/useTokenVerification";

export default function Home() {
  useTokenVerification();
  useEffect(() => {}, []);
  return (
    <main className="min-h-screen py-2">
      <h1> My Quiz CMS</h1>
      <h2> My existing quizzes </h2>
    </main>
  );
}
