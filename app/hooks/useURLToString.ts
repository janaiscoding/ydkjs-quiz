import { useEffect, useState } from "react";

// this custom hook will take a string and convert it from url to title or reverse
export const useURLToString = (url: string) => {
  const [myString, setString] = useState("");

  useEffect(() => {
    if (url.includes("-")) {
      setString(
        url
          .split("-")
          .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
          })
          .join(" ")
      );
    }
  }, [url]);
  return myString;
};
