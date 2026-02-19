const GameState = {
  players: [],
  impostorCount: 1,
  secretWord: "",
  hint: "",
  currentPlayerIndex: 0,
  phase: "setup",
  votes: {},
  lastEliminated: null,
  discussionTimer: null,
  noHints: false
};


const screens = {
  setup: "setup-screen",
  card: "card-screen",
  discussion: "discussion-screen",
  voting: "voting-screen",
  reveal: "reveal-screen",
  end: "end-screen"
};

function showScreen(name) {
  document.querySelectorAll(".screen").forEach(screen =>
    screen.classList.remove("active")
  );

  document
    .getElementById(screens[name])
    .classList.add("active");
}

let WORDS = [];

// Cargar palabras correctamente
fetch("assets/data/words.json")
  .then(res => res.json())
  .then(data => {
    WORDS = data;
    console.log("Palabras cargadas:", WORDS.length);
  })
  .catch(err => {
    alert("Error cargando words.json");
    console.error(err);
  });
