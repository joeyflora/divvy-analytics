import React, { useEffect } from 'react'
import Map from'./Map'
import StationInfoPane from './StationInfoPane'
import Searchbar from './Searchbar'
import divvy from "../apis/divvy"
import store, { setStations,setSelectedStation} from "../redux"


const MapContainer = () =>{
    // const [selectedStation, setSelectedStation] = useState(undefined);
    // const [stations, setStations] = useState([]);

    // useEffect(() => {
        // store.dispatch(fetchStations);
        // fetchStations();

        // setIsLoading(true);
    //     divvy.get('', 
    //         {
    //             params: {$limit: 400}
    //         }).then(res => {
    //             store.dispatch(setStations(res.data));
    //         })
    // }, []);

    return(
        <div>
            <div className="row map-utility-bar">
                <div className="col-5">                    
                    <Searchbar/>                
                </div>
                <div className="col-5">                    
                    <MapFilters/>                
                </div>
            </div>
            <div className="container-fluid p-0 map-container">
                <div className="row no-gutters-9">                
                    <Map/>
                    <StationInfoPane/>                
                </div>
            </div>
        </div>
    )
}

export default MapContainer;