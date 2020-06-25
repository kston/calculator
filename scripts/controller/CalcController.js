class CalcController {
  constructor() {
    this._audio = new Audio('click.mp3');
    this._audioOnOff = false;
    this._locale = 'pt-BR';

    this._dateEl = document.querySelector('.date');
    this._timeEl = document.querySelector('.time');
    this._song = document.getElementById('song');

    this._displayCalcEl = document.querySelector('#display p');

    this._currentDate;

    this.initialize();
    this.initButtonsEvents();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);

    this._song.addEventListener('click', () => {
      this.toggleAudio();
      this.playsong();
    });
  }

  toggleAudio() {
    this._audioOnOff = !this._audioOnOff;
    this._audioOnOff
      ? (this._song.className = 'fas fa-volume-up')
      : (this._song.className = 'fas fa-volume-mute');
  }

  playsong() {
    if (this._audioOnOff) {
      this._audio.currentTime = 0;
      this._audio.play();
    }
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  addEventListenerAll(element, events, fn) {
    events.split(' ').forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn) => {
      this.addEventListenerAll(btn, 'click', () => {
        let textBtn = btn.innerText;
        this.execBtn(textBtn);
      });
    });
  }

  execBtn(value) {
    this.playsong();
    console.log(value);
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

  get displayCalc() {
    return this._displayCalcEl.innerText;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerText = value;
  }
}
