import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <div className="clinic-info">
        <img src="https://i.pinimg.com/originals/3c/de/18/3cde1831a298ef0581dd66618171d5ef.jpg" alt="Clinic Image" className="clinic-image" />
        <div className="clinic-description">
            <div className="about-us-container">
          <h2>Quiénes somos</h2>
          <p>
            Somos una clínica odontológica comprometida con la salud bucal de nuestros pacientes. 
            Nuestro equipo de profesionales altamente calificados se dedica a brindar atención 
            odontológica de calidad en un ambiente cómodo y amigable.
          </p>
          </div>
          <div className="dental-health-container">
            <h2>Salud dental</h2>
            <p>
              La salud dental es fundamental para el bienestar general. Mantener una buena salud 
              bucal ayuda a prevenir enfermedades dentales, como caries y enfermedad de las encías, 
              y contribuye a una mejor salud en general.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;