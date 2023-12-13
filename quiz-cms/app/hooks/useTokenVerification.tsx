/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import { User } from "../utils/types";
import { getJwtToken, removeJwtToken } from "../utils/auth";
import verifyToken from "../api_functions/verify_token";

// Handles the logic for verifying token. Will set the user for valid, and clean-up if invalid. Returns valid boolean.
const useTokenVerification = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  const onSuccess = (user: User) => {
    userContext.setUser(user);
  };

  const onError = () => {
    // Remove the expired/invalid token
    removeJwtToken();
    // Clear context
    userContext.setUser(null);
    // Redirect to login
    router.push("/login");
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, onSuccess, onError);
    }
    if (!token) {
      onError();
    }
  }, []);
};

export default useTokenVerification;
