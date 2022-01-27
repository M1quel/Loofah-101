import { Link } from '@reach/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import "./WorkoutCard.scss";

export default function Workoutcard(props) {
    var [imageSrc, setImageSrc] = useState("");
    const storage = getStorage();

    useEffect(function () {
        if (props.imgSrc && props.imgSrc != "") {
            getDownloadURL(ref(storage, props.imgSrc))
            .then((url) => {
                setImageSrc(url);
            })
        }
    }, [props.imgSrc])

    return (
        <>
            <Link to={`/workout/${props.data_id}`} className='workoutCard'>
                <img className='workoutCard__image' src={imageSrc} alt="" />
                <h2 className='workoutCard__title'>{props.title}</h2>
            </Link>
        </>
    )
}
