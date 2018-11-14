import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Alert,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Redirect} from 'react-router-dom';

import Card from '../../components/Card/Card.jsx';

import Button from '../../elements/CustomButton/CustomButton.jsx';

import * as API from '../../services/loginAPI';
import * as qs from 'query-string';

import LoaderDots from "../../components/Loaders/dots"
import SweetAlert from 'react-bootstrap-sweetalert';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardHidden: true,
            password: '',
            username: '',
            redirectTo: false,
            loading: false
        }
        this.createLogin = this.createLogin.bind(this);
        this.onChange = this.onChange.bind(this);


    }
    createLogin(event){
        event.preventDefault()
        this.setState({loading: true});
        API.login(this.state.username,this.state.password)
            .then(response => {
                this.props.handleClick("success","Login Correcto");
                this.setState({redirectTo: true});
            })
            .catch(response => {
                this.props.handleClick('error','Error: '+response.name);
                this.setState({redirectTo: false});
                this.setState({loading: false});
            });
    }
    onChange  = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 700);
    }
    
    render(){
        const parsed = qs.parse(this.props.location.search);
        const loader = <SweetAlert
                            style={{display: "block",marginTop: "-100px", "backgroundColor": "transparent", padding: "50px"}}
                            onConfirm={() => this.hideAlert()}
                            showConfirm={false}
                            title=""
                        >
                            <LoaderDots/>
                        </SweetAlert>

        var alerta = ""
        if (parsed.sessionExpire === "1" )
            alerta = <div><Alert bsStyle="danger"><span>La sesión ha expirado!!</span></Alert></div>

        if (this.state.redirectTo ){
            return (<Redirect to={'/dashboard'}/>)
        }
        
        return (

            <Grid>
                {this.state.loading ? loader : ""  }
                <Row>

                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form className="commentForm" onSubmit={this.createLogin}>
                            {alerta}
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel> Usuario: </ControlLabel>
                                            <FormControl name="username" placeholder="Ingresa el usuario" type="text" onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel> Contraseña: </ControlLabel>
                                            <FormControl name="password" placeholder="Ingresa la contraseña" type="password" onChange={this.onChange} />
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <Button type="submit" bsStyle="info" fill wd> Login </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                        
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginPage;
