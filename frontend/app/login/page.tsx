"use client";
import { FormEvent, useState } from "react";
import { loginAPI } from "../utils/endpoints";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log("send login ");
      setError("");
    } else {
      console.log("display err");
      setError("Please complete the form!");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="p-10" onSubmit={(e) => onSubmit(e)}>
        <legend>Welcome back!</legend>
        <div className="flex flex-col">
          <label htmlFor="user-email">Your email</label>
          <input
            name="user-email"
            id="user-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="user-password">Password</label>
          <input
            name="user-password"
            id="user-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <h1 className="text-red-600"> {error}</h1>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
export default LoginPage;
