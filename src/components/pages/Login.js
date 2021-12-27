import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  var bcrypt = require("bcryptjs");
  const [usuarioIngresado, setUsuarioIngresado] = useState("");
  const [contrasenaIngresada, setContrasenaIngresada] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const URL = process.env.REACT_APP_API_URL;
  let a = JSON.parse(localStorage.getItem("usuarioLogeado"));

  useEffect(() => {
    // botonDeslogear();
    consultaAPI();
    //console.log(listaUsuarios);
  }, []);

  const consultaAPI = async () => {
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      setListaUsuarios(datos);
    } catch (error) {
      console.log(error);
    }
  };
  const validarUsuario = (x) => {
    const a = listaUsuarios.find((b) => {
      if (b.nombre === x) {
        return b;
      }
    });
    if (a !== undefined) {
      bcrypt.compare(contrasenaIngresada, a.contrasena, function (err, res) {
        // res === true
        if (res === true) {
          alert("Bienvenido " + a.nombre);
          localStorage.setItem(
            "usuarioLogeado",
            JSON.stringify(a)
          );
          return a;
        } else {
          alert("contrasena invalida");
        }
      });
    } else {
      alert("USUARIO INEXISTENTE");
    }
  };
 



  

  const handleSubmit = (e) => {
    e.preventDefault();

    //consultaAPI();
    validarUsuario(usuarioIngresado);
    window.location.reload(false);
    // console.log(validarUsuario(usuarioIngresado));
    //falta una funcion para redireccionar el usuario si es que se logeo correctamente
    // mientrastanto solo vamos a agregar un boton para deslogear
  };
  return (
    <Container className="">
      <Form className="my-5 " onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Row>
              <h3 className="m-0 p-0">Login de usuario</h3>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  onChange={(e) => {
                    setUsuarioIngresado(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Contrasena</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su constrasena"
                  onChange={(e) => {
                    setContrasenaIngresada(e.target.value);
                  }}
                />
              </Form.Group>
              <Container className="d-flex justify-content-end">
              <Button variant="dark" type="submit" className="my-2 w-25 ">
            Log In
          </Button>
              </Container>
              <Link to="/CrearUsuario" onClick={props.abrirModal}>
          No esta registrado? Click aqui
        </Link>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
