// Importo React, useEffect y useState para manejar los estados y efectos del componente.
import React, { useEffect, useState } from "react";
import "./style.css";

function Home() {
  // Creo un estado para guardar los libros que traigo de la API.
  const [libros, setLibros] = useState([]);

  // Creo un estado llamado "modo" que me permite cambiar entre ver libros o autores.
  const [modo, setModo] = useState("libros");

  // Estado para guardar lo que el usuario escribe en la barra de búsqueda.
  const [busqueda, setBusqueda] = useState("");

  // Estado que indica si los datos están cargando o no.
  const [cargando, setCargando] = useState(false);

  // --- USEEFFECT ---
  // Aquí uso useEffect para que al abrir el componente se haga la petición a la API solo una vez.
  useEffect(() => {
    const fetchLibros = async () => {
      // Antes de traer los datos, pongo "cargando" en true para mostrar el mensaje.
      setCargando(true);
      try {
        // Hago la petición a la API de Gutendex para traer los libros.
        const resp = await fetch("https://gutendex.com/books/");
        const data = await resp.json();

        // Guardo los resultados en el estado de libros.
        setLibros(data.results);
      } catch (error) {
        // Si ocurre un error, lo muestro en la consola.
        console.error("Error cargando libros:", error);
      } finally {
        // Al final, sin importar si falló o no, cambio "cargando" a false.
        setCargando(false);
      }
    };

    // Llamo a la función para que se ejecute.
    fetchLibros();
  }, []);

  // --- SACAR AUTORES ÚNICOS ---
  // Aquí saco todos los autores de los libros, y uso "new Set" para que no se repitan.
  // También filtro los nombres vacíos para que no aparezcan.
  const autoresUnicos = Array.from(
    new Set(
      libros
        .flatMap((libro) => libro.authors.map((autor) => autor.name))
        .filter((nombre) => nombre && nombre.trim() !== "")
    )
  );

  // --- LISTA SEGÚN MODO ---
  // Si el modo es "libros", muestro los libros.
  // Si el modo es "autores", muestro la lista de autores únicos.
  const listaMostrar = modo === "libros" ? libros : autoresUnicos;

  // --- FILTRAR ---
  // Filtro la lista según lo que el usuario escribe.
  // Si está en modo libros, busco por título; si está en modo autores, busco por nombre.
  // Solo empiezo a buscar si el texto tiene 2 letras o más.
  const listaFiltrada =
    busqueda.length >= 2
      ? listaMostrar.filter((item) =>
          modo === "libros"
            ? item.title.toLowerCase().includes(busqueda.toLowerCase())
            : item.toLowerCase().includes(busqueda.toLowerCase())
        )
      : listaMostrar;

  return (
    <>
      {/* Título que cambia dependiendo del modo */}
      <h4>{modo === "libros" ? "Libros disponibles" : "Autores destacados"}</h4>

      {/* Campo de búsqueda que cambia según el modo */}
      <input
        type="text"
        placeholder={
          modo === "libros" ? "Buscar por título..." : "Buscar por autor..."
        }
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* Botones para cambiar entre libros y autores */}
      <div className="filtro">
        <button
          onClick={() => setModo("libros")}
          className={modo === "libros" ? "activo" : ""}
        >
          Libros
        </button>
        <button
          onClick={() => setModo("autores")}
          className={modo === "autores" ? "activo" : ""}
        >
          Autores
        </button>
      </div>

      {/* Si los datos aún cargan, muestro un mensaje. Si no, muestro la lista. */}
      {cargando ? (
        <p>Cargando datos...</p>
      ) : (
        <ul className="lista">
          {/* Si hay resultados, los muestro según el modo. Si no hay, muestro un mensaje. */}
          {listaFiltrada.length > 0 ? (
            modo === "libros" ? (
              // Si estoy en modo libros, muestro los títulos y sus portadas si existen.
              listaFiltrada.map((libro) => (
                <li key={libro.id}>
                  <strong>{libro.title}</strong>
                  <br />
                  {libro.formats["image/jpeg"] ? (
                    <img
                      src={libro.formats["image/jpeg"]}
                      alt={libro.title}
                      style={{
                        width: "120px",
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    />
                  ) : (
                    <p>Sin portada</p>
                  )}
                </li>
              ))
            ) : (
              // Si estoy en modo autores, muestro solo los nombres.
              listaFiltrada.map((autor, index) => <li key={index}>{autor}</li>)
            )
          ) : (
            // Si no hay resultados, muestro este mensaje.
            <p>No se encontraron resultados.</p>
          )}
        </ul>
      )}
    </>
  );
}

export default Home;
