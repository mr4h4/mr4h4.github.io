// Inicialización
let clickLevel = 1;
let clickPrice = 100; // Nivel 1
window.usdPerClick = 0.5;

let autoLevel = 0;
let autoPrice = 1000; // Nivel 0
let autoInterval = 5000 / (1 + autoLevel * 0.15);

// ---------------------------
// Upgrade click
// ---------------------------
document.getElementById('click-upgrade').addEventListener('click', (e) => {
    const costInBtc = clickPrice / window.currentBtcPrice;
    if (totalBtc >= costInBtc) {
        totalBtc -= costInBtc;
        window.sellBtc(e.clientX, e.clientY, `- $${clickPrice.toFixed(2)}`);
        window.updateBtcEquivalent();

        clickLevel++;
        clickPrice *= 2.5;
        window.usdPerClick *= 1.5;

        saveUpgradeLevel();
        updateUpgradeDisplay();
    }
});

document.getElementById('auto-upgrade').addEventListener('click', (e) => { 
    const costInBtc = autoPrice / window.currentBtcPrice;
    if (totalBtc >= costInBtc && autoLevel < 10) { // límite nivel máximo
        totalBtc -= costInBtc;
        window.sellBtc(e.clientX, e.clientY, `- $${autoPrice.toFixed(2)}`);
        window.updateBtcEquivalent();

        autoLevel++;
        autoPrice *= 4.25; // precios x4.25
        startAutoBtcGeneration();
        saveUpgradeLevel();
        updateUpgradeDisplay();

        if (autoLevel >= 10) {
            document.getElementById('auto-upgrade').disabled = true;
            autoPrice = "Maxed"; 
        }
    }
});

let autoIntervalId = null;
function startAutoBtcGeneration() {
    if (autoIntervalId) clearInterval(autoIntervalId);

    // Intervalo logarítmico hasta nivel 6
    autoInterval = 3000 * Math.pow(0.03 / 3000, autoLevel / 20); // Ajusta la base según quieras

    // Limitar intervalo a 50ms desde nivel 7
    if (autoLevel >= 7) autoInterval = 50;

    // Calcular clicks por iteración según nivel
    clicksPerIteration = autoLevel >= 7 ? autoLevel - 5 : 1;
    // Nivel 7 → 2 clicks, Nivel 8 → 3 clicks, Nivel 10 → 5 clicks

    autoIntervalId = setInterval(() => {
        for (let i = 0; i < clicksPerIteration; i++) {
            incrementScore(mouseX, mouseY);
        }
    }, autoInterval);
}

// ---------------------------
// Guardar / cargar
// ---------------------------
function saveUpgradeLevel() {
    localStorage.setItem('clickLevel', clickLevel);
    localStorage.setItem('clickPrice', clickPrice);
    localStorage.setItem('autoLevel', autoLevel);
    localStorage.setItem('autoPrice', autoPrice);
}

function loadUpgradeLevel() {
    const savedClickLevel = localStorage.getItem('clickLevel');
    const savedClickPrice = localStorage.getItem('clickPrice');
    const savedAutoLevel = localStorage.getItem('autoLevel');
    const savedAutoPrice = localStorage.getItem('autoPrice');

    if (savedClickLevel) clickLevel = parseInt(savedClickLevel, 10);
    if (savedClickPrice) clickPrice = parseFloat(savedClickPrice);
    if (savedAutoLevel) autoLevel = parseInt(savedAutoLevel, 10);
    if (savedAutoPrice) autoPrice = parseFloat(savedAutoPrice);

    updateUsdPerClick();
    updateUpgradeDisplay();
}

// ---------------------------
// Actualizar UI
// ---------------------------
function updateUsdPerClick() {
    clickPrice = 100 * Math.pow(2.5, clickLevel - 1);
    window.usdPerClick = 0.5 * Math.pow(1.5, clickLevel - 1);
}

function updateUpgradeDisplay() {
    const HTMLclickLevel = document.getElementById('click-level');
    const HTMLclickPrice = document.getElementById('click-price');

    const HTMLautoLevel = document.getElementById('auto-level');
    const HTMLautoPrice = document.getElementById('auto-price');

    HTMLclickLevel.textContent = clickLevel;
HTMLclickPrice.textContent = clickPrice >= 1_000_000_000_000_000_000_000_000_000
    ? `${(clickPrice / 1_000_000_000_000_000_000_000_000_000).toFixed(2)}Sp`
    : clickPrice >= 1_000_000_000_000_000_000_000_000
        ? `${(clickPrice / 1_000_000_000_000_000_000_000_000).toFixed(2)}Sx`
        : clickPrice >= 1_000_000_000_000_000_000_000
            ? `${(clickPrice / 1_000_000_000_000_000_000_000).toFixed(2)}Qi`
            : clickPrice >= 1_000_000_000_000_000_000
                ? `${(clickPrice / 1_000_000_000_000_000_000).toFixed(2)}Qa`
                : clickPrice >= 1_000_000_000_000
                    ? `${(clickPrice / 1_000_000_000_000).toFixed(2)}T`
                    : clickPrice >= 1_000_000_000
                        ? `${(clickPrice / 1_000_000_000).toFixed(2)}B`
                        : clickPrice >= 1_000_000
                            ? `${(clickPrice / 1_000_000).toFixed(2)}M`
                            : clickPrice.toFixed(2);

    HTMLautoLevel.textContent = autoLevel;
    HTMLautoPrice.textContent = autoLevel >= 10 ? "Maxed" : autoPrice >= 1_000_000 ? (autoPrice / 1_000_000).toFixed(2) + 'M' : autoPrice.toFixed(2);
    HTMLautoPrice.previousElementSibling.style.display = autoLevel >= 10 ? "none" : "inline"; // Eliminar el símbolo $ si está maxeado
    if (autoLevel >= 10) {
        document.getElementById('auto-upgrade').disabled = true;
    }
}

// ---------------------------
// Inicializar
// ---------------------------
loadUpgradeLevel();
if (autoLevel > 0) {
    startAutoBtcGeneration();
}
