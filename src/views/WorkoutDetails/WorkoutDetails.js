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
                initial={{ x: "100vw" }}
                animate={{ x: "0px" }}
                exit={{ x: "100vw" }}
                transition={{ duration: 0.3, easings: "easeInOut"  }}
                layout="position"
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
