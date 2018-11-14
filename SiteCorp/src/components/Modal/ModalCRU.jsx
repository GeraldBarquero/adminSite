import React, { Component } from "react";
import { Col, OverlayTrigger,Tooltip,Modal} from "react-bootstrap";
import Button from '../../elements/CustomButton/CustomButton.jsx';

export class ModalCRU extends Component {
  render() {
    return (
        <Modal show={true} onHide={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Formulario de creación de usuarios</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button >Close</Button>
                </Modal.Footer>
        </Modal>
    );
  }
}

export default ModalCRU;