import { verifyAPI } from "../utils/endpoints";
import { User } from "../utils/types";

const verifyToken = (
  token: string | undefined,
  onSuccess: (user: User) => void,
  onError: () => void
) => {
  fetch(verifyAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.user.isAdmin) {
        onSuccess(data.user);
      } else {
        onError();
      }
    })
    .catch((err) => {
      onError();
      console.log(err);
    });
};

export default verifyToken;
