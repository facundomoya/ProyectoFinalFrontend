import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { campoRequerido, datoRequerido, validarEmail, validarUrl } from "../validaciones/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const CrearCategoria = () => {
const [categoria, setCategoria] = useState('');
const URL = 'http://localhost:3004/categorias';
const navigation = useNavigate();




const handleSubmit =(e)=>{
    e.preventDefault();
    crearCategoria();
};
const crearCategoria= async(e)=>{
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
            if(repuesta.status === 201){
              console.log('El producto se cargo correctamene')
              Swal.fire(
                'Nueva categoria creada',
                'La categoria fue correctamente creada',
                'success'
              )
              navigation("/Perfil");
            }else{
              console.log('La categoria no se creo correctamene')
            }
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
            <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese la nueva categoria</Form.Label>
              <Form.Control type="text" placeholder="" 
              onChange={(e) => {setCategoria(e.target.value);}}
              onBlur={(e)=>{campoRequerido(e.target)}}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 my-2">
                Guardar categoria
            </Button>
          </Form>
        </Container>
    );
};

export default CrearCategoria;