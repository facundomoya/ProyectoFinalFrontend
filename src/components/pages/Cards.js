import React from 'react';
import { Card } from 'react-bootstrap';
import '../../css/Inicio.css';

const Cards = (props) => {
    return (
    <Card className='mx-3 shadow-lg'>
    <Card.Img variant="top" src={props.noticia.imagenPrincipal} className=' mx-auto my-2 img-t'  />
    <Card.Body>
      <Card.Title>{props.noticia.titulo}</Card.Title>
      <Card.Text>
        {props.noticia.subTitulo}
      </Card.Text>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{props.noticia.fechaGuardar}</small>
    </Card.Footer>
  </Card>
    );
};

export default Cards;