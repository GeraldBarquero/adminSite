import React, { Component } from 'react';
import {
    Navbar
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class PagesHeader extends Component{
    constructor(props){
        super(props);
        this.activeRoute = this.activeRoute.bind(this);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            width: window.innerWidth
        }
    }
    // function that sets the class to active of the active page
    activeRoute(routeName) {
        var aas = window.location.hash.indexOf(routeName) > -1 ? 'active' : '';
        return aas;
    }
    // function that shows/hides sidebar on responsive
    mobileSidebarToggle(e){
        document.documentElement.classList.toggle('nav-open');
    }
    updateWidth(){
        this.setState({width: window.innerWidth});
    }
    componentDidMount(){
        window.addEventListener("resize", this.updateWidth.bind(this));
    }
    render(){
        return (
            <Navbar collapseOnSelect inverse className="navbar-primary navbar-transparent navbar-absolute">
                <Navbar.Header>
                    <Navbar.Brand>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>
                <Navbar.Collapse>
                    <ul className="nav navbar-nav navbar-right">
                        <li className={this.activeRoute('/login')}>
                            <NavLink to={'/login'} className="nav-link">
                                <i className="fa fa-drivers-license-o"></i>
                                <p>Login</p>
                            </NavLink>
                        </li>
                        <li className={this.activeRoute('/register')}>
                            <NavLink to={'/register'} className="nav-link">
                                <i className="fa fa-user-circle-o"></i>
                                <p>Register</p>
                            </NavLink>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default PagesHeader;
