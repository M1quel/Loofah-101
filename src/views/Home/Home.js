import { navigate } from '@reach/router';
import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/searchBar/Searchbar';
import "./Home.scss";
import { where } from "firebase/firestore";
import getEverything from '../../helpers/getEverythingFromColection';

export default function Home(props) {
    var [workouts, setWorkouts] = useState([]);
    
    useEffect(function () {
        getEverything("workouts", where("name", "==", "Curls"))
        .then(data => setWorkouts(data));
    }, [])
    return (
        <>
            <div className="home">
                <Searchbar/>
                <section>
                    {workouts.map(item => {
                        return <p>{item.name}</p>
                    })}
                </section>
            </div>

        </>
    )
}
