class CalcController {
  constructor() {
    this._audio = new Audio('click.mp3');
    this._audioOnOff = false;
    this._locale = 'pt-BR';

    this._dateEl = document.querySelector('.date');
    this._timeEl = document.querySelector('.time');
    this._song = document.getElementById('song');

    this._currentDate;

    this.initialize();
  }

  initialize() {
    this.setDisplayDateTime();
    this.playsong();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  playsong() {
    this._song.addEventListener('click', () => {
      this._audioOnOff = !this._audioOnOff;

      this._audioOnOff
        ? (this._song.className = 'fas fa-volume-up')
        : (this._song.className = 'fas fa-volume-mute');

      if (this._audioOnOff) {
        this._audio.currentTime = 0;
        this._audio.play();
      }
    });
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
