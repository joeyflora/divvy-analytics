import React, { useState, useEffect } from 'react';
import divvy from '../apis/divvy'

const Stations = () => {
    const [locations, setLocations] = useState([])
    
  // Get locations on load of app
    useEffect(() => {
    const divy = async () => {
        const response = await divvy.get()
        setLocations(response.data)
    };
    divy();
    }, [])
    //////////////////////////////
    
    const renderList = locations.map((local, index) => {
        return (
        <li className="list-group-item" key={local.location.latitude}>
            <div className="float-left">
            <h5>{local.station_name}</h5>
            <p>Latitude: {local.location.latitude}</p>
            <p>Longitude: {local.location.longitude}</p>
            <p>Status: <b>{local.status}</b></p>
            </div>
        </li>
        )
    })

    return (
        <ul className="list-group">{renderList}</ul>
    )
}

export default Stations