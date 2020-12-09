import React from 'react';
import { Modal as Mod } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  onClose(): void;
  header: string | undefined;
}

const Modal: React.FC<ModalProps> = ({ show, children, onClose, header }) => {
  return (
    <React.Fragment>
      <Mod
        show={show}
        onHide={onClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Mod.Header closeButton>
          <Mod.Title>{header}</Mod.Title>
        </Mod.Header>
        <Mod.Body>{children}</Mod.Body>
        <Mod.Footer>
          <button className="btn-modal btn-custom-modal" onClick={onClose}>
            Close
          </button>
        </Mod.Footer>
      </Mod>
    </React.Fragment>
  );
};

export { Modal };
