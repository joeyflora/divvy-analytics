import redux, {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import divvy from "../apis/divvy"
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
const initState = {stations:[],selectedStation:""}
function reducer(state=initState, action) {
    switch(action.type) {
        case "FETCH_STATIONS":
            return {... state,
                stations : action.payload.res}
        case "SET_STATIONS":
            return {... state,
                stations : action.payload}       
        case "SET_SELECTED_STATION":
            return {... state,
            selectedStation : action.selectedStation}
        default:
            return state
    }
}

const store = createStore(reducer) //Add applyMiddleWare(thunk) to use redux-thunk
store.subscribe(() => console.log(store.getState()))
export default store