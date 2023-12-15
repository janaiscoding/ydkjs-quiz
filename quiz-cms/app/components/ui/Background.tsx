import styles from "./background.module.css";
import React from "react";

// Hey there, the stars background was inspired from the beautiful background design of @alirdev
export default function Background() {
  return (
    <>
      <div className={styles.stars} />
      <div className={styles.stars_2} />
    </>
  );
}