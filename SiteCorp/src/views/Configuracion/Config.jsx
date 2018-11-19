import React, { Component } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import Card from '../../components/Card/Card.jsx';

class Config extends Component{
    render(){
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={10} mdOffset={1}>
                                <Card
                                    title="Opciones de configuración"
                                    category="Cambio de color, imagen de inicio y fondo del sitio"
                                    ctFullWidth
                                    content={
                                        <div >
                                            <Panel>
                                                <Panel.Heading>Panel heading without a title</Panel.Heading>
                                                <Panel.Body>Panel content</Panel.Body>
                                            </Panel>
                                            <Panel>
                                                <Panel.Heading>
                                                <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
                                                </Panel.Heading>
                                                <Panel.Body>Panel content</Panel.Body>
                                            </Panel>
                                        </div>
                                    }
                                />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Config;