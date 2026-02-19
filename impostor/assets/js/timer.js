const DEBUG_DISCUSSION_TIME = 300; // ⏱️ SEGUNDOS (cambia luego a 300)

function startDiscussion() {
  showScreen("discussion");

  // 🔥 PARAR cualquier timer anterior
  if (GameState.discussionTimer) {
    clearInterval(GameState.discussionTimer);
    GameState.discussionTimer = null;
  }

  let time = DEBUG_DISCUSSION_TIME;
  const timerEl = document.getElementById("timer");

  updateTimerUI(time);

  GameState.discussionTimer = setInterval(() => {
    time--;

    updateTimerUI(time);

    if (time <= 0) {
      clearInterval(GameState.discussionTimer);
      GameState.discussionTimer = null;
      startVoting();
    }
  }, 1000);
}

function updateTimerUI(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${m}:${s}`;
}
