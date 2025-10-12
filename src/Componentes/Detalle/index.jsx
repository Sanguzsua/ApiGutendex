// Importo useEffect y useState de React para poder usar estados y efectos
import { useEffect, useState } from "react";
import "./style.css";

function Detalle() {
  // Creo un estado llamado "libros" que al principio está vacío.
  // Aquí se van a guardar los libros que traiga de la API.
  const [libros, setLibros] = useState([]);

  // Con useEffect hago que apenas se abra el componente se ejecute la función que trae los libros.
  // Solo se ejecuta una vez porque el arreglo de dependencias está vacío [].
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        // Hago la petición a la API de Gutendex para obtener los libros.
        const response = await fetch("https://gutendex.com/books/");
        
        // Si la respuesta no es correcta, lanzo un error.
        if (!response.ok) throw new Error("Error al cargar los libros");

        // Convierto la respuesta a formato JSON.
        const data = await response.json();

        // Guardo los resultados en el estado "libros".
        setLibros(data.results);
      } catch (error) {
        // Si algo falla, muestro el error en la consola.
        console.error("Error:", error);
      }
    };

    // Llamo la función para que traiga los libros.
    fetchLibros();
  }, []);

  // Si todavía no hay libros cargados, muestro un mensaje de "Cargando..."
  if (libros.length === 0) return <p style={{ textAlign: "center" }}>Cargando libros...</p>;

  // Cuando ya tengo los libros, los muestro en una lista con su información.
  return (
    <div className="detalle-container">
      <h2>Detalles de los libros</h2>
      <ul className="lista-detalle">
        {libros.map((libro) => (
          // Cada libro tiene su propio elemento en la lista
          <li key={libro.id} className="libro-detalle">
            <h3>{libro.title}</h3>
            <p><b>ID:</b> {libro.id}</p>
            
            {/* Muestro los autores. Si no hay, pongo "Desconocido" */}
            <p><b>Autor(es):</b> {libro.authors.map((a) => a.name).join(", ") || "Desconocido"}</p>
            
            {/* Muestro los idiomas disponibles */}
            <p><b>Lenguaje(s):</b> {libro.languages.join(", ")}</p>
            
            {/* Muestro cuántas veces se ha descargado el libro */}
            <p><b>Descargas:</b> {libro.download_count}</p>

            {/* Si el libro tiene una imagen, la muestro */}
            {libro.formats["image/jpeg"] && (
              <img
                src={libro.formats["image/jpeg"]}
                alt={libro.title}
                className="detalle-img"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detalle;
