import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { campoRequerido, datoRequerido, validarEmail, validarUrl } from "../validaciones/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CrearNoticia = (props) => {
  const [titulo, setTitulo] = useState('');
  const [subTitulo, setSubTitulo] = useState('');
  const [imagenPrincial, setImagenPrincial] = useState('');
  const [desarrollo, setDesarrollo] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState(0);
  const [fechaGuardar, setFechaGuardar] = useState('');
  const URL = 'https://proyectofinal16igrupo2.herokuapp.com/apinoticias';
  let current = new Date;
  let currentGuardar = current.valueOf();
  let date = current.toString();
  const navigation = useNavigate();
  

  useEffect(() => {
    current = new Date;
    currentGuardar = current.valueOf();
    date = current.toString();
    setFecha(currentGuardar);
    setFechaGuardar(date);
     
  }, []);
  const handleSubmit = (e)=>{
    e.preventDefault();
    setFecha(currentGuardar);
    setFechaGuardar(date);
    crearNoticia();
    
  }
  const crearNoticia = async()=>{
    if (datoRequerido(titulo) && datoRequerido(subTitulo) && datoRequerido(imagenPrincial)&& datoRequerido(desarrollo)&& datoRequerido(autor)) {
          const noticiaNueva = {
            titulo,
            subTitulo,
            imagenPrincial,
            desarrollo,
            autor,
            tipo,
            fecha,
            fechaGuardar
          };
          try {
            const parametros = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(noticiaNueva),
            };
            const repuesta = await fetch(URL, parametros);
            if(repuesta.status === 201){
              console.log('El producto se cargo correctamene')
              Swal.fire(
                'Nueva noticia creada',
                'La noticia fue correctamente creada',
                'success'
              )
              navigation("/Perfil");
            }else{
              console.log('La noticia no se creo correctamene')
            }
          } catch (error) {
            console.log(error);
          }
    }else{
        console.log("hay campos incompletos");
    }
};

  return (
    <Container className="text-start my-4">
      
      <Row className="bg-light pb-3">
        <Col>
        <h3>Crearr noticia</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo de la noticia</Form.Label>
              <Form.Control type="text" placeholder="" 
              onChange={(e) => {setTitulo(e.target.value);}}
              onBlur={(e)=>{campoRequerido(e.target)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subtitulo o descripcion breve</Form.Label>
              <Form.Control type="text" placeholder="" 
              onChange={(e) => {setSubTitulo(e.target.value);}} 
              onBlur={(e)=>{campoRequerido(e.target)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Imagen principal de la noticia</Form.Label>
              <Form.Control type="text" placeholder="" 
              onChange={(e) => { setImagenPrincial(e.target.value);}}
              onBlur={(e)=>{validarUrl(e.target)}}/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Desarrollo de la noticia</Form.Label>
              <Form.Control as="textarea" rows={3} 
              onChange={(e) => {setDesarrollo(e.target.value);}}
              onBlur={(e)=>{campoRequerido(e.target)}}/>
            </Form.Group>
            <Form.Select aria-label="Default select example" onChange={(e)=>{setTipo(e.target.value)}}>
              <option value="">Seleccione una categoria</option>
              {props.categorias.map((categoria)=>{return <option value={categoria.categoria}>{categoria.categoria}</option>})}
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Firma Autor</Form.Label>
              <Form.Control type="text" placeholder="" 
              onChange={(e) => {setAutor(e.target.value)}}
              onBlur={(e)=>{campoRequerido(e.target)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
                Guardar
            </Button>
          </Form>
        </Col>
        </Row >
        <hr></hr>
        <Row >
        <h3>Vista previa</h3>
        <Col className="my-5 bg-light border shadow-lg">
          <p className="p-2 text-secondary ">{tipo}</p> 
                  <Container className="text-start">
                  <h1 className="mt-5" >{titulo}</h1>
                  <h5>{subTitulo}</h5>
                  <Image src={imagenPrincial} alt="imagen principal de la noticia" className="my-2 w-100"/>
                  <p className="text-start">{desarrollo}</p>
                  <p className="text-end mt-5 text-start">{autor}</p>
                  </Container>
                 
        </Col>
      </Row>
    </Container>
  );
};

export default CrearNoticia;
