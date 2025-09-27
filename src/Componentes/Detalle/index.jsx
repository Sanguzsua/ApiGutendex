import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detalle() {
  const { id } = useParams();
  const [libroData, setLibroData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const url = `https://gutendex.com/books/${id}/`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();

        if (!data) {
          console.warn(`Libro con id "${id}" no encontrado.`);
        }

        setLibroData(data);
      } catch (error) {
        console.error("Error al cargar el JSON:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!libroData) return <p>Cargando libro...</p>;

  return (
    <div>
      <h1>{libroData.title}</h1>
      <p>ID: {libroData.id}</p>
      <p>Autores: {libroData.authors.map((a) => a.name).join(", ")}</p>
      <p>Lenguajes: {libroData.languages.join(", ")}</p>
      <p>Descargas: {libroData.download_count}</p>

      {libroData.formats["image/jpeg"] && (
        <img
          src={libroData.formats["image/jpeg"]}
          alt={libroData.title}
          style={{ maxWidth: "200px" }}
        />
      )}
    </div>
  );
}

export default Detalle;
