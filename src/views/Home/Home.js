
import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/searchBar/Searchbar';
import "./Home.scss";
import getEverything from '../../helpers/getEverythingFromColection';
import Workoutcard from '../../components/workoutCard/WorkoutCard';
import { motion } from 'framer-motion';

export default function Home(props) {
    var [workouts, setWorkouts] = useState([]);

    useEffect(function () {
        getEverything("workouts")
        .then(data => setWorkouts(data));
    }, [])
    return (
        <>
            <motion.div 
                className="home"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8, position: 'absolute' }}
                transition={{ duration: 0.3 }}
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
