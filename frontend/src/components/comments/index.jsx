import styles from "./index.module.scss";

export const Comments = ({ topic }) => {
  return (
    <div className={styles.comment}>
      <h1>{topic?.created_by?.username}</h1>
      <p>{topic?.text}</p>
      <p>{topic?.description}</p>
    </div>
  );
};
