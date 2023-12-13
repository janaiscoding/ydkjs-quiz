import Cookies from "js-cookie";

const getJwtToken = () => {
  return Cookies.get("token");
};

const setJwtToken = (token: string) => {
  return Cookies.set("token", token, { expires: 1 });
};

const removeJwtToken = () => {
  return Cookies.remove("token");
};

export { getJwtToken, setJwtToken, removeJwtToken };