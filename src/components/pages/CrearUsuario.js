import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { campoRequerido, datoRequerido } from "../validaciones/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CrearUsuario() {
  var bcrypt = require("bcryptjs");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const URL = process.env.REACT_APP_API_URL;
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigate();
  const [administrador, setAdminitrador] = useState(false);

  useEffect(() => {
    consultaAPI();
  }, []);

  const consultaAPI = async () => {
    //consultamos api para recivir un array de los usuarios creados y guardar la informacion para usarla mas adelante en validarNombreUsado
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      setListaUsuarios(datos); //guardamos toda la lista de usuarios en el state para poder verificar, mas adelante esto se tiene que hacer en el backend
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crearUsuarioNuevo();
  };
  const hashContrasena = (x) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(x, salt, function (err, hash) {
        // Store hash in your password DB.
        setContrasena(hash);
      });
    });
  };
  function validarEmailUsado(x) {
    let a = listaUsuarios.find((b) => {
      return b.email == x;
    });
    if (a !== undefined) {
      return false;
    } else {
      return true;
    }
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
    if (datoRequerido(nombre) && datoRequerido(contrasena) && datoRequerido(email) ) {
      if (validarNombreUsado(nombre)) {
        if (validarEmailUsado(email)) {
          const usuarioNuevo = {
            nombre,
            contrasena,
            administrador,
            email
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
            if(repuesta.status === 201){
              console.log('El producto se cargo correctamene')
              Swal.fire(
                'Usuario nuevo registrado',
                'El usuario fue registrado existosamente',
                'success'
              )
              navigation("/Inicio");
            }
            console.log(repuesta);
          } catch (error) {
            console.log(error);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Email existente',
            text: 'El email ya se encuentra registrado!',
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario existente',
          text: 'El usuario ya existe, intenta con otro',
        })
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
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su email a usar"
                  onChange={(e) => {
                    setEmail(e.target.value);
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
