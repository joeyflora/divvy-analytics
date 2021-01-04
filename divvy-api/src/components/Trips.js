import React, {useState, useEffect } from 'react';
// import divvyTrips from '../apis/divvyTrips'
import Table from 'react-bootstrap/Table'
import Loading from './Loading'
import BarChart from './BarChart'
import LineChart from './LineChart'
import axios from 'axios'

//////////////react date picker imports//////////////////////
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/////////////////////////////////////////////////////////////

const Trips = () => {
    const [trips, setTrips] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [startDate, setStartDate] = useState(new Date("2019-12-20"))
    const [endDate, setEndDate] = useState(new Date("2019-12-21"))
    const costsArray = []
    const subscribeArray = []
    const gendersArray = []
    const timeArray = []
    const ridesPerDay = []

    function formatDate(date) {
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() +1; //months from 1-12
        var day = dateObj.getUTCDate() - 1;
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
    useEffect(() => {
        var startDay = formatDate(startDate)
        var endDay = formatDate(endDate)
        console.log(startDay, endDay)
        var url = `https://data.cityofchicago.org/resource/fg6s-gzvg.json?$where=start_time%20between%20%27${startDay}%27%20and%20%27${endDay}%27`
        const divyTrips = async () => {
            const response = await axios.get(url, {
                params: {
                    $limit: 40000
                }
            })
            setTrips(response.data)
        };
        divyTrips();

        setIsLoading(false)
        }, [startDate, endDate])

    const renderList = trips.map( trip => {
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
        var total = cost.toFixed(0);
    })
    //add array costs
    const arrayz = costsArray.reduce((a, b) => a + b, 0)
    const arraySubscribe = countOccurences(subscribeArray, 'Subscriber')
    const arrayNotSubscribe = countOccurences(subscribeArray, 'Customer')
    const countMale = countOccurences(gendersArray, 'Male');
    const countFemale = countOccurences(gendersArray, 'Female');
    const countNA = countOccurences(gendersArray, 'N/A')
    console.log(timeArray)
    var totalMade = parseInt(arrayz)


    return (
        <div style={{padding: '0 15px'}}>
            <h1>Trips</h1>
            { isLoading ? 
                <Loading />
            :
            <div className="container md-30">
                <div className="d-flex justify-content-around">
                    <div>
                        Start Date: <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>
                    <div>
                        End Date: <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                    </div>
                </div>
                <div className="container text-center" style={{margin:'35px 0px'}}>
                    <h3>Selected Date: {startDate.toLocaleString().slice(0,10)}</h3>
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
                </div>
            </div>
            }
        </div>
    )
}

export default Trips
