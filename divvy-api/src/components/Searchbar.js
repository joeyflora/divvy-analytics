import React, { useState } from "react";
import {connect} from "react-redux";
import store, {setSelectedStation} from "../redux"

const Searchbar = (props) =>{
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState ("");

    const handleSearchSelction = (station) =>{
        store.dispatch(setSelectedStation(station));
        setSuggestions([]);
        setQuery("");
    }
    const onTextChanged = (e) =>{
        const value = e.target.value;
        setQuery(e.target.value);
        // console.log(query);
        if(value.length > 0){
            var suggestions = props.stations.filter((station) => {
                return(station.station_name.toLowerCase().startsWith(value.toLowerCase()));
            })
            setSuggestions(suggestions);
        } else {
            setSuggestions([]);
        }        
    }
    return(
        <div className="search-container container">
            <div className="search-bar input-group">
                <span className="input-group-text">Find a station</span>
                <input className ="search-input" onChange={onTextChanged} type="text" value={query}/>
                <div className="input-group-btn"></div>
            </div>
            <div>
                <ul className="search-results">
                    {suggestions.map((item) =>{return(<li className="search-result" onClick={()=>handleSearchSelction(item)}>{item.station_name}</li>)})}
                </ul>
            </div>                    
        </div>
    )
}

const mapStateToProps = (globalState) =>({selectedStation: globalState.selectedStation},{stations:globalState.stations});
// const mapDispatchToProps = dispatch => {
//     return {
//       // dispatching actions returned by action creators
//       setSelectedStation: () => dispatch(setSelectedStation())
//     }
//   }
export default connect(mapStateToProps, {})(Searchbar);