import { Link } from '@reach/router';
import React from 'react';
import "./Navigation.scss";

export default function Navigation(props) {
    

    return (
        <>
            <nav className='primaryNavigation'>
                <ul className='primaryNavigationList'>
                    <li className='primaryNavigationList__item'>
                        <Link className='link' to="/">
                            <img src="https://via.placeholder.com/30.png" alt="" />
                        </Link>
                    </li>
                    <li className='primaryNavigationList__item'>
                        <Link className='link' to="/records">
                            <img src="https://via.placeholder.com/30.png" alt="" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
