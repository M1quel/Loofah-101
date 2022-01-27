
import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/searchBar/Searchbar';
import "./Home.scss";
import getEverything from '../../helpers/getEverythingFromColection';
import Workoutcard from '../../components/workoutCard/WorkoutCard';


export default function Home(props) {
    var [workouts, setWorkouts] = useState([]);

    useEffect(function () {
        getEverything("workouts")
        .then(data => setWorkouts(data));
    }, [])
    return (
        <>
            <div className="home">
                <Searchbar/>
                <section className='homeContent'>
                    {workouts.map(item => {
                        var docData = item.data();
                        return <Workoutcard
                        data_id={item.id}
                        title={docData.name}
                        description={docData.desctiption}
                        key={docData.name}
                        imgSrc={docData.image}
                        />
                    })}
                </section>
            </div>

        </>
    )
}
