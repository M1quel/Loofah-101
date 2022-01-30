import React from 'react';
import "./Modal.scss";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react/cjs/react.development';

export default function Modal(props) {
    var [mode, setMode] = useState("view");
    
    function handleExit (e) {
        if (e.target.classList.contains("overlay")) {
            props.setRecordModal(false);
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
                                <button className='modeButtons' onClick={() => setMode("view")}>
                                    asdasd
                                </button>
                                <button className='modeButtons'>
                                    Delete
                                </button>
                            </div>
                            
                        </motion.div>}
                    </AnimatePresence>

                </motion.div>
                
            </motion.div>
        </>
    )
}
