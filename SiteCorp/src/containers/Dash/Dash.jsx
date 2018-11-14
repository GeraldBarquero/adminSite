import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

import dashboardRoutes from "../../routes/dashboard.jsx";
import Loading from "../../components/Loaders/loaderDog";
import IdleTimer from 'react-idle-timer'
import * as API from '../../services/loginAPI';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null,
      redirectToLogin: false
    };
    
    this.idleTimer = null
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
  }
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          {position}
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }
  componentDidMount() {
    // this.setState({ _notificationSystem: this.refs.notificationSystem });
    // var _notificationSystem = this.refs.notificationSystem;
    // var color = Math.floor(Math.random() * 4 + 1);
    // var level;
    // switch (color) {
    //   case 1:
    //     level = "success";
    //     break;
    //   case 2:
    //     level = "warning";
    //     break;
    //   case 3:
    //     level = "error";
    //     break;
    //   case 4:
    //     level = "info";
    //     break;
    //   default:
    //     break;
    // }
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome
    //     </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
  }
  componentDidUpdate(e) {
    if (
     document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    var objectToken = API.getToken();
    if (!objectToken){
      return (<Redirect to={'/login'}/>)
    }
    if (this.state.redirectToLogin){
      return (<Redirect to={'/login?sessionExpire=1'}/>)
    }
    return (
      <IdleTimer
      ref={ref => { this.idleTimer = ref }}
      element={document}
      onActive={this.onActive}
      onIdle={this.onIdle}
      timeout={900000}>
      <div className="wrapper">
        {/* <NotificationSystem ref="notificationSystem" style={style} /> */}
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.name === "Notifications")
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
              if (prop.redirect)
                return <Redirect exact from={prop.path} to={prop.to} key={key} />;
              return (
                <Route exact path={prop.path} component={prop.component} key={key} />
              );
            })}
            
            <Route component = {Loading} />
          </Switch>
          <Footer fluid/>
        </div>
      </div>
            </IdleTimer>
    );
  }

  _onActive(e) {
    console.log('user is active', e)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    this.setState({redirectToLogin: true});
  }
}

export default Dashboard;
