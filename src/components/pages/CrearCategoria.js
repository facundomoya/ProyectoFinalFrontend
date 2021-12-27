import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { campoRequerido, datoRequerido, validarEmail, validarUrl } from "../validaciones/helpers";

const CrearCategoria = () => {
const [categoria, setCategoria] = useState('');
const URL = 'http://localhost:3004/categorias';


const handleSubmit =(e)=>{
    e.preventDefault();
    crearCategoria();
};

const crearCategoria= async()=>{
    if(datoRequerido(categoria)){
        const categoriaNueva = {
            categoria
          };
          try {
            const parametros = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(categoriaNueva),
            };
            const repuesta = await fetch(URL, parametros);
            console.log(repuesta);
          } catch (error) {
            console.log(error);
          }
    }else{
        console.log("hay campos incompletos");
    }
};


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese la nueva categoria</Form.Label>
              <Form.Control type="text" placeholder="" 
              onChange={(e) => {setCategoria(e.target.value);}}
              onBlur={(e)=>{campoRequerido(e.target)}}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
                Guardar categoria
            </Button>
          </Form>
        </Container>
    );
};

export default CrearCategoria;