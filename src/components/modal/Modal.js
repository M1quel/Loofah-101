import React from 'react';
import "./Modal.scss";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { db } from "../../base";
import { doc, updateDoc, addDoc, collection, query, where, setDoc, deleteDoc } from "firebase/firestore";
import getEverything from '../../helpers/getEverythingFromColection';

export default function Modal(props) {
    console.log(props);
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

    async function handleDelete(recordId) {
        await deleteDoc(doc(db, "userRecords", recordId))
        .then(function () {
            props.update();
            props.setRecordModal(false);
        })
    }
    async function handleEdit (recordId) {
        console.log(recordId);
        let recordRef = doc(db, "userRecords", recordId);
        let newRepetitions = window.editRepetitionsInput.value;
        let newWeight = window.editWeightInput.value;
        await updateDoc(recordRef, {
            repetitions: parseInt(newRepetitions),
            weight: parseInt(newWeight)
        })
        .then((something) => {
            console.log(something);
            props.update();
            props.setRecordModal(false);

        });
    }
    async function handleAddRecord () {
        let addData = {
            repetitions: parseInt(window.addRepetitionsInput?.value),
            weight: parseInt(window.addWeightInput?.value),
            userId: props.recordData?.userId,
            workoutId: props.recordData?.workoutId
        }
        let q = query(collection(db, "userRecords"), where("workoutId", "==", addData.workoutId), where("userId", "==", addData.userId), where("repetitions", "==", addData.repetitions));
        var docCheck = await getEverything(q)
        .then(docData => {
            if (docData.length > 0) {
               return docData[0];
            }
            return false;
        });
        if (docCheck) {
            let recordRef = doc(db, "userRecords", docCheck.id);
            await setDoc(recordRef, addData)
            .then(() => {
                props.update();
                props.setRecordModal(false);

            });
        } else {
            const docRef = await addDoc(collection(db, "userRecords"), addData);
            if (docRef) {
                props.update();
                props.setRecordModal(false);
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
                                <button className='modeButtons delete' onClick={() => handleDelete(props.recordData?.recordId)}>
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
                            <h1 className='modalHeading'>Add new record</h1>
                            <div className='modalStats'>
                                <p><i className="fas fa-sync"></i> <input defaultValue={props.recordData?.recordDetails?.repetitions} type="number" name='repetitions' id='editRepetitionsInput' className='recordInput__repetitions'/></p>
                                <p><i className="fas fa-dumbbell"></i> <input defaultValue={props.recordData?.recordDetails?.weight} type="number" name="weight" id="editWeightInput" className='recordInput__weight' /></p>
                            </div>
                            <div className='modeButtonsWrapper'>
                                <button className='modeButtons' onClick={() => handleEdit(props.recordData?.recordId)}>
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
