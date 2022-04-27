export default class TimerState {
  #BASE_TIME = 60;

  #elapsedTime;
  #seconds;
  #minutes;
  #hours;

  constructor() {
    this.#seconds = 0;
    this.#minutes = 0;
    this.#hours = 0;
    this.#elapsedTime = 0;
  }

  get time() {
    return Object.freeze({
      seconds: this.#seconds,
      minutes: this.#minutes,
      hours: this.#hours,
    });
  }

  addTime() {
    this.#elapsedTime++;
    this.#addSeconds();
    this.#addMinutes();
    this.#addHours();
  }

  #addSeconds() {
    this.#seconds = this.#elapsedTime % this.#BASE_TIME;
  }

  #addMinutes() {
    if (this.#minutes == this.#BASE_TIME) {
      this.#resetMinutes();
      return;
    }
    this.#minutes += this.#elapsedTime % this.#BASE_TIME == 0 ? 1 : 0;
  }

  // 3600 is equal to 60seconds * 60seconds = 1hour
  #addHours() {
    this.#hours += this.#elapsedTime % 3600 == 0 ? 1 : 0;
  }

  #resetMinutes() {
    this.#minutes = 0;
  }

  resetState() {
    this.#seconds = 0;
    this.#hours = 0;
    this.#resetMinutes();
  }
}
