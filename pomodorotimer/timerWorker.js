let timerID = null;
let m = 0;
let s = 0;

onmessage = function(e) {
    const { command, minutes, seconds } = e.data;

    if (command === 'start') {
        m = minutes;
        s = seconds;

        if (timerID === null) {
            timerID = setInterval(() => {
                if (s > 0) {
                    s--;
                } else if (m > 0) {
                    m--;
                    s = 59;
                } else {
                    clearInterval(timerID);
                    timerID = null;
                    postMessage({ finished: true });
                    return;
                }
                postMessage({ m, s });
            }, 1000);
        }
    }

    if (command === 'stop') {
        if (timerID !== null) {
            clearInterval(timerID);
            timerID = null;
        }
    }
};
