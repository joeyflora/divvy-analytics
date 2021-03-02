import React, {useState, useEffect} from 'react';
import StationMarker from "./StationMarker";
import {connect, useSelector} from "react-redux";
import divvy from "../apis/divvy";
import store, { setStations,setSelectedStation} from "../redux";
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

    useEffect(() => {
      console.log("Fetching stations");
      divvy.get('', 
        {
            params: {$limit: 400}
        }).then(res => {
            store.dispatch(setStations(res.data));
        })
      }, [])
    
    const stationList = !props.stations ? [] : props.stations.map((station) =>{
        return(
            <StationMarker key={station.id} lat={station.location.latitude} lng={station.location.longitude} 
                  name={station.station_name} station={station}/>
        )
      })
    const filteredStationList = !props.filteredStations ? [] : props.filteredStations.map((station) =>{
      return(
          <StationMarker key={station.id} lat={station.location.latitude} lng={station.location.longitude} 
                name={station.station_name} station={station} handleStationSelection={props.handleStationSelection}/>
      )
   
    })
    let stationMarkerList = [];
    if(filteredStationList.length > 0){
      stationMarkerList = filteredStationList;
    } else {
      stationMarkerList = stationList;
    }  
    return (
        // Important! Always set the container height explicitly
        <div className="col-9 map"style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key:  'AIzaSyC48f-TjYTgS6YBThVyyuq2xX3JB9XFaQk'}}
            center={defaultMapProps.center}
            // center={props.selectedStation ? props.selectedStation.stationLocation.coordinates : defaultMapProps.center}
            defaultZoom={defaultMapProps.zoom}
          >
          {stationMarkerList}
          
          </GoogleMapReact>
        </div>
    );

}

const mapStateToProps = (globalState) =>({selectedStation:globalState.selectedStation, stations:globalState.stations, filteredStations: globalState.filteredStations});

export default connect(mapStateToProps, {})(Map);