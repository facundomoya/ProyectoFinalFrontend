import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function Login() {
  var bcrypt = require('bcryptjs');
  const [usuarioIngresado, setUsuarioIngresado] = useState('');
  const [contrasenaIngresada, setContrasenaIngresada] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    botonDeslogear();
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
  const validarUsuario = (x)  =>{
    const a = listaUsuarios.find((b) => {
      if (b.nombre === x) {
        return b;
      }
    });
    if (a !== undefined){
        
        bcrypt.compare(contrasenaIngresada, a.contrasena, function(err, res) {
            // res === true
            if(res === true ){
                alert("Vienvenido " + a.nombre)
                localStorage.setItem("usuarioLogeado", JSON.stringify(a.nombre));
              return a;
              }else{
                alert("contrasena invalida")
              }
        });
      
    }else{
     alert("USUARIO INEXISTENTE");
    }
  }
  const botonDeslogear = ()=>{
    let a = JSON.parse(localStorage.getItem("usuarioLogeado"));
    if(a === null){
     return <Button variant="dark" type="submit" className="my-2 w-25 ">
                Log In
              </Button>
    }else{
      return <Button variant="dark" type="" className="my-2 w-25 " onClick={handlerDeslogear}>
      Deslogear
    </Button> 
    }
     
  }
  const handlerDeslogear= () => {
    localStorage.clear();
    window.location.reload(false);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    consultaAPI();
    validarUsuario(usuarioIngresado);
    // console.log(validarUsuario(usuarioIngresado));
    //falta una funcion para redireccionar el usuario si es que se logeo correctamente
    // mientrastanto solo vamos a agregar un boton para deslogear
  }
  return (
    <Container className="bg-light">
      <h1 className="display-5 text-center my-5">Login de usuario</h1>
      <Form className="my-5 " onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Row>
              <Form.Group controlId="formGridEmail" >
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su usuario" onChange={(e)=>{setUsuarioIngresado(e.target.value)}}/>
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Contrasena</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su constrasena"
                  onChange={(e)=>{setContrasenaIngresada(e.target.value)}}
                />
              </Form.Group>
              
              <Container className="d-flex justify-content-end">
              {botonDeslogear()}
              
              </Container>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;