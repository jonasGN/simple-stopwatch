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
  time.innerHTML = formatedTime();
}

function formatedTime() {
  const data = timerController.time;
  const timeOf = (value) => `${value < 10 ? `0${value}` : value}`;

  return `
    ${timeOf(data.hours)}:${timeOf(data.minutes)}:${timeOf(data.seconds)}
  `;
}

if (time && startButton && pauseButton) {
  startButton.addEventListener("click", initTimer);
  pauseButton.addEventListener("click", pauseTimer);
}
