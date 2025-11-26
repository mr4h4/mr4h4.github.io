// Probabilidad global de que caiga una imagen
let dropProbability = 0.3; // 30%
let catchedcoins = 0;
let totalBtc = 0;

// Función que genera la imagen
function dropImage(imgSrc, onClickFunction) {
    const div = document.createElement('div');
    div.className = 'falling-div';
    div.style.backgroundImage = `url(${imgSrc})`;
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.width = '80px';
    div.style.height = '80px';
    div.style.position = 'absolute';
    div.style.left = Math.random() * (window.innerWidth - 80) + 'px';
    div.style.top = '0px';
    div.style.cursor = 'pointer';
    div.style.pointerEvents = 'auto';
    div.style.zIndex = 1000000;

    div.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        onClickFunction(x, y);
        div.remove();
    });

    document.body.appendChild(div);

    // Calculamos el 90% de la altura de la ventana
    const targetTop = window.innerHeight * 0.9;

    requestAnimationFrame(() => {
        div.style.transition = 'top 3s linear';
        div.style.top = targetTop + 'px';
    });

    // Eliminamos el div justo al llegar al 90%
    setTimeout(() => {
        if (div.parentElement) div.remove();
    }, 3000); // coincide con la duración de la transición
}

// Función que decide si cae una imagen según la probabilidad global
function tryDropImage() {
    if (Math.random() < dropProbability) {
        dropImage("./img/fallingcoin.gif", (x, y) => {
            if (catchedcoins === 0) {
                unlockAchievement('goldenreflexes');
            }
            playSound('./audio/coin.mp3');
            catchedcoins++;

            // Calculamos BTC ganado
            const gainedBtc = (window.usdPerClick / window.currentBtcPrice) * 10;

            // Función que muestra animación de BTC ganado
            buyBtc(x, y, `+${gainedBtc.toFixed(7)} BTC`);

            // Sumamos al total
            totalBtc += gainedBtc;
        });
    }
}

// Loop constante: cada 0.5 segundos se intenta soltar una imagen
setInterval(tryDropImage, 500);
