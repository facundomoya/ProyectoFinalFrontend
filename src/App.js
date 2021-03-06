import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import CrearUsuario from "./components/pages/CrearUsuario";
import Perfil from "./components/pages/Perfil";
import PerfilAdmin from "./components/pages/PerfilAdmin";
import { useState, useEffect } from "react";
import CrearNoticia from "./components/pages/CrearNoticia";
import CrearCategoria from "./components/pages/CrearCategoria";
import EditarNoticia from "./components/pages/EditarNoticia";
import Contacto from './components/pages/Contacto';
import Nosotros from './components/pages/Nosotros';
import Noticia from "./components/pages/Noticia";

function App() {
  const [estaLogeado, setEstalLogeado] = useState();
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const URLnoticias = "https://proyectofinal16igrupo2.herokuapp.com/apinoticias"
  const URLcategorias = "https://proyectofinal16igrupo2.herokuapp.com/apicategoria"
  let checkLog = JSON.parse(localStorage.getItem("usuarioLogeado"));
 

  useEffect(() => {
    mostrarUsuario();
    consultaAPI();
    
  }, []);
////// ordenar y filtrar array de noticias/////
function comparar ( a, b ){ return a.fecha - b.fecha };

const consultaAPI = async () => {
    try {
      const respuesta = await fetch(URLnoticias);
      const datos = await respuesta.json();
      setNoticias(datos);
      const respuesta2 = await fetch(URLcategorias);
      const datos2 = await respuesta2.json();
      setCategorias(datos2);
    } catch (error) {
      console.log(error) ;
    }
};

  const mostrarUsuario = () => {
    if (checkLog !== null) {
      setEstalLogeado(true);
    } else {
      setEstalLogeado(false);
    }
  };
  const redirPerfil = () => {
    if (estaLogeado) {
      if (checkLog.administrador) {
        return (
          <Route
            exact
            path="/Perfil"
            element={<PerfilAdmin  noticias={noticias.sort(comparar)} categorias={categorias} consultaAPI={consultaAPI}></PerfilAdmin>}
          ></Route>
        );
      } else {
        return <Route exact path="/Perfil" element={<Perfil></Perfil>}></Route>;
      }
    } else {
      return <Route exact path="/Perfil" element={<Inicio></Inicio>}></Route>;
    }
  };

  const redirCrearNoticia = () => {
    if (estaLogeado && checkLog.administrador) {
      return (
        <Route
          exact
          path="/crearnoticia"
          element={<CrearNoticia categorias={categorias}></CrearNoticia>}
        ></Route>
      );
    } else {
      return (
        <Route exact path="/crearnoticia" element={<Inicio></Inicio>}></Route>
      );
    }
  };
  const redirCrearCategoria =()=>{
    if (estaLogeado && checkLog.administrador) {
      return (
        <Route
          exact
          path="/crearcategoria"
          element={<CrearCategoria categorias={categorias} ></CrearCategoria>}
        ></Route>
      );
    } else {
      return (
        <Route exact path="/crearnoticia" element={<Inicio></Inicio>}></Route>
      );
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Inicio noticias={noticias} consultaAPI={consultaAPI}></Inicio>}></Route>
        <Route
          exact
          path="/CrearUsuario"
          element={<CrearUsuario></CrearUsuario>}
        ></Route>
        {redirPerfil()}
        {redirCrearNoticia()}
        {redirCrearCategoria()}
        <Route
          path="/editar/:id"
          element={<EditarNoticia noticias={noticias} categorias={categorias} consultaAPI={consultaAPI}></EditarNoticia>}
        ></Route>


        <Route exact path="/*" element={<Error404></Error404>}></Route>
        <Route exact path="/contacto" element={<Contacto></Contacto>}></Route>
        <Route exact path="/nosotros" element={<Nosotros></Nosotros>}></Route>
        <Route exact path="/noticia/:id" element={<Noticia noticias={noticias} categorias={categorias} consultaAPI={consultaAPI}></Noticia>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
