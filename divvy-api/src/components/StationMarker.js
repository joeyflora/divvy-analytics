import store,{ setSelectedStation } from "../redux"

const StationMarker = (props) =>{

    function handleStationSelection(station){
        // console.log(station);
        store.dispatch(setSelectedStation(station))
        // setSelectedStation(station);
      }
    return(
        <div className='station-marker' onClick={() => handleStationSelection(props.station)}>
            
            <img className='station-marker-icon' src="../../divvy_logo.png"/>
            <div className="station-marker-text">{props.name}</div> 
        </div>
    )
}


export default StationMarker;