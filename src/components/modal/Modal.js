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
                    <AnimatePresence initial={false}>
                        <AnimatePresence>
                            {mode == "view" && <motion.div 
                                className='overlay__content--view'
                                initial={{x: "-200%"}}
                                animate={{x: 0}}
                                exit={{x: "-200%"}}
                                transition={{duration: 0.2}}
                            >
                                {props.children}

                                <div className='modeButtonsWrapper'>
                                    <button className='modeButtons' onClick={() => setMode("edit")}>
                                        Edit
                                    </button>
                                    <button className='modeButtons'>
                                        Delete
                                    </button>
                                </div>

                            </motion.div>}
                        </AnimatePresence>
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

                    </AnimatePresence>
                </motion.div>
                
            </motion.div>
        </>
    )
}
