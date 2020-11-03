import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {
    return ( 
        <nav>
            <h3>Divy</h3>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/revenue">
                    <li>Revenue</li>
                </Link>
                <Link to="/Map">
                    <li>Map</li>
                </Link>
                <Link to="/Stations">
                    <li>Stations</li>
                </Link>
            </ul>
            <hr/>
        </nav>
    )
}

export default Nav