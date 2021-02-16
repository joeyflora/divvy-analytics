import {createStore} from "redux"
// import divvy from "../apis/divvy"
/*Action reducer using redux-thunk to move axios api call into reducer*/
// export function fetchStations() {
//     return (dispatch) => {        
//         divvy.get('', 
//         {
//             params: {$limit: 400}
//         }).then(res => res.json()
//         .then(res => {
//                 console.log(res)
//                 dispatch({
//                     type: "FETCH_STATIONS",
//                     payload: res
//                 })
//             })
//         )};
// }

//Initialize State

const initState = {
    stations:[],
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

//REDUCERS STATIONS
function reducer(state=initState, action) {
    switch(action.type) {
        case "FETCH_STATIONS":
            return {...state,
                stations : action.payload.res}
        case "SET_STATIONS":
            return {...state,
                stations : action.payload}       
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
        default:
            return state
    }
}

const store = createStore(reducer) //Add applyMiddleWare(thunk) to use redux-thunk
store.subscribe(() => console.log(store.getState()))
export default store