import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";

const ModalLogin = () => {
  return (
    <Modal >
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" >
        Close
      </Button>
      <Button variant="primary" >
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>

  );
};

export default ModalLogin;
