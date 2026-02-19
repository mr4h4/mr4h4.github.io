function startVoting() {
  showScreen("voting");
  GameState.votes = {};

  const list = document.getElementById("voting-list");
  list.innerHTML = "";

  GameState.players.filter(p => p.alive).forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.name;
    btn.onclick = () => castVote(p.name);
    list.appendChild(btn);
  });
}

function castVote(name) {
  GameState.votes[name] = (GameState.votes[name] || 0) + 1;
  resolveVotes();
}

function resolveVotes() {
  let max = 0;
  let eliminated = null;
  let tie = false;

  for (let p in GameState.votes) {
    if (GameState.votes[p] > max) {
      max = GameState.votes[p];
      eliminated = p;
      tie = false;
    } else if (GameState.votes[p] === max) {
      tie = true;
    }
  }

  if (tie || !eliminated) {
    startDiscussion();
    return;
  }

  const player = GameState.players.find(p => p.name === eliminated);
  player.alive = false;
  GameState.lastEliminated = player;

  showEliminationReveal();
}

function showEliminationReveal() {
  showScreen("reveal");

  const p = GameState.lastEliminated;
  document.getElementById("revealed-player-name").textContent = p.name;

  document.getElementById("reveal-card-content").innerHTML =
    p.role === "CIVIL"
      ? `<h2>CIVIL</h2><p>${GameState.secretWord}</p>`
      : `<h2>IMPOSTOR</h2><p>${GameState.hint}</p>`;

  // IMPORTANTE: quitar flipped de la CARD, no del inner
  document
    .querySelector("#reveal-screen .card")
    .classList.remove("flipped");
}


function flipRevealCard() {
  document
    .querySelector("#reveal-screen .card")
    .classList.toggle("flipped");
}


function continueAfterReveal() {
  checkWin();
}


function checkWin() {
  const alive = GameState.players.filter(p => p.alive);
  const impostors = alive.filter(p => p.role === "IMPOSTOR");
  const civils = alive.filter(p => p.role === "CIVIL");

  if (impostors.length === 0) {
    endGame("CIVILES GANAN");
    return;
  }

  if (impostors.length >= civils.length) {
    endGame("IMPOSTORES GANAN");
    return;
  }

  startDiscussion();
}


function endGame(text) {
  showScreen("end");
  document.getElementById("winner-text").textContent = text;
  document.getElementById("reveal-text").textContent =
    `Palabra: ${GameState.secretWord} | Pista: ${GameState.hint}`;
}

function resetGame() {
  location.reload();
}

function restartSamePlayers() {
  // Resetear estado de ronda
  GameState.players.forEach(p => {
    p.alive = true;
    p.role = null;
  });

  GameState.votes = {};
  GameState.lastEliminated = null;
  GameState.currentPlayerIndex = 0;

  // Volver a repartir roles y palabra
  startGame();
}

function backToSetup() {
  // Resetear estado de partida
  GameState.players.forEach(p => {
    p.alive = true;
    p.role = null;
  });

  GameState.votes = {};
  GameState.lastEliminated = null;
  GameState.currentPlayerIndex = 0;
  GameState.phase = "setup";

  showScreen("setup");
}
