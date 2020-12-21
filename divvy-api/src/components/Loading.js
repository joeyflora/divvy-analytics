import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    debugger
    return (
        <div className="loading-container">
            <Spinner className="loading-spinner" animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner> 
        </div> 
    )
}

export default Loading;