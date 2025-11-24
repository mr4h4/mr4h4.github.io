const btcPriceSpan = document.getElementById('bitcoin-price');
window.lastBtcPrice = null;
window.matrixColor = '#8e8e8eb7'; // naranja por defecto

function updateMatrixColor(state) {
    switch(state) {
        case 'up':
            window.matrixColor = '#00ff66'; // verde
            break;
        case 'down':
            window.matrixColor = '#ff2200'; // rojo
            break;
        case 'stable':
        default:
            window.matrixColor = '#8e8e8eb7'; // naranja
            break;
    }
}

async function updateBitcoinPrice() {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    const data = await response.json();
    const price = parseFloat(data.price); 

    // Guardamos el último precio antes de actualizar
    window.lastBtcPrice = window.currentBtcPrice || price;

    // Guardamos precio globalmente
    window.currentBtcPrice = price; 

    // Mostrar precio BTC con 2 decimales
    btcPriceSpan.textContent = price.toFixed(2);

    // Actualizar USD de tus BTC en tiempo real
    if (window.updateBtcEquivalent) {
        window.updateBtcEquivalent();
    }
    
    // Opcional: log para depuración
    //console.log("Último precio:", window.lastBtcPrice, "Precio actual:", window.currentBtcPrice);
    if (window.lastBtcPrice < window.currentBtcPrice) { // Precio subiendo
        updateMatrixColor('up');
        document.getElementById('dollar-score').className = 'up';
        document.getElementById('bitcoin-container').className = 'up';
    } else if (window.lastBtcPrice > window.currentBtcPrice) { // Precio bajando
        updateMatrixColor('down');
        document.getElementById('dollar-score').className = 'down';
        document.getElementById('bitcoin-container').className = 'down';
    } else { // Precio estable
        updateMatrixColor('stable');
        document.getElementById('dollar-score').className = 'stable';
        document.getElementById('bitcoin-container').className = 'stable';
    }

  } catch (err) {
    console.error('Error obteniendo el precio BTC:', err);
  }
}

// Actualizar al cargar y cada 1 segundo
updateBitcoinPrice();
setInterval(updateBitcoinPrice, 1000);
