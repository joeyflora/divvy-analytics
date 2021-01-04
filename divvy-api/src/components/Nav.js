import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {
    return ( 
        <nav className="navigation col-md-12">
            <div className="nav-title col-md-6">
                <div className="nav-logo-container">
                    <img src="Divvy_Logo_svg.svg" alt="Divvy Logo" style={{width:'175px'}}/>
                </div>
            </div>
            <ul className="nav-links col-md-6">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/Trips">
                    <li>Trips</li>
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