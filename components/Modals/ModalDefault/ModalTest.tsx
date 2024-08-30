import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
    title: string;
    show: boolean;
    handleClose: () => void;
    eventDate: string;
    eventDatend: string;
    province: string;
    organizer: string;
}

const ModalTest: React.FC<ModalProps> = ({ title, show, handleClose, eventDate, eventDatend, province, organizer }) => {
    return (
        <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={6} md={6}>Fecha inicio del evento:</Col>
                    <Col xs={6} md={6}>{eventDate}</Col>
                    <Col xs={6} md={6}>Fecha final del evento:</Col>
                    <Col xs={6} md={6}>{eventDatend}</Col>
                    <Col xs={6} md={6}>Departamento:</Col>
                    <Col xs={6} md={6}>{province}</Col>
                    <Col xs={6} md={6}>Resposable del evento:</Col>
                    <Col xs={6} md={6}>{organizer}</Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTest;
