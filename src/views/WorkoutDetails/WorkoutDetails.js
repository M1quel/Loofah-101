import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topBar/TopBar';
import getDocFromCollection from '../../helpers/getDocFromCollection';
import { motion } from 'framer-motion';
import "./WorkoutDetails.scss";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export default function Workoutdetails(props) {
    let { id } = useParams();
    var [imageSrc, setImageSrc] = useState();
    var [workout, setWorkout] = useState({});
    const storage = getStorage();
    
    useEffect(function () {
        getDocFromCollection("workouts", id)
        .then(doc => {
            setWorkout(doc);
            console.log(doc);
        })
        
    }, [id])

    useEffect(function () {
        if (!workout.image) return;
        getDownloadURL(ref(storage, workout.image))
        .then((url) => {
            setImageSrc(url);
        })
    }, [workout.image])

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
                    textInitialAnimation={{ opacity: 0, x: 30 }}
                    textAnimate={{ opacity: 1, x: 0 }}
                    />
                </header>
                <main className='workoutDetailsMain'>
                    {imageSrc && <motion.img 
                    className='workoutDetails__img' 
                    src={imageSrc} 
                    alt="" 
                    initial={{ height: 0 }}
                    animate={{ height: "40vh" }}
                    transition={{duration: 0.3, easings: "anticipate",}}
                    />}

                </main>
            </motion.div>
        </>
    )
}
