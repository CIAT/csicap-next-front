import React from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode
}

const ModalDefault: React.FC<ModalProps> = ({ isOpen, children }) => {
  // if (!event) return null;

  return (
    <Modal isOpen={isOpen}>
      <br />
      {children}
    </Modal>
  );
};

export default ModalDefault;