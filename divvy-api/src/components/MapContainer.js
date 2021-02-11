import React, { useState, useEffect } from 'react'
import Map from'./Map'
import StationInfoPane from './StationInfoPane'
import divvy from "../apis/divvy"
import store, {fetchStations, setStations,setSelectedStation} from "../redux"


const MapContainer = () =>{
    // const [selectedStation, setSelectedStation] = useState(undefined);
    // const [stations, setStations] = useState([]);

    useEffect(() => {
        // store.dispatch(fetchStations);
        // fetchStations();

        // setIsLoading(true);
        divvy.get('', 
            {
                params: {$limit: 400}
            }).then(res => {
                store.dispatch(setStations(res.data));
            })
    }, []);

    function handleStationSelection(station){
        // console.log(station);
        store.dispatch(setSelectedStation(station))
        // setSelectedStation(station);
    }
    return(
        <div className="container map-container">
            <div className="row">
                <Map handleStationSelection={handleStationSelection} stations={store.getState().stations} />
                <StationInfoPane selectedStation = {store.getState().selectedStation}/>
            </div>
        </div>
    )
}

export default MapContainer;