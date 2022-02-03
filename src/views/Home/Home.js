
import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/searchBar/Searchbar';
import "./Home.scss";
import getEverything from '../../helpers/getEverythingFromColection';
import Workoutcard from '../../components/workoutCard/WorkoutCard';
import { motion } from 'framer-motion';
import { collection, query } from 'firebase/firestore';
import { db } from "../../base";
import confirmAuth from '../../helpers/confirmAuth';

export default function Home(props) {
    var [workouts, setWorkouts] = useState([]);

    useEffect(function () {
        if (confirmAuth()) {
            let q = query(collection(db, "workouts"))
            getEverything(q)
            .then(data => setWorkouts(data));
        }
    }, [])
    return (
        <>
            <motion.div 
                className="home"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{duration: 0.3}}
                layout="position"
            >
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
            </motion.div>

        </>
    )
}
