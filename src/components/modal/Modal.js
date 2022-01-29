import React from 'react';
import "./Modal.scss";
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal(props) {
    
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
            >
                <motion.div 
                initial={{y: "100%"}}
                animate={{y: 0}}
                exit={{y: "100%"}}
                transition={{duration: 0.2, ease: 'easeOut'}}
                className='overlat__content'>
                    {props.children}
                </motion.div>
            </motion.div>
        </>
    )
}
