const dollarValue = document.querySelector('#dollar-score .value');
const bitcoinValue = document.querySelector('#bitcoin-score .value');

// Valores del jugador
let totalBtc = 0;

// Posición actual del mouse
const main = document.querySelector('main');
main.setAttribute('tabindex', '0'); // Para recibir keydown
window.mouseX = 0;
window.mouseY = 0;

main.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ---------------------------
// Animaciones BTC
// ---------------------------
window.buyBtc = function(x, y, amount) {
    const floatElem = document.createElement('div');
    floatElem.className = 'btc-float';
    floatElem.textContent = amount;

    floatElem.style.position = 'absolute';
    floatElem.style.left = `${x}px`;
    floatElem.style.top = `${y}px`;
    floatElem.style.opacity = '1';
    floatElem.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
    floatElem.style.transform = 'translateY(0px)';

    document.body.appendChild(floatElem);

    // Limitar hasta justo debajo del scoreboard
    const scoreboard = document.getElementById('scoreboard');
    const maxTranslate = Math.max(y - (scoreboard.offsetHeight + 2), 0);

    setTimeout(() => {
        floatElem.style.transform = `translateY(-${maxTranslate}px)`;
        floatElem.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        floatElem.remove();
    }, 1100);
};

window.sellBtc = function(x, y, amount) {
    const floatElem = document.createElement('div');
    floatElem.className = 'btc-sell';
    floatElem.textContent = amount;

    floatElem.style.position = 'absolute';
    floatElem.style.left = `${x}px`;
    floatElem.style.top = `${y}px`;
    floatElem.style.opacity = '1';
    floatElem.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
    floatElem.style.transform = 'translateY(0px)';

    document.body.appendChild(floatElem);

    // Calcular distancia hasta el final del body
    const maxTranslate = window.innerHeight - y;

    setTimeout(() => {
        floatElem.style.transform = `translateY(${maxTranslate}px)`;
        floatElem.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        floatElem.remove();
    }, 2100); // coincide con la duración de la transición
};

// ---------------------------
// Actualizar valores en pantalla
// ---------------------------
function updateBtcEquivalent() {
    if (!window.currentBtcPrice) return;

    const currentUsdWorth = totalBtc * window.currentBtcPrice;

    dollarValue.textContent = currentUsdWorth >= 1_000_000_000_000_000_000_000_000_000
        ? `${(currentUsdWorth / 1_000_000_000_000_000_000_000_000_000).toFixed(2)}Sp`
        : currentUsdWorth >= 1_000_000_000_000_000_000_000_000
            ? `${(currentUsdWorth / 1_000_000_000_000_000_000_000_000).toFixed(2)}Sx`
            : currentUsdWorth >= 1_000_000_000_000_000_000_000
                ? `${(currentUsdWorth / 1_000_000_000_000_000_000_000).toFixed(2)}Qi`
                : currentUsdWorth >= 1_000_000_000_000_000_000
                    ? `${(currentUsdWorth / 1_000_000_000_000_000_000).toFixed(2)}Qa`
                    : currentUsdWorth >= 1_000_000_000_000
                        ? `${(currentUsdWorth / 1_000_000_000_000).toFixed(2)}T`
                        : currentUsdWorth >= 1_000_000_000
                            ? `${(currentUsdWorth / 1_000_000_000).toFixed(2)}B`
                            : currentUsdWorth >= 1_000_000
                                ? `${(currentUsdWorth / 1_000_000).toFixed(2)}M`
                                : currentUsdWorth.toFixed(2);

bitcoinValue.textContent = totalBtc >= 1_000_000_000_000_000_000_000_000_000
    ? `${(totalBtc / 1_000_000_000_000_000_000_000_000_000).toFixed(7)}Sp`
    : totalBtc >= 1_000_000_000_000_000_000_000_000
        ? `${(totalBtc / 1_000_000_000_000_000_000_000_000).toFixed(7)}Sx`
        : totalBtc >= 1_000_000_000_000_000_000_000
            ? `${(totalBtc / 1_000_000_000_000_000_000_000).toFixed(7)}Qi`
            : totalBtc >= 1_000_000_000_000_000_000
                ? `${(totalBtc / 1_000_000_000_000_000_000).toFixed(7)}Qa`
                : totalBtc >= 1_000_000_000_000
                    ? `${(totalBtc / 1_000_000_000_000).toFixed(7)}T`
                    : totalBtc >= 1_000_000_000
                        ? `${(totalBtc / 1_000_000_000).toFixed(7)}B`
                        : totalBtc >= 1_000_000
                            ? `${(totalBtc / 1_000_000).toFixed(7)}M`
                            : totalBtc.toFixed(7);
}

window.updateBtcEquivalent = updateBtcEquivalent;

// ---------------------------
// Incrementar BTC por click
// ---------------------------
window.incrementScore = function(x, y) {
    if (!window.currentBtcPrice) return;

    const gainedBtc = window.usdPerClick / window.currentBtcPrice;
    totalBtc += gainedBtc;

    updateBtcEquivalent();
    buyBtc(x, y, `+${gainedBtc.toFixed(7)} BTC`);
}

// ---------------------------
// Eventos
// ---------------------------
main.addEventListener('click', (e) => incrementScore(e.clientX, e.clientY));
main.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        incrementScore(mouseX, mouseY);
    }
});
