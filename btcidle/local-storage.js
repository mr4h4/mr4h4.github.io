// ---------------------------
// Guardar datos globales del jugador
// ---------------------------
function savePlayerData() {
    if (!window.currentBtcPrice) return;

    const data = {
        totalBtc,
        lastBtcPrice: window.currentBtcPrice,
        lastTimestamp: Date.now(),
        clickLevel,
        clickPrice,
        autoLevel,
        autoPrice
    };
    localStorage.setItem('btcClickerPlayer', JSON.stringify(data));
}

// ---------------------------
// Cargar datos globales
// ---------------------------
function loadPlayerData() {
    const raw = localStorage.getItem('btcClickerPlayer');
    if (!raw) return;

    const data = JSON.parse(raw);

    if (!window.currentBtcPrice) {
        setTimeout(loadPlayerData, 500);
        return;
    }

    if (data.lastBtcPrice > 0) {
        const ratio = window.currentBtcPrice / data.lastBtcPrice;
        totalBtc = data.totalBtc * ratio;
    } else {
        totalBtc = data.totalBtc;
    }

    if (data.clickLevel !== undefined) clickLevel = data.clickLevel;
    if (data.clickPrice !== undefined) clickPrice = data.clickPrice;
    if (data.autoLevel !== undefined) autoLevel = data.autoLevel;
    if (data.autoPrice !== undefined) autoPrice = data.autoPrice;

    if (window.updateBtcEquivalent) window.updateBtcEquivalent();
    if (window.updateUpgradeDisplay) window.updateUpgradeDisplay();
}

// ---------------------------
// Autosave
// ---------------------------
setInterval(savePlayerData, 5000);
window.addEventListener('beforeunload', savePlayerData);

// ---------------------------
// Inicialización
// ---------------------------
loadPlayerData();
