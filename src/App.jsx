// Importo las herramientas principales de React Router para poder moverme entre páginas sin recargar.
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Importo los estilos generales del proyecto.
import './App.css';

// Importo los componentes que representan cada pantalla de la aplicación.
import Home from './Componentes/Home';
import Favoritos from './Componentes/Favoritos';
import Informativo from './Componentes/Informativa';
import Original from './Componentes/Original';
import Detalle from './Componentes/Detalle';

// Este es el componente principal de toda la aplicación.
function App() {
  return (
    <>
      {/* Envolvemos todo en Router para poder usar rutas dentro de la app */}
      <Router>

        {/* Este es el menú de navegación que aparece abajo en la pantalla */}
        <nav className="c-menu">
          {/* Cada Link lleva a una parte distinta del proyecto */}
          <Link to="/">Home</Link>
          <Link to="/Informativo">Informativo</Link>
          <Link to="/Original">Original</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Detalle">Detalle</Link>
        </nav>

        {/* Aquí defino las rutas, o sea, qué componente se muestra según la página */}
        <Routes>
          {/* Página principal donde se muestran los libros */}
          <Route path="/" element={<Home />} />

          {/* Página informativa donde está la descripción del proyecto y el autor */}
          <Route path="/Informativo" element={<Informativo />} />

          {/* Página con el juego de memoria usando libros */}
          <Route path="/Original" element={<Original />} />

          {/* Página donde se mostrarían los libros favoritos */}
          <Route path="/Favoritos" element={<Favoritos />} />

          {/* Página que muestra los detalles de los libros */}
          <Route path="/Detalle" element={<Detalle />} />

          {/* Versión de detalle que puede mostrar un libro específico según su ID */}
          <Route path="/Detalle/:id" element={<Detalle />} />
        </Routes>
      </Router>
    </>
  );
}

// Exporto el componente principal para que se use en el resto del proyecto.
export default App;
