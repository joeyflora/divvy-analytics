import React, { useEffect } from 'react';
import {connect, useSelector} from "react-redux";
import store, {setStartDateRedux, setEndDateRedux, setSelectedStationInboundTrips, setSelectedStationOutboundTrips} from "../redux";
import {formatDate} from "../utilities";
import axios from 'axios';
//////////////react date picker imports//////////////////////
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/////////////////////////////////////////////////////////////

const StationInfo = (props) =>{
    var startDate = useSelector(state => state.startDate);
    var endDate = useSelector(state => state.endDate);
    var selectedStation = useSelector(state => state.selectedStation);

    const fetchInboundTrips = async () => {
        var startDay = formatDate(startDate);
        var endDay = formatDate(endDate);
        var url = `https://data.cityofchicago.org/resource/fg6s-gzvg.json?$where=start_time%20between%20%27${startDay}%27%20and%20%27${endDay}%27&to_station_id=${selectedStation.id}`
        axios.get(url, {
            params: {
                $limit: 100000
            }
        }).then(res => store.dispatch(setSelectedStationInboundTrips(res.data)));
    };
    const fetchOutboundTrips = async () => {
        var startDay = formatDate(startDate);
        var endDay = formatDate(endDate);
        var url = `https://data.cityofchicago.org/resource/fg6s-gzvg.json?$where=start_time%20between%20%27${startDay}%27%20and%20%27${endDay}%27&from_station_id=${selectedStation.id}`
        const response = await axios.get(url, {
            params: {
                $limit: 100000
            }
        }).then(res => store.dispatch(setSelectedStationOutboundTrips(res.data)))
    };
    useEffect(() => {
        fetchInboundTrips();
        fetchOutboundTrips();

        }, [startDate, endDate, selectedStation])

    return(
        <div className="col-3 station-info-pane">
            <h3>Station Information</h3>
            <h4>
                Station Name: 
            </h4>
            <span className="station-info-field">
                {props.selectedStation ? props.selectedStation.station_name : ""}
            </span>
            <div >
                Total Docks: {props.selectedStation ? props.selectedStation.total_docks : ""}
            </div>
            <br/>
            <h4>
                Station Stats: 
            </h4>
            <div>
                Start Date: <DatePicker className="date-picker" selected ={startDate} onChange={date => store.dispatch(setStartDateRedux(date))}  />
            </div>
            <div>
                End Date: <DatePicker className="date-picker" selected ={endDate} onChange={date => store.dispatch(setEndDateRedux(date))}/>
            </div>
            <div>
                Incoming Trips: {props.inboundTrips ? props.inboundTrips.length : ""}
            </div>
            <div>
                Outgoing Trips: {props.outboundTrips ? props.outboundTrips.length : ""}
            </div>
        </div>
    );
}

const mapStateToProps = (globalState) =>({selectedStation: globalState.selectedStation, inboundTrips: globalState.inboundTrips, outboundTrips:globalState.outboundTrips});

export default connect(mapStateToProps, {})(StationInfo);