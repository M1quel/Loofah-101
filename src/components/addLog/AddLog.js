import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../base';
import Workoutdetails from '../../views/WorkoutDetails/WorkoutDetails';
import "./AddLog.scss";

export default function Addlog(props) {
    var auth = getAuth();

    var [workouts, setWorkouts] = useState([]);
    var [toggleOpen, setToggleOpen] = useState(false);
    
    useEffect(function () {
        getWorkouts();
    }, [])

    async function getWorkouts () {
        var snapShot = await getDocs(collection(db, "workouts"))
        let docArray = [];
        snapShot.docs.forEach(workout => {
            let workoutData = workout.data();
            let docObject = {
                name: workoutData.name,
                id: workout.id
            }
            docArray.push(docObject);
        })
        setWorkouts(docArray);
    }

    function handleSubmit (event) {
        event.preventDefault();
        let form = event.target;
        // MANGLER VALIDERING
        if (!auth.currentUser) return; // Error handeling mangler
        let postData = {
            repetitions: form.addRepetitions.value,
            timeStamp: serverTimestamp(),
            userId: auth.currentUser.uid,
            workoutId: form.workoutSelect.value,
            weight: form.addWeight.value
        }
        setDocument(postData, function (status) {
            if (status == "succes") {
                setToggleOpen(false);
                console.log("Den blev tilføjet")
            } else {
                console.log("Den blev ikke tilføjet")
            }
        })

    }
    async function setDocument (data, callback) {
        let docAdded = await addDoc(collection(db, "workoutLog"), data);
        if (docAdded) {
            callback("succes");
        } else {
            callback("Something happend");
        }
    }

    function handleExit(e) {
        if (e.currentTarget == e.target) setToggleOpen(false);
    }
    return (
        <>
            <div className="addLog" >
                <button className='addLog__openBtn' onClick={(e) => setToggleOpen(!toggleOpen)}>
                    <i className="fa-solid fa-plus"></i>
                </button>
                {toggleOpen && <div className="addLogContent" onClick={(e) => {handleExit(e)}}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <select className='addLogContent__select' name="workoutSelect" id="workoutSelect" defaultValue={null}>
                            <option value={null}>Vælg venligst</option>
                            {workouts.map(element => {
                                return <option key={`${element.id}`} value={`${element.id}`}>{element.name}</option>
                            })}
                        </select>
                        
                        <div className="inputLine">
                            <input type="number" placeholder='Vægt' name='addWeight' id='addWeight'/>
                            <input type="number" placeholder='repetitions' name='addRepetitions' id='addRepetitions' />
                        </div>

                        <button className='addLogContent__submitAdd CTA' type="submit">
                            Add log
                        </button>
                    </form>
                </div>}
                
            </div>
        </>
    )
}
