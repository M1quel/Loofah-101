import { Link } from 'react-router-dom';
import React from 'react';
import "./TopBar.scss";

export default function Topbar(props) {

    return (
        <>
        <nav className='topBar'>
            <Link className='topBar__back' to={props.back}><i className="fas fa-chevron-left"></i></Link>
            <h1>{props.pageTitle}</h1>
        </nav>
        </>
    )
}
