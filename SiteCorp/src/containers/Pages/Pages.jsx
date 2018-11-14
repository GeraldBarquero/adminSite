import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import NotificationSystem from "react-notification-system";

import Footer from '../../components/Footer/Footer.jsx';

import { style } from "../../variables/Variables.jsx";
// dinamically create pages routes
import pagesRoutes from '../../routes/pages.jsx';

import bgImage from '../../assets/img/img-login-01.jpg';
import GenericNotFound from "../../views/404/notFound";

class Pages extends Component{
    constructor(props) {
      super(props);
      this.handleNotificationClick = this.handleNotificationClick.bind(this);
      this.state = {
        _notificationSystem: null
      };
    };
    handleNotificationClick(level,message) {
        this.setState({ _notificationSystem: this.refs.notificationSystem });
        var _notificationSystem = this.refs.notificationSystem;
        _notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
                {message}
            </div>
          ),
          level: level,
          position: "tc",
          autoDismiss: 5
        });
    }

    getPageClass(){
        var pageClass = "";
        switch (this.props.location.pathname) {
            case "/login":
                pageClass = " login-page";
                break;
            case "/register":
                pageClass = " register-page";
                break;
            default:
                pageClass = "";
                break;
        }
        return pageClass;
    }
    componentWillMount(){
        if(document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
        return (
            <div>
                {/* <PagesHeader /> */}
                <div className="wrapper ">
                    <NotificationSystem ref="notificationSystem" style={style} />
                    <div className={"full-page"+this.getPageClass()} data-color="black" data-image={bgImage}>
                        <div className="content">
                            <Switch>
                                {
                                    pagesRoutes.map((prop,key) => {
                                        return (
                                            <Route
                                                exact path={prop.path}
                                                key={key}
                                                render={routeProps => (
                                                    <prop.component
                                                        {...routeProps}
                                                        handleClick={this.handleNotificationClick}
                                                    />
                                                )}
                                            />
                                        );
                                        
                                    })
                                }
                                <Route component = {GenericNotFound} />
                            </Switch>
                        </div>
                        <Footer transparent/>
                        <div className="full-page-background" style={{backgroundImage: "url("+bgImage+")"}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pages;
