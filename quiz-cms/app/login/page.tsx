"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import loginRequest from "../api_functions/login_request";
import { getJwtToken, removeJwtToken, setJwtToken } from "../utils/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const onSucces = (token: string) => {
    setJwtToken(token);
    router.push("/");
  };

  const onError = (errorMsg: string) => {
    setLoginError(errorMsg);
  };
  const onLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    loginRequest(email, password, onSucces, onError);
  };
  
  useEffect(() => {
    if (getJwtToken()) {
      removeJwtToken();
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 text-slate-50">
      <form className="flex flex-col gap-4" onSubmit={(e) => onLogin(e)}>
        <legend className="text-indigo-400 text-4xl">Log in </legend>
        <label className="flex flex-col">
          <span>Email</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-slate-950 h-10 p-2"
          />
        </label>
        <label className="flex flex-col">
          <span>Password</span>
          <input
            type="password"
            className="text-slate-950 h-10 p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="text-center text-white bg-slate-500 rounded py-2 w-full"
          aria-label="Sign in button"
        >
          Log In
        </button>
      </form>

      <p className="text-indigo-400 text-sm">
        P.S.: You need an admin account, sorry :/
      </p>

      {loginError && <p> {loginError}</p>}
    </div>
  );
};

export default LoginPage;
