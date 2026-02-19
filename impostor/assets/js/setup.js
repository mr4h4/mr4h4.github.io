function addPlayer() {
  const input = document.getElementById("player-name");
  if (!input.value) return;

  GameState.players.push({
    name: input.value,
    role: null,
    alive: true
  });

  input.value = "";
  renderPlayers();
}

function renderPlayers() {
  const list = document.getElementById("player-list");
  list.innerHTML = "";

  GameState.players.forEach((p, i) => {
    const li = document.createElement("li");

    const nameInput = document.createElement("input");
    nameInput.value = p.name;
    nameInput.oninput = e => p.name = e.target.value;

    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = () => {
      GameState.players.splice(i, 1);
      renderPlayers();
    };

    li.append(nameInput, del);
    list.appendChild(li);
  });
}
