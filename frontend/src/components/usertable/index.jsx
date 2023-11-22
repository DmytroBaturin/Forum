import React from 'react';
import {Button} from "../button";
import {useDispatch} from "react-redux";
import {deleteUser} from "../../store/actions/admin";

export const UsersTable = ({ user }) => {
    const dispatch = useDispatch()
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
                    text='Upgrate'/>
            </td>
        </tr>
    );
};

