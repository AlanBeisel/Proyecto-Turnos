import Home from "./views/Home";
import NavBar from "./components/NavBar";
import './styles/global.css'
import MisTurnos from "./views/MisTurnos.jsx";

const App = () => {
  return (
    <>
    <NavBar/>
    <Home/>
    <MisTurnos/>
    </>
  )
}

export default App
