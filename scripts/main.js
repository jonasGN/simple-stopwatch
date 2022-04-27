import TimerState from "./modules/timer-state.js";

const time = document.querySelector("[data-time]");
const startButton = document.querySelector("[data-button='start']");
const pauseButton = document.querySelector("[data-button='pause']");

const state = new TimerState();
let timerController;

function initTimer() {
  timerController = setInterval(() => {
    state.addTime();
    updateTimer();
  }, 1000);
  startButton.setAttribute("disabled", "");
}

function pauseTimer() {
  clearInterval(timerController);
  startButton.removeAttribute("disabled");
}

function resetTimer() {
  pauseTimer();
  state.resetState();
  updateTimer();
}

function updateTimer() {
  const radix = 10;
  const seconds = state.time.seconds;
  const minutes = state.time.minutes;
  const hours = state.time.hours;

  const secondsTemplate = `${seconds < radix ? `0${seconds}` : seconds}`;
  const minutesTemplate = `${minutes < radix ? `0${minutes}` : minutes}`;
  const hoursTemplate = `${hours < radix ? `0${hours}` : hours}`;

  time.innerHTML = `${hoursTemplate}:${minutesTemplate}:${secondsTemplate}`;
}

if (time && startButton && pauseButton) {
  startButton.addEventListener("click", initTimer);
  pauseButton.addEventListener("click", pauseTimer);
  pauseButton.addEventListener("dblclick", resetTimer);
}
