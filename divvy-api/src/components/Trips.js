import React, {useState, useEffect } from 'react';
// import divvyTrips from '../apis/divvyTrips'
import Loading from './Loading'
import BarChart from './BarChart'
import LineChart from './LineChart'
import axios from 'axios'

//////////////redux imports ///////////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import store, { getTrips, setStartDateRedux, setEndDateRedux } from "../redux"

//////////////react date picker imports//////////////////////
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/////////////////////////////////////////////////////////////

const Trips = () => {
    // get info from store and state
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)
    const startDateRedux1 = useSelector(state => state.startDate)
    const endDateRedux1 = useSelector(state => state.endDate)
    const allTrips = useSelector(state => state.trips)

    // initialize arrays
    const costsArray = []
    const subscribeArray = []
    const gendersArray = []
    const timeArray = []
    const tripsCount = []

///////////////////////// operation functions //////////////////////////

    function formatDate(date) {
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return year + "-" + month + "-" + day;
    }

    function currency(num) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
    }

    const countOccurences = function (arr, val) {
        return arr.reduce((acc, elem) => {
            return (val === elem ? acc + 1 : acc)
        }, 0)
    }

///////////////// api call for trips info /////////////////////////////////
    useEffect(() => {
        var startDay = formatDate(startDateRedux1)
        var endDay = formatDate(endDateRedux1)
        var url = `https://data.cityofchicago.org/resource/fg6s-gzvg.json?$where=start_time%20between%20%27${startDay}%27%20and%20%27${endDay}%27`
        const divyTrips = async () => {
            const response = await axios.get(url, {
                params: {
                    $limit: 100000
                }
            })
            store.dispatch(getTrips(response.data));
        };
        divyTrips();

        setIsLoading(false)
        }, [startDateRedux1, endDateRedux1])


///////////// get trips from store using selector and perform needed operations /////////////
    allTrips.map(trip => {
        var cost = trip.trip_duration / 30 * 3;
        costsArray.push(cost);
        subscribeArray.push(trip.user_type);
        timeArray.push({time: formatDate(trip.start_time), duration: parseInt(trip.trip_duration)});
        // check for undefined
        if(trip.gender === undefined){
            gendersArray.push('N/A')
        }else{
            gendersArray.push(trip.gender);
        }
        return null
    })

///////////// count rides ber day ////////////////////
    timeArray.forEach(function (elem) {
        var date = elem.time.split(' ')[0];
    
        if (tripsCount[date]) {
            tripsCount[date] += 1;
        } else {
            tripsCount[date] = 1;
        }
    });

///////////// Split tripsCount for lineChart data //////////////
    const datee = []
    const valuee = []
    for(const [key, value] of Object.entries(tripsCount)) {
        var d = new Date(key);
        let f = d.setDate(d.getDate());
        datee.push(formatDate(f))
        valuee.push(value)
    }
    
/////////////////// count occurences in all arrays for charts //////////////////
    const arrayz = costsArray.reduce((a, b) => a + b, 0)
    const arraySubscribe = countOccurences(subscribeArray, 'Subscriber')
    const arrayNotSubscribe = countOccurences(subscribeArray, 'Customer')
    const countMale = countOccurences(gendersArray, 'Male');
    const countFemale = countOccurences(gendersArray, 'Female');
    const countNA = countOccurences(gendersArray, 'N/A')
    var totalMade = parseInt(arrayz)

/////////////// jsx return //////////////////
    return (
        <div style={{padding: '0 15px'}}>
            <h1>Trips</h1>
            { isLoading ? 
                <Loading />
            :
            <div className="container md-30">
                <div className="d-flex justify-content-around">
                    <div>
                        Start Date: <DatePicker selected={startDateRedux1} onChange={date => dispatch(setStartDateRedux(date))} />
                    </div>
                    <div>
                        End Date: <DatePicker selected={endDateRedux1} onChange={date => dispatch(setEndDateRedux(date))} />
                    </div>
                </div>
                <div className="container text-center" style={{margin:'35px 0px'}}>
                    <h3>Selected Date: {startDateRedux1.toLocaleString().slice(0,10)}</h3>
                </div>
                <div className="row"> 
                    <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                        <h1>Income:</h1>
                        <h1><span>{currency(totalMade)}</span></h1>
                    </div>
                    <div className="col-md-6">
                        <BarChart dataSet={[arraySubscribe, arrayNotSubscribe]} 
                            labels={['Subscribers', 'Non-subscribers']} 
                            maxSet={1000} 
                            chartTitle='Subscripers vs Non-Subscribers' 
                            dataLabel='Count'
                        />
                    </div>
                    <div className="col-md-6">
                        <BarChart dataSet={[countMale, countFemale, countNA]} 
                                labels={['Male', 'Female', 'N/A']} 
                                maxSet={1000} 
                                chartTitle='Gender' 
                                dataLabel='Gender'
                        />
                    </div>
                    <div className="col-md-6">
                        <LineChart dataSet={valuee} 
                                labels={datee} 
                                maxSet={1000} 
                                chartTitle='Trips from Start Date to End' 
                                dataLabel='Trips'
                        />
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Trips
