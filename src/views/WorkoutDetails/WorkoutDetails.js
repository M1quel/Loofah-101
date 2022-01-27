import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topBar/TopBar';
import getDocFromCollection from '../../helpers/getDocFromCollection';

export default function Workoutdetails(props) {
    var [workout, setWorkout] = useState({});
    
    useEffect(function () {
        getDocFromCollection("workouts", props.id)
        .then(doc => {
            setWorkout(doc);
            console.log(doc);
        })
    }, [props.id])

    return (
        <>
            <div className="workoutDetails">
                <header>
                    <Topbar
                    pageTitle={workout.name}
                    back={"/"}
                    />
                </header>
            </div>
        </>
    )
}
