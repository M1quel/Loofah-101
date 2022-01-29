import React from 'react';
import "./UserRecordCard.scss";
import { motion } from "framer-motion";

export default function Userrecordcard(props) {
    

    return (
        <>
            <motion.div 
            className='userRecordCard' 
            onClick={props.onClick}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{delay: props.delay * 0.2 + props.parentDelay, ease: 'easeOut'}}

            >
                <p><i className="fas fa-sync"></i>{props.repetitions}</p>
                <p><i className="fas fa-dumbbell"></i>{props.weight}</p>
            </motion.div>
        </>
    )
}
