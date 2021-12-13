
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Perfil = () => {
 const checkLog = JSON.parse(localStorage.getItem("usuarioLogeado")); 

 
 useEffect(async() => {
    // botonDeslogear();
    //consultaAPI();
   
  }, []);
 

    const handlerDeslogear = () => {
        localStorage.clear();
        window.location.reload(false);

      };


    return (
        <div className="text-center">
            <h3>Perfil de usuario</h3>
            <Image src={checkLog.fotoURL} thumbnail className="w-50"/>
            <div>
                Vienvenido {checkLog.nombre}
            </div>


            <Button
          variant="dark"
          type=""
          className="my-2 w-25 "
          onClick={handlerDeslogear}
        >
          Deslogear
        </Button>
        </div>
    );
};

export default Perfil;


