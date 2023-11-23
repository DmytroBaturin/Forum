import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {modalState, openModal} from "../store/modalSlice";

export default function useComponentVisible(initialIsVisible) {
    const modal = useSelector(modalState);
    const dispatch = useDispatch();
    const [isComponentVisible, setIsComponentVisible] =
        useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            if(modal){
                dispatch(openModal(!modal));
            }
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}