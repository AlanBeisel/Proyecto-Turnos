import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './views/Home'
import Login from "./views/Login";
import MisTurnos from './views/MisTurnos';
import Contacto from './views/Contacto';
import Register from './views/Register';
import './styles/global.css';

const App = () => {
  return (
    <div id="myBody">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/misTurn" element={<MisTurnos/>}></Route>
        <Route path='/contacto' element={<Contacto/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route> 
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
