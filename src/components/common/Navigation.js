import React, { Component, useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Modal, Button} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../img/logo-rollingNews3.png'

import Login from "../pages/Login.js";
import Perfil from "../pages/Perfil.js";


const Navigation =  (props) => {
 const [abrirModal, setAbrirModal]= useState(false) ;
 const handleClose = () => setAbrirModal(false);
 const handleShow = () => setAbrirModal(true);
 let checkLog = JSON.parse(localStorage.getItem("usuarioLogeado")); 
 let navigate = useNavigate();
 
 useEffect(() => {


}, []);
 


const mostrarAlgo = ()=>{
  if(checkLog === null){
    return <Link to='/'className='btn btn-sm btn-outline-light ms-2 px-4 text-center' onClick={()=>{handleShow()}}>Login</Link>
  }else{
    return <Link to='/Perfil'className='btn btn-sm btn-outline-light ms-2 px-4 text-center'>Perfil</Link>
  }
}



  



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Link to= '/'>
      <img src={logo} alt="Logo rollingNews" className='w-50'/>
      </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link to= '/error404' className='nav-link'>Actualidad</Link>
          <Link to= '/error404' className='nav-link'>Tecnología</Link>
          <Link to= '/error404' className='nav-link'>Espectáculos</Link>
          <Link to= '/error404' className='nav-link'>Deportes</Link>
            <NavDropdown title="Más categorías" id="nav-dropdown-dark-example" menuVariant="dark">
            <NavDropdown.Item as={Link} to="/error404">Política</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">Economía</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">Salud</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">Fotografía</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Nav>
          <Link to= '/contacto' className='nav-link text-light'>Contacto</Link>
          <Link to= '/nosotros' className='nav-link text-light'>Nosotros</Link>
          {mostrarAlgo()}
        </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={abrirModal} onHide={handleClose}>
        <Modal.Body><Login  abrirModal={abrirModal}></Login></Modal.Body>
      </Modal>
    </Navbar>

  );
};

export default Navigation;
