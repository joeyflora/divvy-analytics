import react, { useState } from "react";
import {connect} from "react-redux";
import store, { setFilteredStations, setStationDockFilter} from "../redux";



const MapFilters = (props) =>{
    function handleDockFilter(value){
        // value.preventDefault();
        store.dispatch(setFilteredStations(props.stations, value));
    }
    return(
        // <div className="dropdown">
        //     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         Dropdown button
        //     </button>
        //     <div className="dropdown-menu">
        //         {/* <form className="px-4 py-3">
        //             <div className="form-group">
                        
        //                 <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
        //             </div>
        //             <div className="form-group">
                        
        //                 <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
        //             </div>
        //             <button type="submit" className="btn btn-primary">Sign in</button>
        //         </form>
        //         <div className="dropdown-divider"></div> */}
        //         <a className="dropdown-item" href="#">New around here? Sign up</a>
        //         <a className="dropdown-item" href="#">Forgot password?</a>
        //     </div>
        // </div>
        <>
            <label>Filter by Dock Size </label>
            <input id="dock-filter-min" type="number"></input>
            <button onClick={()=>handleDockFilter(document.getElementById("dock-filter-min").value)}>Apply Filter</button>
        </>
        
    )
}
const mapStateToProps = (globalState) =>({stations:globalState.stations, stationDockFilter:globalState.stationDockFilter});
export default connect(mapStateToProps, {})(MapFilters);