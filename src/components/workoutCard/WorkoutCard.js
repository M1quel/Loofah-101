import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import "./WorkoutCard.scss";
import { AnimatePresence, motion } from 'framer-motion';

export default function Workoutcard(props) {
    var [imageSrc, setImageSrc] = useState("");
    const storage = getStorage();

    useEffect(function () {
        if (props.imgSrc && props.imgSrc !== "") {
            getDownloadURL(ref(storage, props.imgSrc))
            .then((url) => {
                setImageSrc(url);
            })
        }
        // eslint-disable-next-line
    }, [props.imgSrc])
    return (
        <>
        <AnimatePresence>
            <motion.div
            initial={{opacity: 0, y: "-30px"}}
            animate={{opacity: 1, y: "0"}}
            transition={{duration: 0.2, delay: (props.cardIndex) * 0.11}}
            >
                <Link to={`workout/${props.data_id}`} className='workoutCard'>
                    <img className='workoutCard__image' src={imageSrc != "" ? imageSrc : "./images/placeholder.jpeg"} alt="" />
                    <h2 className='workoutCard__title'>{props.title}</h2>
                </Link>
            </motion.div>
        </AnimatePresence>
        </>
    )
}
