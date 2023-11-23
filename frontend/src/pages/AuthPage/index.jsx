import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { login, register } from "../../store/actions/auth";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { selectAuthStatus } from "../../store/authSlice";

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { action } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const isAuth = useSelector(selectAuthStatus);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const resetCredentials = () =>
    setCredentials({
      username: "",
      password: "",
      confirmPassword: "",
    });

  const handleInputChange = (type, value) => {
    setCredentials((prev) => ({ ...prev, [type]: value }));
  };

  const registerUser = (userCredentials) => {
    dispatch(register(userCredentials))
      .unwrap()
      .then(() => resetCredentials());
  };

  const loginUser = (userCredentials) => {
    dispatch(login(userCredentials))
      .unwrap()
      .then(() => resetCredentials());
  };

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { username, password, confirmPassword } = credentials;
      const userCredentials = { username, password };

      setIsClicked(true);

      if (action === "register") {
        if (password !== confirmPassword) {
          console.log("Passwords do not match.");
          return;
        }
        registerUser(userCredentials);
      } else {
        loginUser(userCredentials);
      }
    },
    [dispatch, credentials, action],
  );

  useEffect(() => {
    if (isAuth && isClicked) {
      navigate("/topics");
      setIsClicked(false);
    }
  }, [isAuth, isClicked, navigate]);

  const isRegisterMode = action === "register";
  const switchAuthMode = () => {
    navigate(isRegisterMode ? "/auth/login" : "/auth/register");
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{isRegisterMode ? "Register" : "Login"}</h1>
        <Input
          value={credentials.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Username"
        />

        <Input
          type="password"
          value={credentials.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Password"
        />

        {isRegisterMode && (
          <Input
            type="password"
            value={credentials.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            placeholder="Confirm Password"
          />
        )}
        <div className={styles.button}>
          <Button
            onClick={handleFormSubmit}
            text={isRegisterMode ? "Register" : "Login"}
          />
          <p>
            {isRegisterMode
              ? "Do you have an account? "
              : "Don't you have an account? "}
            <span onClick={switchAuthMode}>
              {isRegisterMode ? "Log in" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
