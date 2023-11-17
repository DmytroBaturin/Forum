import styles from './index.module.scss'
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

export const Header = () => {
    const isActive = ({ isActive, isPending, isTransitioning }) => {
            return {
                opacity: isActive ? "0.5" : "1",
            };
    }

    return(
        <div className={styles.root}>
        <div className={styles.header}>
            <div className={styles.logo}>
                <h1>Forum.</h1>
            </div>
            <span className={styles.navbar}>
                <NavLink style={isActive} to='/'>home</NavLink>
                <NavLink style={isActive} to='/topics'>topics</NavLink>
                <NavLink style={isActive} to='/account'>account</NavLink>
            </span>
        </div>
        </div>
    )
}