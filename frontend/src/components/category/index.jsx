import styles from "./index.module.scss";
import { useEffect } from "react";

export const Category = ({ category }) => {
  const choiseColor = () => {
    if (category.name === "News") {
      return "#62DF16";
    } else if (category.name === "Interesting") {
      return "#e3b33b";
    } else if (category.name === "Sport") {
      return "#561EC8";
    }
  };
  return (
    <div
      style={{
        backgroundColor: choiseColor(category),
      }}
      className={styles.root}
    >
      {category.name}
    </div>
  );
};
