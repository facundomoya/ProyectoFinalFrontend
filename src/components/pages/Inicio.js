import { Form, Button, Container, Row, Col, Image, CardGroup } from "react-bootstrap";
import React, { useState, useEffect,Component } from "react";
import Cards from "./Cards";
import '../../css/Inicio.css';
import PublicidadLarga from '../../img/publicidad1.png';
import PublicidadCuadrada from '../../img/publicuadrada1.jpg';






const Inicio = (props) => {
  const [arrayDeNoticias, setArrayDeNoticias]= useState([]);
  const URLnoticias = "https://proyectofinal16igrupo2.herokuapp.com/apinoticias"

  useEffect( async()=> {
    try{
        const repuesta = await fetch(URLnoticias);
      if(repuesta.status === 200){
        const dato = await repuesta.json();
        setArrayDeNoticias(dato.sort(nuevoViejo).slice(0,3));
      }else{
      }
      
    }catch(error){
        console.log(error);
    }   
    
  }, [0]);

function nuevoViejo(a, b) {
    return  Date.parse(b.fecha) - Date.parse(a.fecha);
  }
  
const mostrarCards =()=>{
    arrayDeNoticias.map()
}

        return (
            
            <Container className='text-center '>
                <h1>Rolling News</h1>
                <h5>noticias principales</h5>
                <CardGroup className="m-5">
                   {arrayDeNoticias.map((noticia)=><Cards key={noticia._id} noticia={noticia} ></Cards>)} 
                </CardGroup>
                <Row>
                    <Col>
                     <Image src={PublicidadCuadrada} className="w-100"></Image>
                    </Col>
                    <Col>
                    <Image src={PublicidadCuadrada}className="w-100"></Image>
                    </Col>
                     <Col>
                    <Image src={PublicidadCuadrada}className="w-100"></Image>
                    </Col>
                    <Image src={PublicidadLarga} className="mx-auto"></Image>
                </Row>
            </Container>
        );
    }


export default Inicio;