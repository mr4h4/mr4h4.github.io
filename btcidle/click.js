const dollarValue = document.querySelector('#dollar-score .value');
const bitcoinValue = document.querySelector('#bitcoin-score .value');

// Valores del jugador
window.totalBtc = 0;
window.totalClicks = 0;

// Posición actual del mouse
const main = document.querySelector('main');
main.setAttribute('tabindex', '0'); // Para recibir keydown
window.mouseX = 0;
window.mouseY = 0;

main.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.playSound = function(url) {
    const audio = new Audio(url);
    audio.play();
}

window.normalizer = function(value, decimals = 2) {
    const units = [
        { limit: 1e27, suffix: "Sp" }, // Septillón
        { limit: 1e24, suffix: "Sx" }, // Sextillón
        { limit: 1e21, suffix: "Qi" }, // Quintillón
        { limit: 1e18, suffix: "Qa" }, // Cuatrillón
        { limit: 1e12, suffix: "T"  }, // Trillón
        { limit: 1e9,  suffix: "B"  }, // Billón
        { limit: 1e6,  suffix: "M"  }  // Millón
    ];

    for (const u of units) {
        if (value >= u.limit) {
            return (value / u.limit).toFixed(decimals) + u.suffix;
        }
    }

    return value.toFixed(decimals);
}

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

    dollarValue.textContent = normalizer(currentUsdWorth, 2);

    bitcoinValue.textContent = normalizer(totalBtc, 7);
}

window.updateBtcEquivalent = updateBtcEquivalent;

// ---------------------------
// Incrementar BTC por click
// ---------------------------
window.incrementScore = function(x, y) { // un click en (x, y)
    if (!window.currentBtcPrice) return;

    //Crypto Bro Logro
    if (totalClicks > 1 && document.getElementById('cryptoBro').classList.contains('not-achieved')) {
       unlockAchievement('cryptoBro');
    }

    //Hash Slayer Logro
    if (totalBtc >= 1){
    unlockAchievement('hashslayer')
    }

    //Millionaire Logro
    if (totalBtc * window.currentBtcPrice >= 1000000) {
        unlockAchievement('millionaire');
    }

    const gainedBtc = window.usdPerClick / window.currentBtcPrice;
    totalBtc += gainedBtc;

    totalClicks++;
    
    document.getElementById('click-score').querySelector('#value').textContent = totalClicks;

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
