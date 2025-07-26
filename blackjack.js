let playing = false;
let canDeal = true;
let canHit = false;
let result = '';
let round = 0;

let deck = [];
let userHand = [];
let dealerHand = [];
let playerBusted = false;

let balance = 5000;
let betRange = document.getElementById("bet");
let betDisplay = document.getElementById("betDisplay");
let bet = parseInt(betRange.value);

const dealButton = document.getElementById("deal");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");

// Pre-cargar todos los sonidos necesarios
const sounds = {
    blackjack: new Audio('assets/audio/blackjack.wav'),
    card: new Audio('assets/audio/card.mp3'),
    draw: new Audio('assets/audio/draw.wav'),
    lose: new Audio('assets/audio/lose.wav'),
    mix: new Audio('assets/audio/mix.mp3'),
    select: new Audio('assets/audio/select.mp3'),
    win: new Audio('assets/audio/win.wav')
};

// Desbloqueo inicial de audio en iOS
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
document.body.addEventListener('click', () => {
    context.resume().then(() => {
        console.log("AudioContext unlocked for iOS Safari.");
    });
}, { once: true });

betRange.addEventListener("input", function () {
    bet = parseInt(betRange.value);
    betDisplay.textContent = bet;

    if (bet > balance) {
        canDeal = false;
        dealButton.style.border = "2px solid red";
    } else {
        canDeal = true;
        dealButton.style.border = "";
    }
});

function updateBalance() {
    document.getElementById("balance").textContent = `${balance}$`;
    betRange.max = balance;
}
updateBalance();

async function endGame(result) {
    playing = false;
    canHit = false;

    const userScore = handValue(userHand);
    const dealerScore = handValue(dealerHand);

    updateDealButton();
    updateHitButton();
    updateStandButton();

    const resultMessage = document.getElementById("resultMessage");
    let message = "";

    try {
        await sounds[result].play(); // Reproducir sonido
    } catch (e) {
        console.warn("No se pudo reproducir el sonido:", e);
    }

    // Calcular el resultado y mensaje
    switch (result) {
        case 'blackjack':
            balance += (bet * 3);
            message = `You win with a Blackjack! ${userScore} against ${dealerScore}`;
            break;
        case 'win':
            balance += (bet * 2);
            message = `You win with: ${userScore} against ${dealerScore}`;
            break;
        case 'lose':
            message = `You lose with: ${userScore} against ${dealerScore}`;
            break;
        default:
            balance += bet;
            message = "Push, nobody wins.";
            break;
    }

    // Mostrar el resultado y actualizar la UI
    resultMessage.textContent = message;
    resultMessage.style.color = "yellow";
    updateBalance();

    // Habilitar nuevamente el rango de apuestas y el botón DEAL si el balance es suficiente
    betRange.disabled = false;
    canDeal = balance >= bet;
    updateDealButton();

    playerBusted = false;
}

function updateDealButton() {
    dealButton.style.border = (playing || !canDeal) ? "2px solid red" : "";
}

function updateHitButton() {
    hitButton.style.border = canHit ? "" : "2px solid red";
}

function updateStandButton() {
    standButton.style.border = canHit ? "" : "2px solid red";
}
updateDealButton();
updateHitButton();
updateStandButton();

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const valueMap = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11,
};

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

class CardValue {
    constructor(suitIndex, rankIndex) {
        this.suitIndex = suitIndex;
        this.rankIndex = rankIndex;
    }

    getSuitIndex() {
        return suits[this.suitIndex];
    }

    getRankIndex() {
        return ranks[this.rankIndex];
    }

    getRankValue() {
        return valueMap[ranks[this.rankIndex]];
    }
}

function handValue(hand) {
    let total = 0;
    let A = 0;

    for (let card of hand) {
        total += card.getRankValue();
        if (card.getRankIndex() === 'A') A++;
    }

    while (total > 21 && A > 0) {
        total -= 10;
        A--;
    }

    return total;
}

function createDeck() {
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.textContent = "Mixing cards...";
    resultMessage.style.color = "yellow";

    while (deck.length < 52) {
        let newCard = new CardValue(getRandomIndex(suits), getRandomIndex(ranks));
        let exists = deck.some(c => c.suitIndex === newCard.suitIndex && c.rankIndex === newCard.rankIndex);
        if (!exists) deck.push(newCard);
    }

    sounds.mix.play();

    setTimeout(() => {
        resultMessage.textContent = "";
        resultMessage.style.color = "yellow";
        playing = true;
        updateDealButton();
        console.log("Mixing cards complete...");
    }, 4000);
}

