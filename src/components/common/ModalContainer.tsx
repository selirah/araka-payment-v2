import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalContainerProps {
  show: boolean;
  onClose(): void;
  header: string;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  show,
  onClose,
  header,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
