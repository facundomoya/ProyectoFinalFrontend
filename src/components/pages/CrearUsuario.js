import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { campoRequerido } from "./components/validaciones/helpers";

function CrearUsuario() {
  var bcrypt = require('bcryptjs');
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const URL = process.env.REACT_APP_API_URL;
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [administrador, setAdminitrador] = useState(false);

  useEffect(() => {
    consultaAPI();
  }, []);

  const consultaAPI = async () => {
    //consultamos api para recivir un array de los usuarios creados y guardar la informacion para usarla mas adelante en validarNombreUsado
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      setListaUsuarios(datos);//guardamos toda la lista de usuarios en el state para poder verificar mas adelante esto se tiene que hacer en el backend
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    crearUsuarioNuevo();
  };
  const hashContrasena = (x)=>{
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(x, salt, function(err, hash) {
          // Store hash in your password DB.
          setContrasena(hash);
      });
  });
  }
  function validarNombreUsado(x) {
    let a = listaUsuarios.find((b) => {
      return b.nombre === x;
    });
    if (a !== undefined) {
      return false;
    } else {
      return true;
    }
  }
  const crearUsuarioNuevo = async () => {
    if (campoRequerido(nombre) && campoRequerido(contrasena)) {
      if (validarNombreUsado(nombre)) {
        const usuarioNuevo = {
          nombre,
          contrasena,
          administrador,
        };
        try {
          const parametros = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioNuevo),
          };
          const repuesta = await fetch(URL, parametros);
          console.log(repuesta);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("nombre de usuario ya existe, por favor eliga otro nombre bro");
      }
    } else {
    }
  };
  return (
    <Container className="bg-light">
      <h1 className="display-5 text-center my-5">Registro de usuario</h1>
      <Form className="my-5 " onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Row>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario a usar"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Contrasena</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su constrasena a usar"
                  onChange={(e) => {
                    hashContrasena(e.target.value);
                  }}
                />
              </Form.Group>

              <Container className="d-flex justify-content-end">
                <Button variant="dark" type="submit" className="my-2 w-25 ">
                  Registrarse
                </Button>
              </Container>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CrearUsuario;
