import {createStore} from "redux"

//Initialize State

const initState = {
    stations:[],
    filteredStations:[],
    stationDockFilter:0,
    selectedStation:"",
    trips:[],
    startDate: new Date("2019-12-20"),
    endDate: new Date("2019-12-21")
}

//ACTIONS STATION
export function setStations(data){
    return{
        type:"SET_STATIONS",
        payload:data
    }
}

export function setSelectedStation(station){
    return {
        type:"SET_SELECTED_STATION",
        selectedStation: station
    }
}

export function setFilteredStations(stations, minDocks){
    var filteredStations = stations.filter(station=>station.total_docks>parseInt(minDocks));
    return {
        type: "SET_FILTERED_STATIONS", 
        stations: filteredStations
    };
}

export function setStationDockFilter(minDocks){ 
    return {
        type: "SET_STATION_DOCK_FILTER", 
        dockFilter: minDocks
    };
}
//Actions Trips
export function getTrips(tripsData){
    return{
        type: "GET_TRIPS",
        payload:tripsData
    }
}

export function setStartDateRedux(startDate){
    return{
        type: "SET_STARTDATE",
        chosenStartDate: startDate
    }
}
export function setEndDateRedux(endDate){
    return{
        type: "SET_ENDDATE",
        chosenEndDate: endDate
    }
}
export function setSelectedStationInboundTrips(trips){
    return{
        type: "SET_SELECTED_STATION_INBOUND_TRIPS",
        incomingTrips: trips
    }
}
export function setSelectedStationOutboundTrips(trips){
    return{
        type: "SET_SELECTED_STATION_OUTBOUND_TRIPS",
        outgoingTrips: trips
    }
}


//REDUCERS STATIONS
function reducer(state=initState, action) {
    switch(action.type) {
        case "FETCH_STATIONS":
            return {...state,
                stations : action.payload.res}
        case "SET_STATIONS":
            return {...state,
                stations : action.payload}
        case "SET_FILTERED_STATIONS":
            return {...state,
                filteredStations : action.stations}
        case "SET_STATION_DOCK_FILTER":
            return {...state,
                stationDockFilter : action.dockFilter}         
        case "SET_SELECTED_STATION":
            return {...state,
            selectedStation : action.selectedStation}
        case "GET_TRIPS":
            return{...state,
                trips: action.payload
            }
        case "SET_STARTDATE":
            return{...state,
            startDate: action.chosenStartDate
        }
        case "SET_ENDDATE":
            return{...state,
            endDate: action.chosenEndDate
        }
        case "SET_SELECTED_STATION_INBOUND_TRIPS":
            return{...state,
                inboundTrips: action.incomingTrips
            }
        case "SET_SELECTED_STATION_OUTBOUND_TRIPS":
            return{...state,
                outboundTrips: action.outgoingTrips
            }    
        default:
            return state
    }
}

const store = createStore(reducer);
export default store