import react, { useState } from "react";

const StationMarker = (props) =>{
    const [text, setText] = useState(props.text);
    return(
        <div className='station-marker'>
            
            <img className='station-marker-icon' src="../../divvy_logo.png"/>
            <div className="station-marker-text">{props.name}</div> 
        </div>
    )
}

export default StationMarker;