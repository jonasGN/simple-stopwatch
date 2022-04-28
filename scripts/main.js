import TimerController from "./modules/timer-controller.js";

const time = document.querySelector("[data-time]");
const startButton = document.querySelector("[data-button='start']");
const pauseButton = document.querySelector("[data-button='pause']");

const timerController = new TimerController();
let interval;
let canReset = false;

// disables pause button on first run, because the
// stopwatch was not initialized yet
disableButton(pauseButton);

function initTimer() {
  interval = setInterval(() => {
    timerController.addTime();
    updateTimer();
  }, 1000);

  canReset = false;
  enableButton(pauseButton);
  pauseButton.innerHTML = "Pausar";
  disableButton(startButton);
}

function pauseTimer() {
  cleanTimerController();
  enableButton(startButton);

  if (canReset) {
    resetTimer();
    return;
  }

  canReset = true;
  startButton.innerHTML = "Continuar";
  pauseButton.innerHTML = "Reiniciar";
}

function resetTimer() {
  cleanTimerController();
  timerController.resetState();
  updateTimer();
  canReset = false;
  pauseButton.innerHTML = "Pausar";
  startButton.innerHTML = "Iniciar";
  disableButton(pauseButton);
}

function cleanTimerController() {
  clearInterval(interval);
}

function enableButton(element) {
  element.removeAttribute("disabled");
}

function disableButton(element) {
  element.setAttribute("disabled", "");
}

function updateTimer() {
  const radix = 10;
  const seconds = timerController.time.seconds;
  const minutes = timerController.time.minutes;
  const hours = timerController.time.hours;

  const secondsTemplate = `${seconds < radix ? `0${seconds}` : seconds}`;
  const minutesTemplate = `${minutes < radix ? `0${minutes}` : minutes}`;
  const hoursTemplate = `${hours < radix ? `0${hours}` : hours}`;

  time.innerHTML = `${hoursTemplate}:${minutesTemplate}:${secondsTemplate}`;
}

if (time && startButton && pauseButton) {
  startButton.addEventListener("click", initTimer);
  pauseButton.addEventListener("click", pauseTimer);
}
