function startGame() {
  if (GameState.players.length < 3) {
    alert("Mínimo 3 jugadores");
    return;
  }

  GameState.impostorCount = parseInt(
    document.getElementById("impostor-count").value
  );

  if (GameState.impostorCount >= GameState.players.length) {
    alert("Debe haber menos impostores que jugadores");
    return;
  }

  if (WORDS.length === 0) {
    alert("Las palabras aún no se han cargado");
    return;
  }

  GameState.noHints = document.getElementById("no-hints").checked;

  const [word, hint] = WORDS[Math.floor(Math.random() * WORDS.length)];
  GameState.secretWord = word;
  GameState.hint = hint;

  const shuffled = [...GameState.players].sort(() => Math.random() - 0.5);
  shuffled.forEach((p, i) => {
    p.role = i < GameState.impostorCount ? "IMPOSTOR" : "CIVIL";
    p.alive = true;
  });

  GameState.players = shuffled;
  GameState.currentPlayerIndex = 0;

  showScreen("card");
  showCard();
}


function showCard() {
  const p = GameState.players[GameState.currentPlayerIndex];
  const nameEl = document.getElementById("current-player-name");
  const cardEl = document.querySelector(".card");
  
  nameEl.classList.remove("exit");
  cardEl.classList.remove("exit");
  
  nameEl.textContent = p.name;

  let cardHTML = "";
  
  if (p.role === "CIVIL") {
    cardHTML = `<h2>CIVIL</h2><p>${GameState.secretWord}</p>`;
  } else {
    // IMPOSTOR
    if (GameState.noHints) {
      cardHTML = `<h2>IMPOSTOR</h2><p>Sin pistas</p>`;
    } else {
      cardHTML = `<h2>IMPOSTOR</h2><p>${GameState.hint}</p>`;
    }
  }

  document.getElementById("card-content").innerHTML = cardHTML;
}

function flipCard() {
  document.querySelector(".card").classList.toggle("flipped");
}

function nextPlayer() {
  const cardEl = document.querySelector(".card");
  const nameEl = document.getElementById("current-player-name");
  
  cardEl.classList.remove("flipped");
  cardEl.classList.add("exit");
  nameEl.classList.add("exit");
  
  GameState.currentPlayerIndex++;

  setTimeout(() => {
    if (GameState.currentPlayerIndex >= GameState.players.length) {
      startDiscussion();
    } else {
      showCard();
    }
  }, 400);
}
