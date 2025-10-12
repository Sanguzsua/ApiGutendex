// Importo useEffect y useState para manejar los estados y efectos del juego.
import { useEffect, useState } from "react";
import "./style.css";

function Original() {
  // Estado para guardar las cartas del juego.
  const [cartas, setCartas] = useState([]);

  // Estados para guardar la primera y la segunda carta seleccionada.
  const [primera, setPrimera] = useState(null);
  const [segunda, setSegunda] = useState(null);

  // Estado que sirve para bloquear las acciones mientras se comparan cartas.
  const [bloquear, setBloquear] = useState(false);

  // Estado para saber si el jugador ganó.
  const [ganado, setGanado] = useState(false);

  // 🔹 Cargar 6 libros del API
  // Con useEffect hago que al abrir el componente se carguen 6 libros de la API.
  useEffect(() => {
    const fetchLibros = async () => {
      // Hago la petición a la API para obtener los libros.
      const resp = await fetch("https://gutendex.com/books/?page=1");
      const data = await resp.json();

      // De todos los libros, tomo solo los primeros 6.
      const libros = data.results.slice(0, 6);

      // Duplico los libros para que haya pares y luego los mezclo aleatoriamente.
      const cartasBarajadas = [...libros, ...libros]
        .map((libro) => ({
          id: Math.random(),          // ID único para cada carta
          matchId: libro.id,           // ID original para saber qué cartas hacen pareja
          nombre: libro.title,         // Nombre del libro
          imagen: libro.formats["image/jpeg"], // Imagen de la portada
          volteada: false,             // Si la carta está dada vuelta o no
          acertada: false,             // Si la carta ya fue encontrada
        }))
        .sort(() => Math.random() - 0.5); // Mezclar las cartas

      // Guardo las cartas en el estado.
      setCartas(cartasBarajadas);
      setGanado(false);
    };

    fetchLibros();
  }, []);

  // 🔹 Elegir carta
  // Esta función se ejecuta cuando el jugador hace clic en una carta.
  const manejarClick = (carta) => {
    // Si el turno está bloqueado o la carta ya está volteada/acertada, no hago nada.
    if (bloquear || carta.volteada || carta.acertada) return;

    // Cambio el estado de la carta seleccionada a volteada.
    const nuevasCartas = cartas.map((c) =>
      c.id === carta.id ? { ...c, volteada: true } : c
    );
    setCartas(nuevasCartas);

    // Si no hay una carta seleccionada, guardo esta como la primera.
    if (!primera) {
      setPrimera(carta);
    } else {
      // Si ya hay una primera carta, guardo esta como la segunda y bloqueo los clics.
      setSegunda(carta);
      setBloquear(true);
    }
  };

  // 🔹 Comparar dos cartas seleccionadas
  // Cuando el jugador elige dos cartas, comparo si son iguales.
  useEffect(() => {
    if (primera && segunda) {
      if (primera.matchId === segunda.matchId) {
        // Si las dos cartas son iguales, marco ambas como acertadas.
        setCartas((prev) =>
          prev.map((c) =>
            c.matchId === primera.matchId ? { ...c, acertada: true } : c
          )
        );
        resetTurno();
      } else {
        // Si no son iguales, las volteo otra vez después de 1 segundo.
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
  // Limpio las cartas seleccionadas y quito el bloqueo para continuar jugando.
  const resetTurno = () => {
    setPrimera(null);
    setSegunda(null);
    setBloquear(false);
  };

  // 🔹 Verificar si ganó
  // Cada vez que cambia el estado de las cartas, reviso si todas están acertadas.
  useEffect(() => {
    if (cartas.length > 0 && cartas.every((c) => c.acertada)) {
      setGanado(true);
    }
  }, [cartas]);

  // 🔹 Reiniciar juego
  // Si el jugador gana, puede reiniciar el juego recargando la página.
  const reiniciar = () => {
    window.location.reload();
  };

  return (
    <div className="juego-container">
      <h2>🎴 Juego de Memoria Literaria</h2>

      {/* Si el jugador gana, muestro un mensaje de felicitación */}
      {ganado && (
        <div className="mensaje-ganador">
          🎉 ¡Felicidades! Has encontrado todas las parejas.
          <button onClick={reiniciar}>Jugar otra vez</button>
        </div>
      )}

      {/* Contenedor de todas las cartas en forma de cuadrícula */}
      <div className="grid-cartas">
        {cartas.map((carta) => (
          <div
            key={carta.id}
            className={`carta ${carta.volteada || carta.acertada ? "volteada" : ""}`}
            onClick={() => manejarClick(carta)}
          >
            {/* Cara frontal de la carta con la imagen del libro */}
            <div className="cara frente">
              <img src={carta.imagen} alt={carta.nombre} />
            </div>

            {/* Cara trasera con el ícono del libro */}
            <div className="cara reverso">📚</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Original;
