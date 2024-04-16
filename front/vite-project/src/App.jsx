import {Routes, Route} from "react-router-dom"
import './styles/global.css';
import NavBar from './components/NavBar';
import Home from './views/Home'
import Login from "./views/Login";
import MisTurnos from './views/Misturnos';
import Contacto from './views/Contacto';
import Register from './views/Register';

const App = () => {
  return (
    <div id="myBody">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/misTurn" element={<MisTurnos/>}></Route>
        <Route path='/contacto' element={<Contacto/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route> {/* Agrega la ruta para el componente Login */}
        <Route path="/home" element={<Home/>}></Route> {/* Agrega la ruta para la página de inicio */}
      </Routes>
    </div>
  );
}

export default App;
