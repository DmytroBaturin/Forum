import styles from "./index.module.scss";

export const Button = ({ text, style, onClick }) => {
  return (
    <button onClick={onClick} style={style} className={styles.button}>
      {text}
    </button>
  );
};
