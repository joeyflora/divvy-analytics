
const StationMarker = (props) =>{
    return(
        <div className='station-marker' onClick={() => props.handleStationSelection(props.station)}>
            
            <img className='station-marker-icon' src="../../divvy_logo.png"/>
            <div className="station-marker-text">{props.name}</div> 
        </div>
    )
}

export default StationMarker;