import styles from "./index.module.scss";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigation = useNavigate();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h1>IT Forum.</h1>
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            return navigation("/auth/login");
          }}
          text="Log In"
        />
        <Button
          onClick={() => {
            return navigation("/auth/register");
          }}
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          text="Sign In"
        />
      </div>
    </div>
  );
};
