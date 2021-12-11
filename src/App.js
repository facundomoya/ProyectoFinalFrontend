import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/common/Navigation'
import Footer from './components/common/Footer'
import Error404 from './components/pages/Error404'
import Inicio from './components/pages/Inicio';

function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
      <Route exact path='/' element={<Inicio></Inicio>}></Route>
        <Route exact path='*' element={<Error404></Error404>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
