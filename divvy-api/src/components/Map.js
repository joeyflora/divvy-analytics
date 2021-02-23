import React, {useState, useEffect} from 'react';
import StationMarker from "./StationMarker";
import {connect} from "react-redux";
import apiKey from "../apis/googleMaps"
import GoogleMapReact from 'google-map-react';
import { render } from 'react-dom';

const Map = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const defaultMapProps = {
        //Chicago, IL
        center: {
          lat: 41.89,
          lng: -87.64
        },
        zoom:14
      };

    const stationList = !props.stations ? [] : props.stations.map((station) =>{
        return(
            <StationMarker key={station.id} lat={station.location.latitude} lng={station.location.longitude} 
                  name={station.station_name} station={station} handleStationSelection={props.handleStationSelection}/>
        )     
    })
    return (
        // Important! Always set the container height explicitly
        <div className="col-9 map"style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key:  'AIzaSyC48f-TjYTgS6YBThVyyuq2xX3JB9XFaQk'}}
            center={props.selectedStation ? props.selectedStation.stationLocation.coordinates : defaultMapProps.center}
            defaultZoom={defaultMapProps.zoom}
          >
            {stationList}
          </GoogleMapReact>
        </div>
    );

}

const mapStateToProps = (globalState) =>({selectedStation: globalState.selectedStation},{stations:globalState.stations});

export default connect(mapStateToProps, {})(Map);