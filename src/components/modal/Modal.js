import React from 'react';
import "./Modal.scss";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { db } from "../../base";
import { doc, updateDoc, addDoc, collection, query, where, setDoc } from "firebase/firestore";
import getEverything from '../../helpers/getEverythingFromColection';

export default function Modal(props) {
    var [mode, setMode] = useState(false);

    
    useEffect(function () {
        if (props.recordData?.mode == "add") {
            setMode("add");
        } else {
            setMode("view");
        }
    }, [])
    function handleExit (e) {
        if (e.target.classList.contains("overlay")) {
            props.setRecordModal(false);
        }
    }
    async function handleAddRecord () {
        let addData = {
            repetitions: parseInt(window.addRepetitionsInput?.value),
            weight: parseInt(window.addWeightInput?.value),
            userId: props.recordData?.userId,
            workoutId: props.recordData?.workoutId
        }
        let q = query(collection(db, "userRecords"), where("workoutId", "==", props.recordData?.workoutId), where("userId", "==", props.recordData?.userId), where("repetitions", "==", addData.repetitions));
        var docCheck = await getEverything(q)
        .then(docData => {
            console.log(docData);
            if (docData.length > 0) {
               return docData[0].data();
            }
            return false;
        });
        if (docCheck) {
            console.log(docCheck.workoutId);
            let recordRef = doc(db, "userRecords", docCheck.workoutId);
            console.log(recordRef);
            await setDoc(recordRef, addData)
            .then(() => {
                props.update();
                props.setRecordModal(false);

            });
        } else {
            const docRef = await addDoc(collection(db, "userRecords"), addData);
            if (docRef) {
                props.setRecordModal(false);
                props.update();
            }
        }

    }

    return (
        <>
            <motion.div 
            className='overlay' 
            onClick={(e) => handleExit(e)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            transition={{ duration: 0.15}}
            >
                <motion.div 
                initial={{y: "100%"}}
                animate={{y: 0}}
                exit={{y: "100%"}}
                transition={{duration: 0.15, ease: 'easeOut'}}
                className='overlay__content'>

                    {/* User clicked a record and is viewing it */}
                    <AnimatePresence initial={false}>
                        {mode == "view" && <motion.div 
                            className='overlay__content--view'
                            initial={{x: "-200%"}}
                            animate={{x: 0}}
                            exit={{x: "-200%"}}
                            transition={{duration: 0.2}}
                        >

                            <h1 className='modalHeading'>{props.recordData.title}</h1>
                            <div className='modalStats'>
                                <p><i className="fas fa-sync"></i> {props.recordData.recordDetails?.repetitions}</p>
                                <p><i className="fas fa-dumbbell"></i> {props.recordData.recordDetails?.weight}</p>
                            </div>

                            <div className='modeButtonsWrapper'>
                                <button className='modeButtons edit' onClick={() => setMode("edit")}>
                                    Edit
                                </button>
                                <button className='modeButtons delete'>
                                    Delete
                                </button>
                            </div>

                        </motion.div>}
                    </AnimatePresence>

                    {/* User clicked to edit the record */}
                    <AnimatePresence>
                        {mode == "edit" && <motion.div
                            className='overlay__content--edit'
                            initial={{x: "200%"}}
                            animate={{x: 0}}
                            exit={{x: "200%"}}
                            transition={{duration: 0.2}}
                        >
                            {props.children}
                            <div className='modeButtonsWrapper'>
                                <button className='modeButtons'>
                                    Save
                                </button>
                                <button className='modeButtons' onClick={() => setMode("view")}>
                                    Cancel
                                </button>
                            </div>
                            
                        </motion.div>}
                    </AnimatePresence>
                    {mode == "add" && <motion.div 
                            className='overlay__content--view'
                        >

                            <h1 className='modalHeading'>Add new record</h1>
                            <div className='modalStats'>
                                <p><i className="fas fa-sync"></i> {props.recordData.recordDetails?.repetitions} <input type="number" name='repetitions' id='addRepetitionsInput' className='recordInput__repetitions'/></p>
                                <p><i className="fas fa-dumbbell"></i> {props.recordData.recordDetails?.weight} <input type="number" name="weight" id="addWeightInput" className='recordInput__weight' /></p>
                            </div>

                            <div className='modeButtonsWrapper'>
                                <button className='modeButtons edit' onClick={() => {
                                    handleAddRecord();
                                }}>
                                    Add
                                </button>
                                <button className='modeButtons delete'>
                                    Cancel
                                </button>
                            </div>

                        </motion.div>}

                </motion.div>
                
            </motion.div>
        </>
    )
}
