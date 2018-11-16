import React, { Component } from 'react';
import axios from 'axios';
import {
    Nav, NavDropdown, MenuItem
} from 'react-bootstrap';
import * as API from '../../services/loginAPI';
import {Redirect} from 'react-router-dom';
import { URLUsers} from '../../config/Api';

class HeaderLinks extends Component {
  constructor(props){
      super(props);
      this.state = {
          redirectToLogin: false,
          username: 'no username'
      }
      this.returnToLogin = this.returnToLogin.bind(this);
  }
  returnToLogin(){
    API.loggOut();
    this.setState({redirectToLogin: true});
  }
  
  componentDidMount(){
    var objectToken = API.getToken();
    const self = this;    
    if(objectToken){
        axios.get(
            URLUsers+objectToken.userid,
            { headers: { "x-access-token": objectToken.token }
        })
        .then(function (response) {
            const userN = response.data.map(c =>{
                return c.username
            })
            self.setState({username: userN})
        }).catch(function (error) {
            if(error.request.status === 500){
                self.setState({redirectToLogin: true});
            }
        });
    }else{
        this.setState({username: 'no username'})
        self.setState({redirectToLogin: true});
    }
}

  render() {    
    if (this.state.redirectToLogin){
      return (<Redirect to={'/login'}/>)
    }
    return(
      <div>
          <Nav pullRight>
              <NavDropdown eventKey={3} onClick={this.getUserName}
                title={(
                      <div>
                      <i className="far fa-user-circle"></i>
                      <p>{this.state.username}<b className="caret"></b></p>
                      </div>
                  )} noCaret id="basic-nav-dropdown-3" bsClass="dropdown-with-icons dropdown">
                  
                  <MenuItem eventKey={4.4} onClick={this.returnToLogin}>
                    <div className="text-danger">
                        <i className="pe-7s-close-circle"></i> Log out
                    </div>
                    </MenuItem>
              </NavDropdown>
          </Nav>
      </div>
    );
  }
}
export default HeaderLinks;
