import React, { Component } from 'react';
import { Grid, Row, Col,Nav, NavItem,Tab} from "react-bootstrap";
import Card from '../../components/Card/Card.jsx';
import ListUsers from '../../components/Security/listUsers.jsx'
import ListRoles from '../../components/Security/listRoles.jsx'
import ListAccess from '../../components/Security/listAccess.jsx'

class Security extends Component{

    render(){
               
        const tabsIcons = (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="users">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="users">
                                <i className="fa fa-user"></i> Usuarios
                            </NavItem>
                            <NavItem eventKey="roles">
                                <i className="fas fa-users-cog"></i> Roles
                            </NavItem>
                            <NavItem eventKey="access">
                                <i className="fa fa-check-circle"></i> Permisos
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="users">
                                <ListUsers
                                name="showUser"
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="roles">
                                <ListRoles
                                name="showRole"
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="access">
                                <div>
                                    <Col sm={6} md={6}>
                                    Listado de los permisos de acceso al sistema.
                                    </Col>
                                    <Col sm={6} md={6}>
                                    </Col>
                                    <br/>
                                    <hr/>
                                    <ListAccess></ListAccess>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
        return(
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={10} mdOffset={1}>
                            <Card
                                title="Opciones de Seguridad"
                                category="Pestañas con listados de usuarios, roles y permisos."
                                ctFullWidth
                                content={tabsIcons}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Security;