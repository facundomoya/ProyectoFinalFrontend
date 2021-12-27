import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Item,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  ListGroup,
  Table,
  Select,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemNoticia from "./ItemNoticia";

const PerfilAdmin = (props) => {
  const [filtrarCategoria, setFiltrarCategoria] = useState("0");
  const [ordenarFecha, setOrdenarFecha] = useState(true);
  const [nuevoArrayNoticias, setNuevoArrayNoticias] = useState([]);

  useEffect(() => {
    props.consultaAPI();
   // setNuevoArrayNoticias(props.noticias);
  }, []);

  function comparar(a, b) {
    return b.fecha - a.fecha;
  }
  function comparar2(a, b) {
    return a.fecha - b.fecha;
  }
  const masViejoArriba = () => {
    if (ordenarFecha === true) {
      setNuevoArrayNoticias(props.noticias.sort(comparar));
      setOrdenarFecha(false);
    } else {
      setNuevoArrayNoticias(props.noticias.sort(comparar2));
      setOrdenarFecha(true);
    }
  };
const mostrarTabla = ()=>{
  if(filtrarCategoria === "0"){
    return(props.noticias.map((noticia) => (
      <ItemNoticia
        categorias={props.categorias}
        key={noticia.id}
        noticia={noticia}
        consultaAPI={props.consultaAPI}
      ></ItemNoticia>)))
  }else{
    let nuevoArray = props.noticias.filter((x)=>{  
      if(x.categoria === filtrarCategoria){
        return x
      }
    });
    return(nuevoArray.map((noticia) => (
      <ItemNoticia
        categorias={props.categorias}
        key={noticia.id}
        noticia={noticia}
        consultaAPI={props.consultaAPI}
      ></ItemNoticia>)))
    console.log(nuevoArray);
  }
};
  

  return (
    <Container className="my-5">
      <h1>BIENVENIDO AL PERFIL DE AMINISTRADOR</h1>
      <h3>
        Aqui vas a poder  crear noticias, tambien ver y editar noticias que estan cargadas
        en este sitio{" "}
      </h3>

      <div>
        <Link
          to="/crearnoticia"
          variant="primary"
          type="submit"
          className="mx-2"
        >
          Crear noticia
        </Link>
        <Link
          to="/crearcategoria"
          variant="primary"
          type="submit"
          className="mx-2"
        >
          Crear categoria
        </Link>

      </div>
      <div className="text-end">
        <Form.Select
          className="my-3"
          aria-label="Filtrar por categorias"
          onChange={(e) => {
            setFiltrarCategoria(e.target.value);
          }}
        >
          <option value="0">Mostrar todas las categorias</option>
          {props.categorias.map((categoria) => {
            return <option value={categoria.id}>{categoria.categoria}</option>;
          })}
        </Form.Select>
        <Button
          onClick={() => {
            masViejoArriba();
          }}
        >
          Cambiar orden
        </Button>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Categoria</th>
              <th>Fecha creada</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>{mostrarTabla()}
            </tbody>
        </Table>
        <ListGroup></ListGroup>
      </div>
    </Container>
  );
};

export default PerfilAdmin;
