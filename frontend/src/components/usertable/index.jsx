import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  deleteUserRole,
  getRoles,
  giveRole,
} from "../../store/actions/admin";
import { allRoles } from "../../store/usersSlice";
import useComponentVisible from "../../hooks";
import { Button } from "../button";
import styles from "./index.module.scss";

export const UsersTable = ({ user }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const dispatch = useDispatch();
  const roles = useSelector(allRoles);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const handleRoleClick = (role) => {
    const action = user.roles.some((userRole) => userRole.role === role.role)
      ? deleteUserRole
      : giveRole;

    dispatch(
      action({
        userId: user._id,
        roleId: role._id,
      }),
    );
  };

  const getRoleStyle = (roleName) => ({
    color: user.roles.some((role) => role.role === roleName) ? "white" : null,
    background: user.roles.some((role) => role.role === roleName)
      ? "black"
      : null,
  });

  return (
    <tr>
      <td>{user.username}</td>
      <td>
        {user?.roles.map((role) => (
          <p key={role._id}>{role.role}</p> // Added key for React list rendering
        ))}
      </td>
      <td>
        <Button
          onClick={() => dispatch(deleteUser({ userId: user._id }))}
          text="Delete"
        />
        <Button onClick={() => setIsComponentVisible(true)} text="Upgrade" />
      </td>
      {isComponentVisible && (
        <div className={styles.root}>
          <div className={styles.overlay} />
          <div ref={ref} className={styles.modal}>
            <div className={styles.container}>
              <h4>Roles {user.username}</h4>
              <div className={styles.roles}>
                {roles.map((role) => (
                  <p
                    key={role._id}
                    onClick={() => handleRoleClick(role)}
                    className={styles.role}
                    style={getRoleStyle(role.role)}
                  >
                    {role.role}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};
