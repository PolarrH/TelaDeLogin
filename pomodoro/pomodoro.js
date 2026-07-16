const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

let workDuration = parseInt(workDurationInput.value) * 60; // in seconds
let breakDuration = parseInt(breakDurationInput.value) * 60; // in seconds
let timeRemaining = workDuration;
let timerInterval;
let isRunning = false;
let isWorkSession = true;

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                if (isWorkSession) {
                    alert('Work session complete! Time for a break.');
                    timeRemaining = breakDuration;
                    isWorkSession = false;
                } else {
                    alert('Break session complete! Time to get back to work.');
                    timeRemaining = workDuration;
                    isWorkSession = true;
                }
                updateDisplay();
            }
        }, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeRemaining = isWorkSession ? workDuration : breakDuration;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workDurationInput.addEventListener('change', () => {
    workDuration = parseInt(workDurationInput.value) * 60;
    if (isWorkSession) {
        timeRemaining = workDuration;
        updateDisplay();
    }
});

breakDurationInput.addEventListener('change', () => {
    breakDuration = parseInt(breakDurationInput.value) * 60;
    if (!isWorkSession) {
        timeRemaining = breakDuration;
        updateDisplay();
    }
});

// Initialize display
updateDisplay();