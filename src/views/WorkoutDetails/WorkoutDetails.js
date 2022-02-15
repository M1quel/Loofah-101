import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topBar/TopBar';
import getDocFromCollection from '../../helpers/getDocFromCollection';
import { AnimatePresence, motion } from 'framer-motion';
import "./WorkoutDetails.scss";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { where, query, collection, Timestamp } from 'firebase/firestore';
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
        let workoutGraphQuery = query(collection(db, "workoutLog"), where("workoutId", "==", id), where("timeStamp", ">=", Timestamp.fromDate(new Date("February 14, 2022"))))
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
            setChart(tempDayArray);
        });
    }, [])


    function setChart(chartDataPoints){
        const ctx = document.getElementById('myChart').getContext('2d');
        const mixedChart = new Chart(ctx, {
            type: "scatter",
            data: {
                labels: [
                  chartDataPoints[1].name,
                  chartDataPoints[2].name,
                  chartDataPoints[3].name,
                  chartDataPoints[4].name,
                  chartDataPoints[5].name,
                  chartDataPoints[6].name,
                  chartDataPoints[0].name
                ],
                datasets: [{
                  type: 'bar',
                  label: 'Repetitioner',
                  data: [5, 5, 10, 3, null, 5],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)'
                }, {
                  type: 'line',
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
                  borderColor: 'rgb(54, 162, 235)'
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
                                <h1 className='contentGroup__title'>Fitness log</h1>
                                <canvas style={{width: "100%", height: "200px"}} id="myChart"></canvas>
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
