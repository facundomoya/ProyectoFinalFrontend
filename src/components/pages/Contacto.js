import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import '../../css/Contacto.css';

const Contacto = () => {
  const [formularioEnv, cambiarFormularioEnv] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          nombre: "",
          correo: "",
          mensaje: "",
        }}
        validate={(valores) => {
          let errores = {};

          //Validacion nombre
          if (!valores.nombre) {
            errores.nombre = "Ingrese un nombre.";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = "El nombre solo puede contener espacios y letras.";
          }

          //validacion mensaje
          if (!valores.mensaje) {
            errores.mensaje = "Ingrese un mensaje.";
          } else if (!/^[A-Za-z0-9\s]+$/g.test(valores.mensaje)) {
            errores.mensaje =
              "El mensaje solo puede contener espacios, letras y numeros.";
          }

          //Validacion correo
          if (!valores.correo) {
            errores.correo = "Ingrese un correo electrónico.";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.correo
            )
          ) {
            errores.correo =
              "El correo solo puede tener letras, puntos, numeros, guiones y guion bajo.";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          cambiarFormularioEnv(true);
          setTimeout(() => cambiarFormularioEnv(false), 3500);
        }}
      >
        {({ errors }) => (
          <Container className="align-items-center py-5">
          <Form className="formulario container-fluid col-sm-12 col-md-12">
            <div>
              <h2>Contacte con nosotros</h2>
            </div>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ricardo"
              />
              <ErrorMessage
                name="nombre"
                component={() => <div className="error">{errors.nombre}</div>}
              />
            </div>
            <div>
              <label htmlFor="correo">Correo</label>
              <Field
                type="email"
                id="correo"
                name="correo"
                placeholder="ricardo1978@gmail.com"
              />
              <ErrorMessage
                name="correo"
                component={() => <div className="error">{errors.correo}</div>}
              />
            </div>
            <div>
              <label htmlFor="mensaje">Consulta</label>
              <Field
			  	      type="text"
                id="mensaje"
                name="mensaje"
                as="textarea"
                placeholder="Escriba aqui su consulta."
              />
              <ErrorMessage
                name="mensaje"
                component={() => (
                  <div className="error">{errors.mensaje}</div>
                )}
              />
            </div>

            <button type="submit">Enviar</button>
            {formularioEnv && (
              <p className="exito">Su consulta fue enviada correctamente.</p>
            )}
          </Form>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default Contacto;