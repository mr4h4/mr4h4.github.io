let record = parseInt(localStorage.getItem("record")) || null;
let wins = parseInt(localStorage.getItem("wins")) || 0;

function loadGameData() {
    record = parseInt(localStorage.getItem("record")) || null;
    wins = parseInt(localStorage.getItem("wins")) || 0;

    document.querySelector("#record-container").innerHTML = `
        <p>Record: ${record !== null ? record : "None"}</p>
        <p>Wins: ${wins}</p>
    `;
}

function checkLocalStorage() {
// Comprobar si hay datos guardados en caché   
    if (record === null) {
        //console.log("No hay récord guardado todavía.");
    } else {
        loadGameData()
        //console.log("Récord actual:", record);
    }

    if (wins === null) {
        //console.log("No hay victorias guardadas todavía.");
    } else {
        loadGameData()
        //console.log("Victorias actuales:", wins);
    }
}

function saveGameData() {
    localStorage.setItem("record", record);
    localStorage.setItem("wins", wins);
}

function checkRecord(newRecord) {
    if (record === null || newRecord < record) {
        record = newRecord;
        saveGameData();
    }
}

////////////////////////////////////////////////////////

//`min` será incluido y `max` excluido
function getRandomInt(min, max) { //Generar número aleatorio
  min = Math.ceil(min);
  max = Math.floor(max);
  secretNum = Math.floor(Math.random() * (max - min) + min);
  return secretNum;
}

checkLocalStorage();
getRandomInt(1, 10001);
//console.log(secretNum);

const submitbutton = document.getElementById("submit-button");
let userinput = document.getElementById("user-number");
let hints = document.getElementById("hints");
let attempt_display = document.getElementById("attempt-display");
let attempts = 10

function newGame() {
    attempts = 10;
    getRandomInt(1, 10001);
    attempt_display.innerHTML = `${attempts}`;
};

function checkNumbers(input, secretNum) {
    if (input == secretNum) {
        hints.innerHTML = `You Win! The number was ${secretNum}`;
        wins += 1;
        checkRecord((10 - attempts) + 1);
        newGame();

    } else if (input > secretNum) {
        hints.innerHTML = `Try lower than ${input}`;
        attempts -= 1;
        attempt_display.innerHTML = `${attempts}`

    } else if (input < secretNum) {
        hints.innerHTML = `Try higher than ${input}`;
        attempts -= 1;
        //console.log(attempts)
        attempt_display.innerHTML = `${attempts}`
    };
    
    if (attempts == 0) {
        hints.innerHTML = `You Lose, the number was ${secretNum}. Better luck next time`;
        //console.log("YOU LOSE")
        newGame();
    };
};


submitbutton.addEventListener('click', () => {
    const numero = parseInt(userinput.value);

    if (numero >= 1 && numero <= 10000) {
        checkNumbers(numero, secretNum);
    } else {
        hints.innerHTML = "Please enter a number between 1 and 10000";
    }
});
