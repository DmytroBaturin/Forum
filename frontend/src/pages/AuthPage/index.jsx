import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './index.module.scss';
import { login, register } from '../../store/actions/auth';
import {Input} from "../../components/input";
import {Button} from "../../components/button";
import {selectAuthStatus} from "../../store/authSlice";

export const AuthPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { action } = useParams();
    const [click, setClick] = useState(false)
    const isAuth = useSelector(selectAuthStatus);
    const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' });

    const handleInputChange = (type, value) => {
        setCredentials(prev => ({ ...prev, [type]: value }));
    };

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();
        if (action === 'register' && credentials.password !== credentials.confirmPassword) {
            console.log('Passwords do not match.');
            return;
        }
        const userCredentials = { username: credentials.username, password: credentials.password };
        setClick(true)
        if (action === 'register') {
            dispatch(register(userCredentials)).unwrap()
                .then(r => {
                    if(r.ok){
                        setClick(true)
                    }
                })
        } else {
            dispatch(login(userCredentials)).unwrap()
                .then(r => {
                if(r.ok){
                    setClick(true)
                }
            })
        }
    }, [dispatch, credentials, action]);

    useEffect(() => {
        if (isAuth && click === true) {
            navigate('/topics');
            setClick(false)
        }
    }, [isAuth]);

    const isRegisterMode = action === 'register';

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1>{isRegisterMode ? 'Register' : 'Login'}</h1>
                <Input
                    value={credentials.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder='Username'
                />
                <Input
                    type='password'
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder='Password'
                />
                {isRegisterMode && (
                    <Input
                        type='password'
                        value={credentials.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder='Confirm Password'
                    />
                )}
                <div className={styles.button}>
                    <Button onClick={handleFormSubmit} text={isRegisterMode ? 'Register' : 'Login'} />
                    <p>
                        {isRegisterMode ? 'Do you have an account? ' : "Don't you have an account? "}
                        <span onClick={() => navigate(isRegisterMode ? '/auth/login' : '/auth/register')}>
                            {isRegisterMode ? 'Log in' : 'Sign in'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

