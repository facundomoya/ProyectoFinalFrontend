import React, { Component, useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Modal, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../img/logo-rollingNews.png'
import CrearUsuario from "../pages/CrearUsuario.js";
import Login from "../pages/Login.js";
import Perfil from "../pages/Perfil.js";
import ModalLogin from "./ModalLogin.js";

const Navigation =  () => {
 const [abrirModal, setAbrirModal]= useState(false) ;
 const handleClose = () => setAbrirModal(false);
 const handleShow = () => setAbrirModal(true);
 const [abrirModal2, setabrirModal2]= useState(false) ;
 const handleClose2 = () => setabrirModal2(false);
 const handleShow2 = () => setabrirModal2(true);
 const checkLog = JSON.parse(localStorage.getItem("usuarioLogeado")); 
 

 

const mostrarAlgo = ()=>{
  if(checkLog === null){
    return <Link to='/'className='btn btn-sm btn-outline-light ms-2 px-4 text-center' onClick={()=>{handleShow()}}>Login</Link>
  }else{
    return <Link to='/'className='btn btn-sm btn-outline-light ms-2 px-4 text-center'  onClick={()=>{handleShow2()}}>Perfil</Link>
  }
}



  



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Link to= '/' className='navbar-brand'>RollingNews</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link to= '/' className='nav-link text-light'>Inicio</Link>
          <Link to= '/error404' className='nav-link'>Actualidad</Link>
          <Link to= '/' className='nav-link'>Tecnología</Link>
          <Link to= '/' className='nav-link'>Espectáculos</Link>
          <Link to= '/' className='nav-link'>Deportes</Link>
            <NavDropdown title="Más categorías" id="nav-dropdown-dark-example" menuVariant="dark">
            <NavDropdown.Item as={Link} to="/">Política</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">Economía</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">Salud</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">Fotografía</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Nav>
          <Link to= '/' className='nav-link text-light'>Contacto</Link>
          <Link to= '/' className='nav-link text-light'>Nosotros</Link>
          {mostrarAlgo()}
        </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={abrirModal} onHide={handleClose}>
        <Modal.Body><Login  abrirModal={abrirModal}></Login></Modal.Body>
      </Modal>
      <Modal show={abrirModal2} onHide={handleClose2}>
        <Modal.Body><Perfil></Perfil></Modal.Body>
      </Modal>
    </Navbar>

  );
};

export default Navigation;
