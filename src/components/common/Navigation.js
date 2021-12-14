import React, { Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../img/logo-rollingNews.png'

const Navigation = () => {
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
          <Link to='/' className='btn btn-sm btn-outline-light ms-2'>Login</Link>
          <Link to='/' className='btn btn-sm btn-outline-light ms-2'>Suscribirse</Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;