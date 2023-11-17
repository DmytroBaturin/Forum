import styles from './index.module.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthStatus, userInfo} from "../../store/authSlice";
import {Button} from "../../components/button";
import {logOut} from "../../store/actions/auth";

export const AccountPage = () => {
  const isAuth = useSelector(selectAuthStatus);
  const user = useSelector(userInfo);
  console.log(user)
  const dispatch = useDispatch()
    const handleAuth = () => {
      dispatch(logOut())
    }
  return(
      <div className={styles.root}>
        <h1>Account</h1>
        <div className={styles.userContainer}>
          {isAuth ? (<>
            <div className={styles.container}>
              <h1>Username: {user.username}</h1>
              <p>Id: {user._id}</p>
              <div className={styles.roles}>
                {user?.roles.map(role => (
                    <p>{role}</p>
                ))}

              </div>
            </div>
              <Button
              text='Log out'
              onClick={handleAuth}
          />
          </>): (<>Log in please</>)}
          </div>

      </div>
  )
};

