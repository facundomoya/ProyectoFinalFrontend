
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {  useNavigate, Link } from "react-router-dom";



const Perfil = (props) => {
 const checkLog = JSON.parse(localStorage.getItem("usuarioLogeado")); 
 let navigate = useNavigate();
 
 useEffect(() => {
    // botonDeslogear();
    //consultaAPI();

  }, []);

  const volver = ()=>{
    if(checkLog === null){
      navigate("/")
     }
  }

    const handlerDeslogear = () => {
 
        localStorage.clear();
 
      };


    return (
        <div className="text-center">
          {()=>{volver();}}
            <h3>Perfil de usuario</h3>
            
            <div>
                Vienvenido {checkLog.nombre}
            </div>

          
            
        <Link to='/'className='btn btn-sm btn-outline-light ms-2 px-4 text-center' onClick={()=>{handlerDeslogear()}} >Deslogear</Link>
        </div>
    );
};

export default Perfil;


