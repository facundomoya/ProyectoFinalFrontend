import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      <br />
      <Link  to={`/noticia/${props.noticia._id}`}className='btn btn-sm btn-outline-secondary ms-2 px-4 text-center' >leer mas</Link>
    </Card.Footer>
  </Card>
    );
};

export default Cards;