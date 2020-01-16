import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ModalWrapper({
  show,
  handleModalSubmit,
  handleModalClose,
  children
}) {
  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleModalClose}>
          Отменить
        </Button>
        <Button variant='primary' onClick={handleModalSubmit}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
