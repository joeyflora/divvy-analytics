import React from 'react';
import {connect} from "react-redux";

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

const mapStateToProps = (globalState) =>({selectedStation: globalState.selectedStation});

export default connect(mapStateToProps, {})(StationInfo);