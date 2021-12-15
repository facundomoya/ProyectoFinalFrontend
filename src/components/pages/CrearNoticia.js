import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { campoRequerido, datoRequerido, validarEmail, validarUrl } from "../validaciones/helpers";


const CrearNoticia = () => {
  const [titulo, setTitulo] = useState('');
  const [subTitulo, setSubTitulo] = useState('');
  const [imagenPrincial, setImagenPrincial] = useState('');
  const [desarrollo, setDesarrollo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState(0);
  const URL = 'http://localhost:3004/noticias';
  let current = new Date;
  let currentGuardar = current.valueOf();

  const date = current.toDateString();
  //[current.getDate()+"/", current.getMonth()+1,"/" + current.getFullYear(),"-" + current.getHours(), ":"+ current.getMinutes()]

  const handleSubmit = (e)=>{
    e.preventDefault();
    setFecha(currentGuardar);
    console.log(URL);
    crearNoticia();
  }
  const crearNoticia = async()=>{
    if (datoRequerido(titulo) && datoRequerido(subTitulo) && datoRequerido(imagenPrincial)&& datoRequerido(desarrollo)&& datoRequerido(autor) && datoRequerido(categoria)) {
          const noticiaNueva = {
            titulo,
            subTitulo,
            imagenPrincial,
            desarrollo,
            autor,
            categoria,
            fecha
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
            console.log(repuesta);
          } catch (error) {
            console.log(error);
          }
    } else {
      console.log("hay campos incompletos");
    }
  }

  return (
    <Container className="text-start my-4">
      
      <Row className="bg-light pb-3">
        <Col>
        <h3>Editar noticia</h3>
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
            <Form.Select aria-label="Default select example" onChange={(e)=>{setCategoria(e.target.value)}}>
              <option value="">Seleccione una categoria</option>
              <option value="Actualidad">Actualidad</option>
              <option value="Deportes">Deportes</option>
              <option value="Politica">Politica</option>
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
          <p className="p-2 text-secondary ">{categoria}</p> 
                  <Container className="text-start">
                  <h1 className="mt-5" >{titulo}</h1>
                  <h5>{subTitulo}</h5>
                  <Image src={imagenPrincial} alt="imagen principal de la noticia" className="my-2 w-100"/>
                  <p className="text-start">{desarrollo}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam qui consequatur unde, ut earum molestias cum. Iure nemo accusantium molestiae placeat, suscipit enim voluptatibus excepturi nostrum, non obcaecati corrupti? Aut dolor incidunt tenetur, tempora numquam voluptatibus aliquam quisquam totam amet possimus impedit eveniet natus sapiente mollitia fugit culpa molestiae veritatis? Impedit in, iure amet reprehenderit, voluptatem facere eum commodi iste vel quam assumenda. Debitis vitae corporis architecto quam, minus sunt ab amet ipsam rerum veniam sed laborum ratione libero odit, atque cum ut accusantium distinctio eveniet? Voluptas deleniti vitae accusamus, consectetur hic autem voluptatibus minus totam cumque molestias voluptate dolor.
                  </p>
                  <p className="text-end mt-5 text-start">{autor} on {date}</p>
                  </Container>
                 
        </Col>
      </Row>
    </Container>
  );
};

export default CrearNoticia;
