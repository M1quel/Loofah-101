import React from 'react';
import "./SearchBar.scss";

export default function Searchbar(props) {
    

    return (
        <>
            <section className='searchBar'>
                <form className='searchBarForm'>
                    <input className='searchBarForm__input' type="text" placeholder='Søg efter øvelse' />
                    <button className='searchBarForm__submit' type="submit"><i className="fas fa-search"></i></button>
                </form>
            </section>
        </>
    )
}
