import styles from "./index.module.scss";
import React from "react";

export const Input = ({
  errors,
  onChange,
  type,
  placeholder,
  style,
  value,
}) => {
  const errorMessages = Array.isArray(errors)
    ? errors.map((error, index) => (
        <li key={index} className={styles.error}>
          {error}
        </li>
      ))
    : null;
  return (
    <div className={styles.root}>
      <input
        onChange={onChange}
        value={value}
        style={style}
        placeholder={placeholder}
        type={type}
        className={styles.input}
      />
      {errorMessages}
    </div>
  );
};
