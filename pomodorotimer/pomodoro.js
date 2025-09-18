const button = document.getElementById('button');
const pomodoro = document.getElementById('pomodoro');
const timeDisplay = document.getElementById('timer');
const alarmSound = document.getElementById('alarm-sound');
const configPanel = document.querySelector('.config-panel');
const background = document.body;

const worker = new Worker('timerWorker.js');

//Escuchar worker
worker.onmessage = function(e) {
    if (e.data.finished) {
        alarmSound.currentTime = 0;
        alarmSound.play().catch(() => {}); // reproducir sonido al terminar
        //rounds++;
        isWorking = !isWorking;
        updateBackground();
        updateRoundDisplay();

        // reiniciar automáticamente
        startWorkerTimer();
    } else {
        m = e.data.m;
        s = e.data.s;
        updateTimerDisplay();
    }
};

let timerID = null;
let isWorking = true;

//Tiempos Pomodoro (en minutos)
const workInput = document.getElementById('work-time');
const shortBreakInput = document.getElementById('short-rest');
const longBreakInput = document.getElementById('long-rest');

let config = { //Objeto de configuración
  work: Number(workInput.value),
  shortBreak: Number(shortBreakInput.value),
  longBreak: Number(longBreakInput.value)
};

// Actualiza el objeto config con los valores actuales de los inputs
// y asegura que los parámetros sean válidos: cada valor mínimo es 1 y máximo 999.
function updateConfig() {
  config.work = Math.max(1, Math.min(999, Number(workInput.value)));
  config.shortBreak = Math.max(1, Math.min(999, Number(shortBreakInput.value)));
  config.longBreak = Math.max(1, Math.min(999, Number(longBreakInput.value)));
}

//Temporizador real
let m = 0;
let s = 0;

let rounds = 0;

function updateBackground() {
    if (isWorking) {
        m = config.work;
        rounds++;
        background.style.backgroundColor = '#f67280';
    } else if (rounds % 4 == 0) {
        m = config.longBreak;
        background.style.backgroundColor = '#4d80acff';
    } else {
        m = config.shortBreak;
        background.style.backgroundColor = '#51a265ff';
    }
};



function updateTimerDisplay() {
    timeDisplay.textContent = `${normaliceTime(m)}:${normaliceTime(s)}`;
};

function normaliceTime(t){
    if (t < 10){
        return '0' + t;
    } else {
        return t;
    }
};

function startWorkerTimer() {
    worker.postMessage({ command: 'start', minutes: m, seconds: s });

};

function stopWorkerTimer() {
    worker.postMessage({ command: 'stop' });
};

function updateRoundDisplay() {
    pomodoro.textContent = 'Pomodoro #' + rounds;
};

//Llamada a eventos
button.addEventListener('click', () => {
    if (button.classList.contains("start")) {
        button.classList.remove('start');
        button.classList.add('stop');
        button.textContent = 'STOP';

        updateConfig(); //Actualizar configuración al iniciar
        configPanel.style.display = 'none';
        alarmSound.play().then(() => alarmSound.pause()).catch(() => {});
        
        if (m === 0 && s === 0) { //Si es la primera vez que se pulsa el botón, inicializa los tiempos para el primer Pomodoro
            m = config.work;
            //rounds++;
            updateBackground();
            updateRoundDisplay();
            updateTimerDisplay();
        }

        startWorkerTimer();
        
        // iniciar temporizador
        
    } else {
        button.classList.remove('stop');
        button.classList.add('start');
        button.textContent = 'START';
        stopWorkerTimer();
        // detener temporizador
    }
});

    rounds