import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topBar/TopBar';
import getDocFromCollection from '../../helpers/getDocFromCollection';
import { motion } from 'framer-motion';
import "./WorkoutDetails.scss";

export default function Workoutdetails(props) {
    let { id } = useParams();
    var [workout, setWorkout] = useState({});
    
    useEffect(function () {
        getDocFromCollection("workouts", id)
        .then(doc => {
            setWorkout(doc);
            console.log(doc);
        })
    }, [id])

    return (
        <>
            <motion.div 
                className="workoutDetails"
                initial={{ x: "100vw", opacity: 0, position: 'absolute', zIndex: 999 }}
                animate={{ x: "0px", opacity: 1, position: "static"}}
                exit={{ x: "100vw", opacity: 0, position: 'absolute', zIndex: 999 }}
                transition={{ duration: 0.2, delay: 0.1 }}
            >
                <header>
                    <Topbar
                    pageTitle={workout.name}
                    back={"/"}
                    />
                </header>
            </motion.div>
        </>
    )
}