dealButton.addEventListener("click", function () {
    if (!playing && canDeal && balance >= 1) {
        // Precargar los sonidos cuando el usuario hace clic en DEAL
        sounds.select.play();

        deck = [];
        userHand = [];
        dealerHand = [];
        document.querySelectorAll("#userHandContainer .card").forEach(c => c.remove());
        document.querySelectorAll("#dealerHandContainer .card").forEach(c => c.remove());
        document.getElementById("userScore").textContent = "";
        document.getElementById("dealerScore").textContent = "";
        document.getElementById("resultMessage").textContent = "";

        balance -= bet;
        canHit = false;
        playing = true;
        updateBalance();
        updateHitButton();
        updateStandButton();
        betRange.disabled = true;

        round++;
        document.getElementById("roundCounter").textContent = round;

        createDeck();

        dealButton.style.border = "2px solid red";

        setTimeout(() => {
            userHand.push(deck.shift());
            playCardSoundAndDisplay(userHand, "user");

            setTimeout(() => {
                dealerHand.push(deck.shift());
                playCardSoundAndDisplay(dealerHand, "dealer", true);

                setTimeout(() => {
                    userHand.push(deck.shift());
                    playCardSoundAndDisplay(userHand, "user");

                    setTimeout(() => {
                        dealerHand.push(deck.shift());
                        playCardSoundAndDisplay(dealerHand, "dealer", true);

                        canHit = true;
                        updateHitButton();
                        updateStandButton();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 4000);
    }
});

async function playSound(src) {
    return new Promise(resolve => {
        const sound = new Audio(src);
        sound.play();
        sound.onended = resolve;
    });
}

async function playCardSoundAndDisplay(hand, player, hideSecondDealerCard = false) {
    await playSound('assets/audio/card.mp3');
    displayHand(player, hand, hideSecondDealerCard);
}

function displayHand(player, hand, hideSecondDealerCard = false) {
    const container = document.getElementById(`${player}HandContainer`);
    const scoreContainer = document.getElementById(`${player}Score`);
    container.querySelectorAll('.card').forEach(card => card.remove());

    hand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        if (player === "dealer" && hideSecondDealerCard && index === 1) {
            cardElement.textContent = "?";
            cardElement.classList.add('hidden');
        } else {
            const text = `${card.getRankIndex()}${card.getSuitIndex()}`;
            cardElement.textContent = text;
            cardElement.style.color = ['♥', '♦'].includes(card.getSuitIndex()) ? 'red' : 'black';
        }

        container.appendChild(cardElement);
        setTimeout(() => cardElement.classList.add('show'), 10);
    });

    if (player === "dealer" && hideSecondDealerCard) {
        scoreContainer.textContent = hand.length > 0 ? handValue([hand[0]]) : "";
    } else {
        scoreContainer.textContent = handValue(hand);
    }
}

let hitInProgress = false;  // Variable para controlar si un "Hit" está en progreso

hitButton.addEventListener("click", async function () {
    if (canHit && !hitInProgress) {  // Verificar si no hay un hit en progreso
        hitInProgress = true;  // Marcar como en progreso
        hitButton.disabled = true;  // Deshabilitar el botón
        hitButton.style.border = "2px solid red";  // Borde rojo cuando el botón está deshabilitado

        userHand.push(deck.shift());
        await playCardSoundAndDisplay(userHand, "user");

        const score = handValue(userHand);
        if (score > 21) {
            playerBusted = true;
            displayHand("user", userHand);
            displayHand("dealer", dealerHand, false);

            canHit = false;
            playing = false;

            updateHitButton();
            updateStandButton();
            updateDealButton();

            await endGame('lose');
        } else {
            displayHand("user", userHand);
        }

        // Después de un pequeño retraso, habilitar el botón y permitir otro "Hit"
        setTimeout(() => {
            hitButton.disabled = false;  // Habilitar el botón después del retraso
            hitButton.style.border = "";  // Eliminar el borde rojo cuando el botón está habilitado
            hitInProgress = false;  // Marcar que el hit ha terminado
        }, 1000);  // Retraso de 1 segundo (puedes ajustarlo según prefieras)
    }
});

standButton.addEventListener("click", async function () {
    if (canHit) {
        canHit = false;
        canDeal = false;
        updateHitButton();
        updateStandButton();
        updateDealButton();

        await playSound('assets/audio/select.mp3');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await playCardSoundAndDisplay(dealerHand, "dealer", false);
        await dealerDrawingCards();

        const userScore = handValue(userHand);
        const dealerScore = handValue(dealerHand);

        if (userScore === 21 && userHand.length === 2) {
            result = (dealerScore === 21 && dealerHand.length === 2) ? 'push' : 'blackjack';
        } else if (dealerScore > 21) {
            result = 'win';
        } else if (userScore > dealerScore) {
            result = 'win';
        } else if (dealerScore > userScore) {
            result = 'lose';
        } else {
            result = 'push';
        }

        await endGame(result);
    }
});

async function dealerDrawingCards() {
    while (handValue(dealerHand) < 17) {
        await playSound('assets/audio/card.mp3');
        dealerHand.push(deck.shift());
        displayHand("dealer", dealerHand, false);
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
}
