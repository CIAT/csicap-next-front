import MoreInfo from "@/components/Accordion/MoreInfo";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ModalProps {
    title: string;
    show: boolean;
    handleClose: () => void;
    eventDate: string;
    eventDatend: string;
    province: string;
    organizer: string;
    axis: string[];
    objetive: string;
    city: string;
    crop: string[];
    institution: string[];
    guesType: string[];
    email: string;
}

const CalendarModal: React.FC<ModalProps> = ({
    title, show, handleClose, eventDate, eventDatend, province, organizer, axis, objetive, city, crop, institution, guesType, email
}) => {
    return (
        <Modal isOpen={show} onClose={handleClose}>
            <ModalContent>
                <ModalHeader>
                    <h4>{title}</h4>
                </ModalHeader>
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Fecha inicio del evento:</span>
                            <span>{eventDate}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Fecha final del evento:</span>
                            <span>{eventDatend}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Departamento:</span>
                            <span>{province}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Eje:</span>
                            <span>{axis.join(", ")}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Responsable del evento:</span>
                            <span>{organizer}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Correo electrónico:</span>
                            <span>{email}</span>
                        </div>
                        <div>
                            <MoreInfo
                                objetive={objetive}
                                city={city}
                                crop={crop}
                                institution={institution}
                                guesType={guesType}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CalendarModal;
