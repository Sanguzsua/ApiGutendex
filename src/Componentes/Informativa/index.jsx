// Importo el archivo de estilos para darle formato a la página.
import './style.css';

// Importo la imagen del logo desde la carpeta de assets.
import logo from '../../assets/libro-de-hechizos.png'; 

function Informativo() {
  // Este componente muestra la información general de la aplicación,
  // como el titulo,nombre y el enlace al repositorio de GitHub.
  return (
    <div className="informativo-container">
      {/* Título principal que aparece en la parte superior */}
      <h1>Informativo</h1>

      {/* Encabezado donde muestro el nombre de la app y el logo */}
      <header className="informativo-header">
        <h1 className="informativo-titulo">ApiGutendex</h1>
        <img src={logo} alt="Logo Colombia" className="informativo-logo" />
      </header>

      {/* Contenido principal de la página informativa */}
      <main className="informativo-contenido">
        {/* Nombre del creador del proyecto */}
        <h2>Santiago Guzmán Suarez</h2>

        {/* Breve descripción de lo que hace la aplicación */}
        <p>
          Api con información de libros
        </p>

        {/* Enlace directo al repositorio en GitHub */}
        <div className="informativo-links">
          <a 
            href="https://github.com/Sanguzsua/ApiGutendex" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            🔗 Repositorio en GitHub
          </a>
        </div>

        {/* Versión actual del proyecto */}
        <p className="informativo-version">
          Versión actual: <strong>v1.0.0</strong>
        </p>
      </main>
    </div>
  );
}

export default Informativo;
