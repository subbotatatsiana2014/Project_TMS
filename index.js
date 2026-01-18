const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const startPauseBtn = document.getElementById('timer-start');
const stopBtn = document.getElementById('timer-stop');
const resetBtn = document.getElementById('timer-reset');

let timer = null;
let seconds = 0;
let isRunning = false;

function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    minutesElem.textContent = mins.toString().padStart(2, '0');
    secondsElem.textContent = secs.toString().padStart(2, '0');
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    } else {
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
            
        }, 1000);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    }

    stopBtn.disabled = !isRunning;
    resetBtn.disabled = isRunning;
}

function stopTimer() {
    if(!isRunning) {
        return
    }

    isRunning = false;
    clearInterval(timer);
    startPauseBtn.textContent = 'Start';

    stopBtn.disabled = true;
    resetBtn.disabled = false;
}

function resetTimer() {
    if (isRunning) {
        return
    }

    seconds = 0;
    updateDisplay();

    startPauseBtn.textContent = 'Start';
    stopBtn.disabled = true;
    resetBtn.disabled = false;
}

function init() {
    updateDisplay();

    stopBtn.disabled = true;
    resetBtn.disabled = false;

    startPauseBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    document.addEventListener('keydown', (event) => {
        if(event.code === 'Space') {
            event.preventDefault();
            startTimer();
        } else if (event.code === 'Escape') {
            stopTimer();
        } else if (event.code === 'KeyR') {
            resetTimer();
        }
    });

}

document.addEventListener('DOMContentLoaded', init);