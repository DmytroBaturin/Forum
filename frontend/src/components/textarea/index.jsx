import styles from "./index.module.scss";
import React from "react";

export const Textarea = ({
  error,
  placeholder,
  onChange,
  value,
  style,
  onClick,
}) => {
  return (
    <div className={styles.root}>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        style={style}
        className={styles.textarea}
      >
        {value}
      </textarea>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};
