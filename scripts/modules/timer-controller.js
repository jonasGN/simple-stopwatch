export default class TimerController {
  #BASE_TIME = 60;

  #elapsedTime;

  constructor() {
    this.#elapsedTime = 0;
  }

  get time() {
    return Object.freeze({
      seconds: this.#seconds,
      minutes: this.#minutes,
      hours: this.#hours,
    });
  }

  get #seconds() {
    return this.#elapsedTime % this.#BASE_TIME;
  }

  get #minutes() {
    const result = (this.#elapsedTime / this.#BASE_TIME) % this.#BASE_TIME;

    return Math.floor(result);
  }

  get #hours() {
    // 3600 is equal to 60seconds * 60seconds = 1hour
    return Math.floor(this.#elapsedTime / 3600);
  }

  addTime() {
    this.#elapsedTime++;
  }

  resetState() {
    this.#elapsedTime = 0;
  }
}
