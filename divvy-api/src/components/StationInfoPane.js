import React, { useState } from 'react';

const StationInfo = (props) =>{
    return(
        <div className="col-3 station-info-pane">
            <div>
                Station: {props.selectedStation ? props.selectedStation.station_name : ""}
            </div>
            <br/>
            <div>
                Total Docks: {props.selectedStation ? props.selectedStation.total_docks : ""}
            </div>
        </div>
    );
}

export default StationInfo;