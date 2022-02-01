import { Link } from 'react-router-dom';
import React from 'react';
import "./TopBar.scss";
import { motion } from "framer-motion";

export default function Topbar(props) {

    return (
        <>
        <nav className='topBar'>
            <Link className='topBar__back' to={props.back}><i className="fas fa-chevron-left"></i> Tilbage</Link>
            <motion.h1
            initial={props.textInitialAnimation}
            animate={props.textAnimate}
            transition={{duration: 0.3, delay: 0.15}}
            >{props.pageTitle}</motion.h1>
        </nav>
        </>
    )
}
