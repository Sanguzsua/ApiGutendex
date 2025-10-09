import { useEffect, useState } from "react";
import "./style.css";

function Detalle() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch("https://gutendex.com/books/");
        if (!response.ok) throw new Error("Error al cargar los libros");
        const data = await response.json();
        setLibros(data.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLibros();
  }, []);

  if (libros.length === 0) return <p style={{ textAlign: "center" }}>Cargando libros...</p>;

  return (
    <div className="detalle-container">
      <h2>Detalles de los libros</h2>
      <ul className="lista-detalle">
        {libros.map((libro) => (
          <li key={libro.id} className="libro-detalle">
            <h3>{libro.title}</h3>
            <p><b>ID:</b> {libro.id}</p>
            <p><b>Autor(es):</b> {libro.authors.map((a) => a.name).join(", ") || "Desconocido"}</p>
            <p><b>Lenguaje(s):</b> {libro.languages.join(", ")}</p>
            <p><b>Descargas:</b> {libro.download_count}</p>

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
