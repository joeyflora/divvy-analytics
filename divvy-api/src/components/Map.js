import React, {useState, useEffect} from 'react';
import StationMarker from "./StationMarker";
import * as d3 from "d3";
import divvy from "../apis/divvy"
import apiKey from "../apis/googleMaps"
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [stations, setStations] = useState([]);
    useEffect(() => {
        // setIsLoading(true);
        divvy.get('', 
            {
                params: {$limit: 100}
            }).then(res => {
                setStations(res.data);
                setIsLoading(false);
            })
    }, []);

    const defaultMapProps = {
        //Chicago, IL
        center: {
          lat: 41.87,
          lng: -87.63
        },
        zoom:13
      };

    const stationList = stations.map((station) =>{
        return(
            <StationMarker key={station.id} lat={station.location.latitude} lng={station.location.longitude} name={station.station_name}/>
        )     
    })

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key:  'AIzaSyC48f-TjYTgS6YBThVyyuq2xX3JB9XFaQk'}}
            defaultCenter={defaultMapProps.center}
            defaultZoom={defaultMapProps.zoom}
          >
            {stationList}
          </GoogleMapReact>
        </div>
    );

}


export default Map