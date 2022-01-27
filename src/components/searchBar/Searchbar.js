import React from 'react';
import "./SearchBar.scss";
import { getAuth, signOut } from "firebase/auth";


export default function Searchbar(props) {
    const auth = getAuth();
    function signUserOut () {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <section className='searchBar'>
                <form className='searchBarForm'>
                    <input className='searchBarForm__input' type="text" placeholder='Søg efter øvelse' />
                    <button className='searchBarForm__submit' type="submit"><i className="fas fa-search"></i></button>
                </form>
            </section>
            <button onClick={() => signUserOut()}>Logout</button>
        </>
    )
}
