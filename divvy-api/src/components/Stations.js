import React, { useState, useEffect } from 'react';
import divvy from '../apis/divvy'
import Loading from './Loading'

const Stations = () => {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)
    
  // Get locations on load of app
    useEffect(() => {
    const divy = async () => {
        const response = await divvy.get()
        setLocations(response.data)
        setLoading(false);
    };
    divy();
    }, [])
    
    //////////////////////////////
    
    const renderList = locations.map((local, index) => {
        return (
        <li className="list-group-item" key={local.id}>
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
        <>
        {loading ?
                <Loading />
                : 
        <div className="stations-container">
            <ul className="list-group">{renderList}</ul>
        </div>
        }
        </>
    )
}

export default Stations