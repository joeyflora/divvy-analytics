import React, { useState, useEffect } from 'react'
import Map from'./Map'
import StationInfoPane from './StationInfoPane'
import divvy from "../apis/divvy"


const MapContainer = () =>{
    const [selectedStation, setSelectedStation] = useState(undefined);
    const [stations, setStations] = useState([]);

    useEffect(() => {
        // setIsLoading(true);
        divvy.get('', 
            {
                params: {$limit: 400}
            }).then(res => {
                setStations(res.data);
                console.log("Setting stations");
                // setIsLoading(false);
            })
    }, []);

    function handleStationSelection(station){
        // console.log(station);
        setSelectedStation(station);
    }
    return(
        <div className="container map-container">
            <div className="row">
                <Map handleStationSelection={handleStationSelection} stations={stations} />
                <StationInfoPane selectedStation = {selectedStation}/>
            </div>
        </div>
    )
}

export default MapContainer;