import React, { Component } from 'react';

class NotFound extends Component{
    render(){
        return(
            
            <div className="main-content page-err-container">
                <div className="page-err">
                    <div className="ui-animate">
                        <div className="divTransform">
                            <div className="err-container text-center">
                                <div className="err-code-container">
                                    <div className="err-code"> 
                                        <h1>400</h1> 
                                    </div>
                                </div>
                                <h2>Sorry, page not found</h2>
                                <a href="#/dashboard" class="ant-btn">
                                    <span>Go Back to Home Page</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default NotFound;