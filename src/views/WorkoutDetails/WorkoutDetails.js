import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topBar/TopBar';
import getDocFromCollection from '../../helpers/getDocFromCollection';
import { AnimatePresence, motion } from 'framer-motion';
import "./WorkoutDetails.scss";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getEverything from "../../helpers/getEverythingFromColection";
import Contentgroup from '../../components/contentGroup/ContentGroup';
import Userrecordcard from '../../components/userRecordCard/UserRecordCard';
import Modal from "../../components/modal/Modal";

export default function Workoutdetails(props) {
    var auth = getAuth();
    let { id } = useParams();
    var [imageSrc, setImageSrc] = useState();
    var [workout, setWorkout] = useState({});
    var [userRecords, setUserRecords] = useState([]);
    var [recordModal, setRecordModal] = useState(false);
    console.log(recordModal);
    const storage = getStorage();
    
    // Get the current workout
    useEffect(function () {
        getDocFromCollection("workouts", id)
        .then(doc => {
            setWorkout(doc);
        })
        
    }, [id])

    // get the image of the current workout
    useEffect(function () {
        if (!workout.image) return;
        getDownloadURL(ref(storage, workout.image))
        .then((url) => {
            setImageSrc(url);
        })
    }, [workout.image])

    // Get all userRecords for workout
    useEffect(function () {
        updateRecords();
    }, [auth.currentUser])

    function updateRecords() {
        if (!auth.currentUser) return;
        var clause = where("userId", "==", auth.currentUser.uid);
        var clause2 = where("workoutId", "==", id);
        getEverything("userRecords", clause, clause2)
        .then(docs => setUserRecords(docs));
    }


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
                    <div className="content">
                        <motion.p
                            className='content__description'
                            initial={{y: -20, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.3, duration: 0.3}}
                        >{ workout.description }</motion.p>

                        <Contentgroup delay={0.4}>
                            <h1 className="contentGroup__title">Muskler</h1>
                            <div className="itemWrapper">
                                {workout.muscels?.map((muscle, index) => {
                                    return <p key={index}>{muscle.name}</p>
                                })}
                            </div>
                        </Contentgroup>

                        {userRecords.length > 0 && <Contentgroup delay={0.5}>
                            <h1 className='contentGroup__title'>Dine rekorder</h1>
                            <div className="itemWrapper userRecords">
                                {userRecords.map((doc, index) => {
                                    var docData = doc.data();
                                    return <Userrecordcard 
                                        delay={index + 1} 
                                        key={index}
                                        parentDelay={0.6} 
                                        onClick={() => setRecordModal({
                                            title: "Record details",
                                            recordId: doc.id,
                                            recordDetails: {
                                                repetitions: docData.repetitions,
                                                weight: docData.weight
                                            },
                                            userId: auth?.currentUser?.uid
                                        })}
                                        repetitions={docData.repetitions}
                                        weight={docData.weight}
                                    />
                                })}
                            </div>
                            <button className='contentGroup__addRecord' onClick={() => setRecordModal({
                                            workoutId: id,
                                            userId: auth?.currentUser?.uid,
                                            mode: "add"
                                        })}>
                                Add new record
                            </button>
                        </Contentgroup>}
                        
                        <AnimatePresence>
                            {recordModal && <Modal 
                                setRecordModal={setRecordModal}
                                recordData={recordModal}
                                update={updateRecords}
                            />}
                        </AnimatePresence>
                        
                    </div>

                </main>
            </motion.div>
        </>
    )
}
