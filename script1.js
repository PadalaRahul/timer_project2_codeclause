let timerInterval;
let timerInput = document.getElementById("timerInput");
let timerSeconds = 0;

// Stopwatch variables
let stopwatchInterval;
let stopwatchInput = document.getElementById("stopwatchInput");
let stopwatchSeconds = 0;

// Functions for the timer
function startTimer() {
  if (!timerInput) {
    return;
  }
  let inputSeconds = getSecondsFromInput(timerInput.value);
  if (isNaN(inputSeconds) || inputSeconds <= 0) {
    return;
  }
  clearInterval(timerInterval);
  timerSeconds = inputSeconds;
  timerInterval = setInterval(() => {
    timerSeconds--;
    if (timerSeconds < 0) {
      stopTimer();
      return;
    }
    let timeString = secondsToTimeString(timerSeconds);
    timerInput.value = timeString;
  }, 1000);
  disableButton("startTimer");
  enableButton("stopTimer");
  enableButton("resetTimer");
}

function stopTimer() {
  clearInterval(timerInterval);
  enableButton("startTimer");
  disableButton("stopTimer");
}

function resetTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerInput.value = "00:00:00";
  enableButton("startTimer");
  disableButton("stopTimer");
  disableButton("resetTimer");
}

// Functions for the stopwatch
function startStopwatch() {
  if (!stopwatchInput) {
    return;
  }
  clearInterval(stopwatchInterval);
  stopwatchSeconds = getSecondsFromInput(stopwatchInput.value);
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    let timeString = secondsToTimeString(stopwatchSeconds);
    stopwatchInput.value = timeString;
  }, 1000);
  disableButton("startStopwatch");
  enableButton("stopStopwatch");
  enableButton("resetStopwatch");
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  enableButton("startStopwatch");
  disableButton("stopStopwatch");
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  stopwatchInput.value = "00:00:00";
  enableButton("startStopwatch");
  disableButton("stopStopwatch");
  disableButton("resetStopwatch");
}

// Helper functions
function getSecondsFromInput(inputValue) {
  let inputParts = inputValue.split(":");
  let hours = parseInt(inputParts[0]);
  let minutes = parseInt(inputParts[1]);
  let seconds = parseInt(inputParts[2]);
  return (hours * 3600) + (minutes * 60) + seconds;
}

function secondsToTimeString(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - (hours * 3600)) / 60);
  let remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function enableButton(buttonId) {
  let button = document.getElementById(buttonId);
  if (button) {
    button.disabled = false;
  }
}

function disableButton(buttonId) {
  let button = document.getElementById(buttonId);
  if (button) {
    button.disabled = true;
  }
}
