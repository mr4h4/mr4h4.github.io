const balon = document.getElementById("balon");
const portero = document.getElementById("portero");
const marcador = document.getElementById("marcador");
const turnoTexto = document.getElementById("turnoTexto");
const rondaContador = document.getElementById("rondaContador");
const floatingText = document.getElementById("floatingText");

const overlay = document.getElementById("overlay");
const overlayEmoji = document.getElementById("overlayEmoji");
const overlayText = document.getElementById("overlayText");
const overlayBtn = document.getElementById("overlayBtn");
const nameInputs = document.getElementById("nameInputs");

const snd = {
  click: new Audio("sounds/click.mp3"),
  kick: new Audio("sounds/kick.mp3"),
  goal: new Audio("sounds/goal.mp3"),
  fail: new Audio("sounds/fail.mp3")
};

let jugadores = ["", ""];
let goles = [0, 0];
let tiros = [0, 0];
let turnoFase = 0; // 0: Delantero elige, 1: Portero elige
let eleccionDelantero = "";

window.onload = pedirNombres;

function play(sound) {
  if (snd[sound]) {
    snd[sound].currentTime = 0;
    snd[sound].play().catch(() => {}); 
  }
}

function pedirNombres() {
  overlay.style.display = "flex";
  nameInputs.style.display = "flex";
  overlayEmoji.textContent = "✍️";
  overlayText.textContent = "Introduce los nombres de los jugadores";
  overlayBtn.textContent = "Empezar Partido";

  overlayBtn.onclick = () => {
    const n1 = document.getElementById("name1").value.trim();
    const n2 = document.getElementById("name2").value.trim();
    jugadores[0] = n1 || "Jugador 1";
    jugadores[1] = n2 || "Jugador 2";
    play("click");
    overlay.style.display = "none";
    actualizarMarcador();
    actualizarTurno();
  };
}

function actualizarTurno() {
  const totalTiros = tiros[0] + tiros[1];
  const indexTirador = totalTiros % 2;
  const indexPortero = 1 - indexTirador;
  
  // Cálculo de ronda: cada 2 tiros sube una ronda
  const numeroRonda = Math.floor(totalTiros / 2) + 1;

  // Actualizar indicador de ronda o Muerte Súbita
  if (numeroRonda > 5) {
    rondaContador.textContent = "🔥 MUERTE SÚBITA";
    rondaContador.style.color = "#ff5252";
  } else {
    rondaContador.textContent = `Ronda ${numeroRonda} / 5`;
    rondaContador.style.color = "#fff";
  }

  if (turnoFase === 0) {
    turnoTexto.innerHTML = `<span style="color: #fff">${jugadores[indexTirador]}</span> <small>(Delantero)</small>`;
  } else {
    turnoTexto.innerHTML = `<span style="color: #ffee58">${jugadores[indexPortero]}</span> <small>(Portero)</small>`;
  }
}

function elegir(lado) {
  play("click");
  if (turnoFase === 0) {
    eleccionDelantero = lado;
    turnoFase = 1;
    mostrarPasarMovil();
    actualizarTurno();
  } else {
    resolver(lado);
  }
}

function mostrarPasarMovil() {
  nameInputs.style.display = "none";
  overlay.style.display = "flex";
  
  const indexTirador = (tiros[0] + tiros[1]) % 2;
  const indexPortero = 1 - indexTirador;

  if (turnoFase === 1) {
    overlayEmoji.textContent = "🤝📱";
    overlayText.innerHTML = `¡Tiro fijado!<br>Pasa el móvil a <b>${jugadores[indexPortero]}</b> (Portero)`;
  } else {
    overlayEmoji.textContent = "⚽";
    overlayText.innerHTML = `Siguiente turno.<br>Le toca a <b>${jugadores[indexTirador]}</b> (Delantero)`;
  }
  
  overlayBtn.textContent = "Continuar";
  overlayBtn.onclick = () => {
    play("click");
    overlay.style.display = "none";
  };
}

function resolver(ladoPortero) {
  animarTiro(eleccionDelantero);
  animarPortero(ladoPortero);
  play("kick");

  setTimeout(() => {
    const indexTirador = (tiros[0] + tiros[1]) % 2;
    const esGol = eleccionDelantero !== ladoPortero;

    if (esGol) {
      goles[indexTirador]++;
      play("goal");
      mostrarFloating("¡GOL!", "#00e676");
    } else {
      play("fail");
      mostrarFloating("PARADA", "#ff5252");
    }

    tiros[indexTirador]++;
    actualizarMarcador();
    
    setTimeout(() => {
      resetearAnimacion();
      if (finJuego()) {
        mostrarGanador();
      } else {
        turnoFase = 0;
        mostrarPasarMovil();
        actualizarTurno();
      }
    }, 1000);

  }, 600);
}

function animarTiro(lado) {
  balon.style.bottom = "65%";
  balon.style.left = lado === "izquierda" ? "30%" : lado === "derecha" ? "70%" : "50%";
}

function animarPortero(lado) {
  portero.style.left = lado === "izquierda" ? "35%" : lado === "derecha" ? "65%" : "50%";
}

function resetearAnimacion() {
  balon.style.bottom = "8%";
  balon.style.left = "50%";
  portero.style.left = "50%";
}

function mostrarFloating(texto, color) {
  floatingText.textContent = texto;
  floatingText.style.color = color;
  floatingText.style.opacity = 1;
  floatingText.style.transform = "translate(-50%, -60%)";
  setTimeout(() => {
    floatingText.style.opacity = 0;
    floatingText.style.transform = "translate(-50%, -40%)";
  }, 800);
}

function actualizarMarcador() {
  marcador.textContent = `${jugadores[0]} ${goles[0]} - ${goles[1]} ${jugadores[1]}`;
}

function finJuego() {
  const totalTiros = tiros[0] + tiros[1];
  const diff = Math.abs(goles[0] - goles[1]);

  // Regla estándar de 5 tiros
  if (totalTiros < 10) {
    const tirosRestantesJugadorQueVaPerdiendo = 5 - Math.max(tiros[0], tiros[1]);
    // Si la diferencia es mayor a los tiros que quedan, termina
    if (diff > tirosRestantesJugadorQueVaPerdiendo + (tiros[0] !== tiros[1] ? 1 : 0)) {
        // Esta es una simplificación, pero para el flujo del juego funciona:
        // Si alguien ya no puede empatar matemáticamente
        const t0_restantes = 5 - tiros[0];
        const t1_restantes = 5 - tiros[1];
        if (goles[0] > goles[1] + t1_restantes) return true;
        if (goles[1] > goles[0] + t0_restantes) return true;
    }
    return false;
  }
  
  // Muerte súbita: termina si después de un par de tiros (ronda completa) hay diferencia
  return totalTiros % 2 === 0 && diff > 0;
}

function mostrarGanador() {
  nameInputs.style.display = "none";
  overlay.style.display = "flex";
  overlayEmoji.textContent = "🏆";
  const ganador = goles[0] > goles[1] ? jugadores[0] : jugadores[1];
  overlayText.textContent = `¡Final del partido! Gana ${ganador}`;
  overlayBtn.textContent = "Revancha";
  overlayBtn.onclick = () => location.reload();
}