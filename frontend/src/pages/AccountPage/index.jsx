import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectAuthStatus, userInfo} from "../../store/authSlice";
import {Button} from "../../components/button";
import {logOut} from "../../store/actions/auth";
import {usersInfo} from "../../store/usersSlice";
import React, {useEffect} from "react";
import {getUsers} from "../../store/actions/admin";
import {UsersTable} from "../../components/usertable";

export const AccountPage = () => {
  const isAuth = useSelector(selectAuthStatus)
  const user = useSelector(userInfo)
  const users = useSelector(usersInfo)
  const dispatch = useDispatch()

    const handleAuth = () => {
      dispatch(logOut())
    }

    useEffect(() => {
           dispatch(getUsers())
     }, [dispatch])

  return(
      <div className={styles.root}>
        <h1>Account</h1>
        <div className={styles.userContainer}>
          {isAuth ? (
              <>
            <div className={styles.container}>
              <h1>Username: {user.username}</h1>

                {user?.roles.map(role => (
                    <p>{role.role}</p>
                ))}

            </div>
                  {Array.isArray(users) ? (
                      <table className={styles.table}>
                          <thead>
                          <th>Username</th>
                          <th>Roles</th>
                          <th>Actions</th>
                          </thead>
                          {users?.map(user => (
                              <UsersTable
                                  user={user}
                              />))}
                      </table>
                  ) : null}
              <Button
              text='Log out'
              onClick={handleAuth}/>
              </>
          ): (<>Log in please</>)}
          </div>
      </div>
  )
};

