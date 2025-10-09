import './style.css';
import fondo from "../../assets/libros.png";


function Informativo() {
  return (
    <div 
      className="info-container" 
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="info-overlay">
        <h1 className="info-title">BOOKS API</h1>
        <p className="info-author">Santiago Guzmán</p>

        <img 
          src="src/assets/libro-de-hechizos.png" 
          alt="Books Logo" 
          className="info-logo"
        />

        <p className="info-desc">Api con información de libros</p>

        <a 
          href="https://github.com/Sanguzsua/ApiGutendex" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="info-link"
        >
          https://github.com/Sanguzsua
        </a>

        <p className="info-version">v1.0.0</p>
      </div>
    </div>
  );
}

export default Informativo;
