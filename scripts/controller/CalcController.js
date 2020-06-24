class CalcController {
  constructor() {
    this._locale = 'pt-BR';

    this._dateEl = document.querySelector('.date');
    this._timeEl = document.querySelector('.time');

    this._currentDate;

    this.initialize();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
