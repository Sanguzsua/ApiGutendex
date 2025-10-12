import './style.css';
import logo from '../../assets/libro-de-hechizos.png'; 

function Informativo() {
  return (
    
    <div className="informativo-container">
      <h1>Informativo</h1>
      <header className="informativo-header">
        <h1 className="informativo-titulo">ApiGutendex</h1>
        <img src={logo} alt="Logo Colombia" className="informativo-logo" />
        
      </header>

      <main className="informativo-contenido">
        <h2>Santiago Guzmán Suarez</h2>
        <p>
          Api con información de libros
        </p>

        <div className="informativo-links">
          <a 
            href="https://github.com/Sanguzsua/ApiGutendex" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            🔗 Repositorio en GitHub
          </a>
        </div>

        <p className="informativo-version">Versión actual: <strong>v1.0.0</strong></p>
      </main>
    </div>
  );
}

export default Informativo;
