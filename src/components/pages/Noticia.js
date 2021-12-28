import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../../css/Inicio.css";

const Noticia = (props) => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [subTitulo, setSubTitulo] = useState("");
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [desarrollo, setDesarrollo] = useState("");
  const [autor, setAutor] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState(0);
  const [fechaGuardar, setFechaGuardar] = useState("");
  let checkLog = JSON.parse(localStorage.getItem("usuarioLogeado"));
  const URL =
    "https://proyectofinal16igrupo2.herokuapp.com/apinoticias" + "/" + id;

  useEffect(async () => {
    //consutal a la api por el prodcuto que tiene el id que guardamos en la dir
    try {
      const repuesta = await fetch(URL);
      if (repuesta.status === 200) {
        const dato = await repuesta.json();
        setTitulo(dato.titulo);
        setSubTitulo(dato.subTitulo);
        setImagenPrincipal(dato.imagenPrincipal);
        setDesarrollo(dato.desarrollo);
        setAutor(dato.autor);
        setTipo(dato.tipo);
        setFecha(dato.fecha);
        setFechaGuardar(dato.fechaGuardar);
      } else {
      }
    } catch (error) {
      console.error();
    }
  }, []);

  const mostrarBotonEditar = () => {
    if (checkLog != null) {
      if (checkLog.administrador) {
        return <Link to={`/editar/${id}`}> asdasdasd</Link>;
      } else {
      }
    } else {
      return;
    }
  };

  return (
    <Container>
      <h1 className="text-center">{titulo}</h1>
      <h5 className="text-start">{subTitulo}</h5>
      <Image src={imagenPrincipal} className=" img-t2"></Image>
      <p>{desarrollo}</p>
      <Row className="my-2">
        <Col>
          <p>{autor}</p>
        </Col>
        <Col>
          <p>{fechaGuardar}</p>
        </Col>
        {mostrarBotonEditar()}
      </Row>
    </Container>
  );
};

export default Noticia;
