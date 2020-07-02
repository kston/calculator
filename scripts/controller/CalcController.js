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

    this._lastOperator = '';
    this._lastNumber = '';

    this._operation = [];

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

    this.setLastNumbertoDisplay();
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
    switch (value) {
      case 'C':
        this.clearAll();
        break;
      case 'CE':
        this.clearEntry();
      case '←':
        this.clearEntry();
        break;
      case '±':
        this.specialOperation('±');
        break;
      case '¹/x':
        this.specialOperation('¹/x');
        break;
      case 'x²':
        this.specialOperation('x²');
        break;
      case '√':
        this.specialOperation('√');
        break;
      case '+':
        this.addOperation('+');
        break;
      case '-':
        this.addOperation('-');
        break;
      case 'x':
        this.addOperation('*');
        break;
      case '÷':
        this.addOperation('/');
        break;
      case '%':
        this.addOperation('%');
        break;
      case '.':
        this.addDot();
        break;
      case '=':
        this.calc();
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value));
        break;
      default:
        this.setError();
    }
  }
  pushOperation(value) {
    this._operation.push(value);

    if (this._operation.length > 3) {
      this.calc();
    }
  }

  getResult() {
    try {
      return eval(this._operation.join(''));
    } catch (e) {
      setTimeout(() => this.setError(), 1);
    }
  }

  specialOperation(value) {
    let lastOperation = this.getLastOperation();

    switch (value) {
      case '±':
        lastOperation = lastOperation * -1;
        this.setEspecialOperationtoDisplay(lastOperation);
        break;
      case '¹/x':
        lastOperation = 1 / lastOperation;
        this.setEspecialOperationtoDisplay(
          parseFloat(lastOperation.toFixed(6))
        );

        break;
      case 'x²':
        this.setEspecialOperationtoDisplay(Math.pow(lastOperation, 2));
        break;
      case '√':
        this.setEspecialOperationtoDisplay(
          parseFloat(Math.sqrt(lastOperation).toFixed(6))
        );
        break;
    }
  }
  setEspecialOperationtoDisplay(value) {
    this.setLastOperation(value);
    this.setLastNumbertoDisplay();
  }

  addDot() {
    let lastOperation = this.getLastOperation();
    if (
      typeof lastOperation === 'string' &&
      lastOperation.split('').indexOf('.') > -1
    )
      return;

    if (this.isOperator(lastOperation) || !lastOperation) {
      this.setLastOperation('0.');
    } else {
      this.setLastOperation(lastOperation.toString() + '.');
    }

    this.setLastNumbertoDisplay();
  }

  calc() {
    let last = '';

    this._lastOperator = this.getlastItem();

    if (this._operation.length < 3) {
      let firstItem = this._operation[0];

      this._operation = [firstItem, this._lastOperator, this._lastNumber];
    }

    if (this._operation.length > 3) {
      last = this._operation.pop();

      this._lastNumber = this.getResult();
    } else if (this._operation.length === 3) {
      this._lastNumber = this.getlastItem(false);
    }

    let result = this.getResult();

    if (last === '%') {
      result /= 100;
      this._operation = [result];
    } else {
      this._operation = [result];

      if (last) this._operation.push(last);
    }

    this.setLastNumbertoDisplay();
  }

  getlastItem(isOperator = true) {
    let lastItem;

    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (this.isOperator(this._operation[i]) === isOperator) {
        lastItem = this._operation[i];
        break;
      }
    }
    if (!lastItem) {
      lastItem = isOperator ? this._lastOperator : this._lastNumber;
    }
    return lastItem;
  }

  setLastNumbertoDisplay() {
    let lastNumber = this.getlastItem(false);

    if (!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber;
  }

  isOperator(value) {
    return ['+', '-', '*', '/', '%', 'x²', '¹/x', '±', '√'].indexOf(value) > -1;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else {
        this.pushOperation(value);
        this.setLastNumbertoDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(newValue);
        this.setLastNumbertoDisplay();
      }
    }
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  clearAll() {
    this._operation = [];
    this._lastNumber = '';
    this._lastOperator = '';

    this.setLastNumbertoDisplay();
  }

  clearEntry() {
    this._operation.pop();
    this.setLastNumbertoDisplay();
  }

  setError() {
    this.displayCalc = 'Error';
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
    if (value.toString().length > 10) {
      this.setError();
      return false;
    }

    this._displayCalcEl.innerHTML = value;
  }
}
