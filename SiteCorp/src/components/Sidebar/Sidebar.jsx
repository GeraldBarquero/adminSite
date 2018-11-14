import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "../../assets/img/sidebar-3.jpg";
import logo from "../../assets/img/reactlogo.png";
import dashboardRoutes from "../../routes/dashboard.jsx";
import * as APIRol from "../../services/security/Roles";
import * as APIToken from '../../services/loginAPI';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      listPerm:[],
      rolId:''
    };
    this.getPermissions = this.getPermissions.bind(this);
  }
  activeRoute(routeName) {
    if (this.props.location.pathname === '/dashboard' && routeName === '/dashboard'){
      // var asl = this.props.location.pathname.indexOf(routeName);
      return "active";
    }else{
      return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
  }
  getPermissions(){
    
    try{
      const objectToken = APIToken.getToken();
      const roleId = objectToken.roleId;
      this.setState({rolId:roleId})
      APIRol.getModules(roleId)
      .then(response =>{
        this.setState({listPerm: response})
      })
      .catch(response =>{
          console.log(response)
      });
    }
    catch(err){

    }
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.getPermissions();
  }
  render() {
    // const sidebarBackground = {
    //   backgroundImage: "url(" + imagine + ")"
    // };
    const {listPerm, rolId} = this.state;
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="orange"
        data-image={imagine}
      >
        {/* <div className="sidebar-background" style={sidebarBackground} /> */}
        <div className="logo">
          <a
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            className="simple-text logo-normal"
          >
            Sistema admin
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 993 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect){
                
                var perm = listPerm.find(function(element) {
                                                      return element.Cod_Permission === prop.code && element.fk_idRole === rolId;
                                                    });
                if(perm){
                    return (
                    <li
                      className={
                          this.activeRoute(prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                }
              }
                
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
