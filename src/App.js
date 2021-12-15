import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/common/Navigation'
import Footer from './components/common/Footer'
import Error404 from './components/pages/Error404'
import Inicio from './components/pages/Inicio';
import CrearUsuario from './components/pages/CrearUsuario';
import Perfil from './components/pages/Perfil';
import { useState , useEffect} from 'react';
import CrearNoticia from './components/pages/CrearNoticia';

function App() {
  const [estaLogeado, setEstalLogeado]= useState();
 let checkLog = JSON.parse(localStorage.getItem("usuarioLogeado")); 

 useEffect(() => {
  console.log();
  mostrarUsuario();
}, []);
  const mostrarUsuario= ()=>{
    if(checkLog !== null){
      setEstalLogeado(true)
      
    }else{
      setEstalLogeado(false)
    }
  }
  const redirPerfil = ()=>{
    if(estaLogeado){
      return <Route exact path='/Perfil' element={<Perfil></Perfil>}></Route>
    }else{
      return <Route exact path='/Perfil' element={<Inicio></Inicio>}></Route>
    }
  }
  const redirCrearNoticia = ()=>{
    if(estaLogeado && checkLog.administrador){
       return <Route exact path='/crearnoticia' element={<CrearNoticia></CrearNoticia>}></Route>
    }else{
       return <Route exact path='/crearnoticia' element={<Inicio></Inicio>}></Route>
    }
  }
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Inicio></Inicio>}></Route>
        <Route exact path='/CrearUsuario' element={<CrearUsuario></CrearUsuario>}></Route>
        {redirPerfil()}
        {redirCrearNoticia()}
        
        <Route exact path='*' element={<Error404></Error404>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
