import React, { Component } from "react";
import { Grid, Row, Col} from "react-bootstrap";
import "../../assets/css/loaderDog.css";
import SvgComponent from "./dog"
import {animatePath,rotateHead,rotateRightEar,rotateLeftEar,blink,getValues} from "../../assets/js/loader/loaderdog2"

class  LoaderDog extends Component {
    componentDidMount() {
        getValues();
        animatePath();
        rotateHead();
        rotateRightEar();
        rotateLeftEar();
        blink();
    }
    componentDidUpdate() {
        getValues();
        animatePath();
        rotateHead();
        rotateRightEar();
        rotateLeftEar();
        blink();
    }
    
    render(){
        return (
            <div id="dogDiv" className="main-content text-center">
                <Grid fluid>
                    <Row>
                        <div className="svg-loader" ref={d=>this.svgDiv=d}>
                            {SvgComponent()}
                        </div>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h2>Perdón, la página no esta disponible</h2>
                            <a href="#/dashboard" className="ant-btn">
                                <span>Volver al inicio</span>
                            </a>
                        </Col>
                    </Row>
                </Grid>
                <script></script>
            </div>
        )
    }
}

export default LoaderDog;