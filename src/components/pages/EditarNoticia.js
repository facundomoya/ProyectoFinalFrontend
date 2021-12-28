import React, {useState, useEffect, useRef} from 'react';
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { campoRequerido, datoRequerido, validarEmail, validarUrl } from "../validaciones/helpers";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditarNoticia = (props) => {
    const {id} = useParams();
    const [titulo, setTitulo] = useState('');
    const [subTitulo, setSubTitulo] = useState('');
    const [imagenPrincial, setImagenPrincial] = useState('');
    const [desarrollo, setDesarrollo] = useState('');
    const [autor, setAutor] = useState('');
    const [tipo, setTipo] = useState('');
    const [fecha, setFecha] = useState(0);
    const [fechaGuardar, setFechaGuardar] = useState('');
    const tituloNoticiaRef = useRef('');
    const subTituloNoticiaRef = useRef('');
    const imagenPrincipalNoticiaRef = useRef('');
    const desarrolloNoticiaRef = useRef('');
    const autorNoticiaRef = useRef('');
    const tipoNoticiaRef = useRef('');
    const navigation = useNavigate();
    const URL = 'http://localhost:3004/noticias' + "/"+ id;


useEffect(async()=>{
        //consutal a la api por el prodcuto que tiene el id que guardamos en la dir
        try{
          const repuesta = await fetch(URL);
          if(repuesta.status === 200){
            const dato = await repuesta.json();
            setTitulo(dato.titulo);
            setSubTitulo(dato.subTitulo);
            setImagenPrincial(dato.imagenPrincial);
            setDesarrollo(dato.desarrollo);
            setAutor(dato.autor);
            setTipo(dato.tipo);
            setFecha(dato.fecha);
            setFechaGuardar(dato.fechaGuardar)
          }else{
    
          }
          
        }catch(error){
          console.error();
        }
      }, []); 


      const handleSubmit = async(e) =>{
        e.preventDefault();
        if(datoRequerido(tituloNoticiaRef.current.value) && datoRequerido(subTituloNoticiaRef.current.value) && datoRequerido(imagenPrincipalNoticiaRef.current.value) && datoRequerido(desarrolloNoticiaRef.current.value) && datoRequerido(autorNoticiaRef.current.value) && datoRequerido(tipo)){
           //construir el objeto a enviar a la api
          
           try{
            const noticiaNotificada = {
              titulo: tituloNoticiaRef.current.value,
              subTitulo: subTituloNoticiaRef.current.value,
              imagenPrincial: imagenPrincipalNoticiaRef.current.value,
              desarrollo: desarrolloNoticiaRef.current.value,
              autor: autorNoticiaRef.current.value,
              tipo: tipo,
              fecha: fecha,
              fechaGuardar: fechaGuardar
            };
            const respuesta = await fetch(URL,{
              method: "PUT",
              headers: {"Content-Type" : "application/json"},
              body: JSON.stringify(noticiaNotificada)
            })
            if(respuesta.status === 200){
              //cartel para el usuario
          Swal.fire(
            'Noticia actualizada',
            'La noticia fue actualizada correctamente',
            'success'
          )
          // volver a consultar api
           props.consultaAPI();
           navigation("/Perfil");
           }
            props.consultaApi();
           }catch(error){
             console.log(error)
           }
    
        }else{
          //si hay un error, notificarlo
        }
      };

    return (
        <Container className="text-start my-4">
      
        <Row className="bg-light pb-3">
          <Col>
          <h3>Editar noticia</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Titulo de la noticia</Form.Label>
                <Form.Control type="text" placeholder="" 
                defaultValue={titulo} ref={tituloNoticiaRef}
                onBlur={(e)=>{campoRequerido(e.target)}}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Subtitulo o descripcion breve</Form.Label>
                <Form.Control type="text" placeholder="" 
                defaultValue={subTitulo} ref={subTituloNoticiaRef}
                onChange={(e) => {setSubTitulo(e.target.value);}} 
                onBlur={(e)=>{campoRequerido(e.target)}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Imagen principal de la noticia</Form.Label>
                <Form.Control type="text" placeholder="" 
                defaultValue={imagenPrincial} ref={imagenPrincipalNoticiaRef}
                onChange={(e) => { setImagenPrincial(e.target.value);}}
                onBlur={(e)=>{validarUrl(e.target)}}/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Desarrollo de la noticia</Form.Label>
                <Form.Control as="textarea" rows={3} 
                defaultValue={desarrollo} ref={desarrolloNoticiaRef}
                onChange={(e) => {setDesarrollo(e.target.value);}}
                onBlur={(e)=>{campoRequerido(e.target)}}/>
              </Form.Group>
              <Form.Select aria-label="Default select example" value={tipo} onChange={(e)=>{setTipo(e.target.value)}}>
                <option value="">Seleccione una categoria</option>
                {props.categorias.map((categoria)=>{return <option value={categoria.id}>{categoria.categoria}</option>})}
              </Form.Select>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Firma Autor</Form.Label>
                <Form.Control type="text" placeholder="" 
                defaultValue={autor} ref={autorNoticiaRef}
                onChange={(e) => {setAutor(e.target.value)}}
                onBlur={(e)=>{campoRequerido(e.target)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                  Guardar
              </Button>
            </Form>
          </Col>
          </Row>
      </Container>
    );
};

export default EditarNoticia;