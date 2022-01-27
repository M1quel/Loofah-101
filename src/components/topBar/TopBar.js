import { Link } from '@reach/router';
import React, { useState } from 'react';
import "./TopBar.scss";

export default function Topbar(props) {

    return (
        <>
            <Link to={props.back}>Tilbage</Link>
            <h1>{props.pageTitle}</h1>
        </>
    )
}
