import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { login, register } from "../../store/actions/auth";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import {
  clearError,
  errorSelector,
  selectAuthStatus,
} from "../../store/authSlice";

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  useEffect(() => {
    resetCredentials();
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
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
        registerUser(userCredentials);
      } else {
        loginUser(userCredentials);
      }
    },
    [dispatch, credentials, action],
  );

  const isRegisterMode = action === "register";
  const switchAuthMode = () => {
    dispatch(clearError());
    resetCredentials();
    navigate(isRegisterMode ? "/auth/login" : "/auth/register");
  };
  console.log(error);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{isRegisterMode ? "Register" : "Login"}</h1>
        <Input
          value={credentials.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Username"
          errors={error?.errors ? Object.values(error.errors.username) : []}
        />
        <Input
          type="password"
          value={credentials.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Password"
          errors={error?.errors ? Object.values(error.errors.password) : []}
        />

        {isRegisterMode && (
          <Input
            type="password"
            value={credentials.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            placeholder="Confirm Password"
            errors={
              error?.errors ? Object.values(error.errors.checkpassword) : []
            }
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
