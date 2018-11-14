import React, { Component } from "react";

import "../../assets/css/loaderDots.css";

class LoaderDots extends Component {
    
    render(){
        return (
            <div className="loader-wrapper">
                <div className="loader">
                    <div className="roller"></div>
                    <div className="roller"></div>
                </div>
                <div id="loader2" className="loader">
                    <div className="roller"></div>
                    <div className="roller"></div>
                </div>
                <div id="loader3" className="loader">
                    <div className="roller"></div>
                    <div className="roller"></div>
                </div>
                <div className="loading">Cargando...</div>
                
            </div>
        )
    }
}

export default LoaderDots;