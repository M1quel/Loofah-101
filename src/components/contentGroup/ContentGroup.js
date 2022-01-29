import React from 'react';
import "./ContentGroup.scss";
import { motion } from 'framer-motion';

export default function Contentgroup(props) {
    

    return (
        <>
            <motion.section 
            className='contentGroup'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{delay: props.delay, ease: 'easeOut'}}
            >
                {props.children}
            </motion.section>
        </>
    )
}
