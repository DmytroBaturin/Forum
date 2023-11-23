import React, {useEffect, useState} from 'react';
import {Button} from "../button";
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, deleteUserRole, getRoles, giveRole} from "../../store/actions/admin";
import useComponentVisible from "../../hooks";
import {allRoles} from "../../store/usersSlice";

export const UsersTable = ({ user }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const dispatch = useDispatch()
    const roles = useSelector(allRoles)

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    const hasRole = (roleName) => {
        return user.roles.some(role => role.role === roleName);
    };

    return (
        <tr>
            <td>{user.username}</td>
            <td style={{
            }}>
            {user?.roles.map(role => (
              <p>{role.role}</p>
            ))}
            </td>
            <td>
                <Button
                    onClick={() => {
                        console.log(user._id)
                       dispatch(deleteUser({
                           userId: user._id
                       }))
                    }}
                    text='Delete'/>
                <Button
                    onClick={() => {
                        setIsComponentVisible(true)
                    }}
                    text='Upgrate'/>
            </td>
            {isComponentVisible ?
                <div className={styles.root}>
                    <div className={styles.overlay}></div>
                <div ref={ref} className={styles.modal}>
                    <div className={styles.container}>
                      <h4>Roles {user.username}</h4>
                        <div className={styles.roles}>
                            {roles?.map(role => (
                                <p onClick={() => {
                                    if(hasRole(role.role)){
                                        dispatch(deleteUserRole(
                                            {
                                                userId: user._id,
                                                roleId: role._id
                                            }
                                        ))
                                    }else{
                                        dispatch(giveRole(
                                            {
                                                userId: user._id,
                                                roleId: role._id
                                            }
                                        ))
                                    }

                                }} className={styles.role} style={hasRole(role.role) ? {
                                    color: 'white',
                                    background: "black"
                                } : {}}>{role.role}</p>
                            ))}
                        </div>

                    </div>
                </div>
                </div>: null}
        </tr>
    );
};

