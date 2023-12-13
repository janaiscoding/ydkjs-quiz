import { SetStateAction } from "react";
import { loginAPI } from "../utils/endpoints";

const loginRequest = (
  email: string,
  password: string,
  onSuccess: (token: string) => void,
  onError: (error: string) => void
) => {
  fetch(loginAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        onSuccess(data.token);
      } else {
        onError(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      //Maybe add a generic error pop-up, this is required for 500-errors
    });
};
export default loginRequest;
