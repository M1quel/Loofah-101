import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topBar/TopBar';
import getDocFromCollection from '../../helpers/getDocFromCollection';
import { AnimatePresence, motion } from 'framer-motion';
import "./WorkoutDetails.scss";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { where, query, collection, Timestamp, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getEverything from "../../helpers/getEverythingFromColection";
import Contentgroup from '../../components/contentGroup/ContentGroup';
import Userrecordcard from '../../components/userRecordCard/UserRecordCard';
import Modal from "../../components/modal/Modal";
import { db } from "../../base";
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

export default function Workoutdetails(props) {
    var auth = getAuth();
    let { id } = useParams();
    var [imageSrc, setImageSrc] = useState();
    var [workout, setWorkout] = useState({});
    var [userRecords, setUserRecords] = useState([]);
    var [recordModal, setRecordModal] = useState(false);
    var alltimeChartData = {
        chartLabels: [],
        chartPoints: []
    }
    var chartDataTemplate = [
        {
            name: "Sunday",
            workouts: []
        },
        {
            name: "monday",
            workouts: []
        },
        {
            name: "Tuesday",
            workouts: []
        },
        {
            name: "Wednesday",
            workouts: []
        },
        {
            name: "Thursday",
            workouts: []
        },
        {
            name: "Friday",
            workouts: []
        },
        {
            name: "Saturday",
            workouts: []
        }
    ]
    var [dataPoints, setDataPoints] = useState([])
    const storage = getStorage();
    var chartStartDate = 14;
    // Get the current workout
    useEffect(function () {
        getDocFromCollection("workouts", id)
        .then(doc => {
            setWorkout(doc);
        })
    }, [id]);

    useEffect(function () {
        if (auth.currentUser?.uid) {
            let workoutGraphQuery = query(collection(db, "workoutLog"), where("workoutId", "==", id), where("userId", "==", auth.currentUser?.uid))
            getEverything(workoutGraphQuery)
            .then(docs => {
                let tempDayArray = chartDataTemplate;
                let tempDayObject = {};
                let tempDataPointsArray = [];
                docs.forEach(workoutLog => {
                    let logData = workoutLog.data();
                    let dateOfLog = new Date(logData.timeStamp.toDate());
                    let date = parseInt(`${dateOfLog.getDate()}${dateOfLog.getMonth() + 1 < 10 ? "0" + (dateOfLog.getMonth() + 1) : dateOfLog.getMonth() + 1}${dateOfLog.getFullYear()}`);
                    if (!tempDayObject[date]) {
                        tempDayObject[date] = [];    
                    }
                    tempDayObject[date]?.push(logData);
                })
                
                for (const key in tempDayObject) {
                    let value = tempDayObject[key];
                    if (value.length > 1) {
                        var res;
                        res = Math.max.apply(Math,value?.map(function(o){return o.weight;}))
                        if ( res ) {
                            tempDataPointsArray.push(res);
                        }
                    } else {
                        tempDataPointsArray.push(value[0] ? parseInt(value[0].weight) : null);
                    }
                }
                setAlltimeChart(tempDataPointsArray);

            });
        }
    }, [auth.currentUser])

    useEffect(function () {
        if (auth.currentUser?.uid) {
            let todaysDate = new Date();
            // todaysDate.setDate(12);

            let firstDate = todaysDate.getDate() - (todaysDate.getDay() - 1);
            let lastDate = todaysDate.getDay() == 0 ? todaysDate.getDate() : (7 - (todaysDate.getDay())) + todaysDate.getDate();
            let lastDato = new Date();
            lastDato.setDate(lastDate);

            todaysDate.setDate(firstDate);
            todaysDate.setHours(0);
            todaysDate.setMinutes(0);
            todaysDate.setSeconds(0);
            todaysDate.setMilliseconds(0);
            let workoutGraphQuery = query(collection(db, "workoutLog"), where("workoutId", "==", id), where("userId", "==", auth.currentUser?.uid), where("timeStamp", ">=", Timestamp.fromDate(todaysDate)), where("timeStamp", "<=", Timestamp.fromDate(lastDato)))
            getEverything(workoutGraphQuery)
            .then(docs => {
                let tempDayArray = chartDataTemplate;
                docs.forEach(workoutLog => {
                    let logData = workoutLog.data();
                    let dateOfLog = new Date(logData.timeStamp.toDate());
                    let weekday = dateOfLog.getDay();
                    tempDayArray[weekday]?.workouts.push(logData);
                })
                tempDayArray.map(day => {
                    var res;
                    if (day.workouts?.length > 0) {
                        res = Math.max.apply(Math,day.workouts?.map(function(o){return o.weight;}))
                    }
                    day.dataPoint = res ? res : null;
                })
                setWeeklyChart(tempDayArray);
            });
        }
    }, [auth.currentUser]) 

    function setAlltimeChart (dataPoints) {
        let labelsTemplate = [];
        for (let i = 0; i < dataPoints.length; i++) {
            labelsTemplate.push("");
        }
        const ctx = document.getElementById('myAlltimeChart').getContext('2d');
        const mixedChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labelsTemplate,
                datasets: [{
                  label: 'Vægt',
                  data: dataPoints,
                  fill: true,
                  borderColor: 'rgb(54, 162, 235)',
                  tension: 0.3
                }]
            }
        });
    }
    function setWeeklyChart(chartDataPoints){
        const ctx = document.getElementById('myWeeklyChart').getContext('2d');
        const mixedChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                datasets: [{
                  label: 'Vægt',
                  data: [
                      chartDataPoints[1]?.dataPoint,
                      chartDataPoints[2]?.dataPoint,
                      chartDataPoints[3]?.dataPoint,
                      chartDataPoints[4]?.dataPoint,
                      chartDataPoints[5]?.dataPoint,
                      chartDataPoints[6]?.dataPoint,
                      chartDataPoints[0]?.dataPoint,
                  ],
                  fill: true,
                  borderColor: 'rgb(54, 162, 235)',
                  tension: 0.3
                }]
            }
        });
    }

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
        setUserRecords([]);
        if (!auth.currentUser) return;
        let q = query(collection(db, "userRecords"), where("workoutId", "==", id), where("userId", "==", auth.currentUser?.uid));
        getEverything(q)
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

                        <AnimatePresence>
                            <Contentgroup delay={0.5}>
                                <h1 className='contentGroup__title'>Weekly Log</h1>
                                <canvas style={{width: "100%", height: "200px"}} id="myWeeklyChart"></canvas>
                            </Contentgroup>
                        </AnimatePresence>
                        <AnimatePresence>
                            <Contentgroup delay={0.5}>
                                <h1 className='contentGroup__title'>Alltime Log</h1>
                                <canvas style={{width: "100%", height: "200px"}} id="myAlltimeChart"></canvas>
                            </Contentgroup>
                        </AnimatePresence>
                        
                    </div>

                </main>
            </motion.div>
            <AnimatePresence>
                {recordModal && <Modal 
                    setRecordModal={setRecordModal}
                    recordData={recordModal}
                    update={updateRecords}
                />}
            </AnimatePresence>
        </>
    )
}
