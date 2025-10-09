import React, { useEffect, useState } from "react";
import "./style.css";

function Home() {
  const [libros, setLibros] = useState([]);
  const [modo, setModo] = useState("libros");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchLibros = async () => {
      setCargando(true);
      try {
        const resp = await fetch("https://gutendex.com/books/");
        const data = await resp.json();
        setLibros(data.results);
      } catch (error) {
        console.error("Error cargando libros:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchLibros();
  }, []);

  // --- SACAR AUTORES ÚNICOS ---
  const autoresUnicos = Array.from(
    new Set(
      libros
        .flatMap((libro) => libro.authors.map((autor) => autor.name))
        .filter((nombre) => nombre && nombre.trim() !== "")
    )
  );

  // --- LISTA SEGÚN MODO ---
  const listaMostrar = modo === "libros" ? libros : autoresUnicos;

  // --- FILTRAR ---
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
      <h4>{modo === "libros" ? "Libros disponibles" : "Autores destacados"}</h4>

      <input
        type="text"
        placeholder={
          modo === "libros" ? "Buscar por título..." : "Buscar por autor..."
        }
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

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

      {cargando ? (
        <p>Cargando datos...</p>
      ) : (
        <ul className="lista">
          {listaFiltrada.length > 0 ? (
            modo === "libros" ? (
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
              listaFiltrada.map((autor, index) => <li key={index}>{autor}</li>)
            )
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </ul>
      )}
    </>
  );
}

export default Home;
