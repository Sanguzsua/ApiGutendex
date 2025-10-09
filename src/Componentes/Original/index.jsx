
import { useEffect, useState } from "react";
import "./style.css";

function Original() {
  const [cartas, setCartas] = useState([]);
  const [primera, setPrimera] = useState(null);
  const [segunda, setSegunda] = useState(null);
  const [bloquear, setBloquear] = useState(false);
  const [ganado, setGanado] = useState(false);

  // 🔹 Cargar 6 libros del API
  useEffect(() => {
    const fetchLibros = async () => {
      const resp = await fetch("https://gutendex.com/books/?page=1");
      const data = await resp.json();
      const libros = data.results.slice(0, 6);

      // duplicar cada libro para crear pares y barajar
      const cartasBarajadas = [...libros, ...libros]
        .map((libro) => ({
          id: Math.random(),
          matchId: libro.id,
          nombre: libro.title,
          imagen: libro.formats["image/jpeg"],
          volteada: false,
          acertada: false,
        }))
        .sort(() => Math.random() - 0.5);

      setCartas(cartasBarajadas);
      setGanado(false);
    };

    fetchLibros();
  }, []);

  // 🔹 Elegir carta
  const manejarClick = (carta) => {
    if (bloquear || carta.volteada || carta.acertada) return;

    const nuevasCartas = cartas.map((c) =>
      c.id === carta.id ? { ...c, volteada: true } : c
    );
    setCartas(nuevasCartas);

    if (!primera) {
      setPrimera(carta);
    } else {
      setSegunda(carta);
      setBloquear(true);
    }
  };

  // 🔹 Comparar dos cartas seleccionadas
  useEffect(() => {
    if (primera && segunda) {
      if (primera.matchId === segunda.matchId) {
        setCartas((prev) =>
          prev.map((c) =>
            c.matchId === primera.matchId
              ? { ...c, acertada: true }
              : c
          )
        );
        resetTurno();
      } else {
        setTimeout(() => {
          setCartas((prev) =>
            prev.map((c) =>
              c.id === primera.id || c.id === segunda.id
                ? { ...c, volteada: false }
                : c
            )
          );
          resetTurno();
        }, 1000);
      }
    }
  }, [primera, segunda]);

  // 🔹 Reiniciar turno
  const resetTurno = () => {
    setPrimera(null);
    setSegunda(null);
    setBloquear(false);
  };

  // 🔹 Verificar si ganó
  useEffect(() => {
    if (cartas.length > 0 && cartas.every((c) => c.acertada)) {
      setGanado(true);
    }
  }, [cartas]);

  // 🔹 Reiniciar juego
  const reiniciar = () => {
    window.location.reload();
  };

  return (
    <div className="juego-container">
      <h2>🎴 Juego de Memoria Literaria</h2>

      {ganado && (
        <div className="mensaje-ganador">
          🎉 ¡Felicidades! Has encontrado todas las parejas.
          <button onClick={reiniciar}>Jugar otra vez</button>
        </div>
      )}

      <div className="grid-cartas">
        {cartas.map((carta) => (
          <div
            key={carta.id}
            className={`carta ${carta.volteada || carta.acertada ? "volteada" : ""}`}
            onClick={() => manejarClick(carta)}
          >
            <div className="cara frente">
              <img src={carta.imagen} alt={carta.nombre} />
            </div>
            <div className="cara reverso">📚</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Original;
