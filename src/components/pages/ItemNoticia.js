import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemNoticia = (props) => {
  const URL = "http://localhost:3004/noticias" + "/" + props.noticia.id;

  function eliminarProducto() {
    Swal.fire({
      title: "Esta seguro de eliminar el producto?",
      text: "Una vez borrado el producto no puede ser recuperado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //borro el producto
        try {
          const repuesta = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(repuesta);
          if (repuesta.status === 200) {
            //cartel para el usuario
            Swal.fire(
              "Producto eliminado",
              "El producto fue eliminado de la base de datos",
              "success"
            );
            // volver a consultar api
            props.consultaAPI();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  const cambiarCategoria = ()=>{
      let a = props.noticia.tipo;
      let b = props.categorias;
      let x = b.map((c) => {
        if (c.id == a) {
          return c.categoria;
        }
      });
      return x;
  }
  return (
    <tr className="text-warp">
      <td className="text-warp mx-auto">{props.noticia.titulo}</td>
      <td className="text-warp mx-auto">{cambiarCategoria()}</td>
      <td className="text-warp mx-auto"> {props.noticia.fechaGuardar}</td>
      <td className="text-warp mx-auto">
        <div>
          <Link
            className="btn btn-warning me-2"
            to={`/editar/${props.noticia.id}`}
          >
            Editar
          </Link>
          <Button variant="danger" onClick={() => eliminarProducto()}>
            Borrar
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ItemNoticia;
