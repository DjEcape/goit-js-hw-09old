import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  counterBoxEl: document.querySelector('.timer'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtnEl.disabled = true;
Notiflix.Notify.info('Choose the date');
let dateToSelect = 0; 

// flatpickr options
const options = {
  onOpen() {
    timer.stop();
  },
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDate) {
    dateToSelect = selectedDate[0];
    if (selectedDate[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Good!');
      refs.startBtnEl.addEventListener('click', onBtnClickStartCount);
      refs.startBtnEl.disabled = false;
    }
  },
};

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }
  //start timer
  start() {
    if (this.isActive) {
      return;
    }
    refs.startBtnEl.disabled = true;
    const currentTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const selectedDateMS = new Date(dateToSelect).getTime();
      let timeLeft = selectedDateMS - currentTime;
      let timeComponents = getTimeComponents(timeLeft);
      updateClockFace(timeComponents);
      if (timeLeft <= 1000) {
        Notiflix.Notify.success('That is all');
        this.stop();
        return;
      }
    }, 1000);
  }
  //stop timer
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

const timer = new Timer();

// start counter timeleft
function onBtnClickStartCount(e) {
  timer.start();
}

// calculating second,minute,hour,day
function getTimeComponents(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let days = addLeadingZero(Math.floor(ms / day));
  let hours = addLeadingZero(Math.floor((ms % day) / hour));
  let minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  let seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

// show my timer
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.counterBoxEl.style.opacity = 1;
  if (`${days}` != 00) {
    refs.daysEl.textContent =
      refs.counterBoxEl.firstElementChild.style.display = 'flex';
    refs.daysEl.textContent = `${days}`;
  } else {
    refs.counterBoxEl.firstElementChild.style.display = 'none';
  }
  if (`${hours}` != 00) {
    refs.hoursEl.textContent =
      refs.counterBoxEl.firstElementChild.nextElementSibling.style.display =
        'flex';
    refs.hoursEl.textContent = `${hours}`;
  } else {
    refs.counterBoxEl.firstElementChild.nextElementSibling.style.display =
      'none';
  }
  if (`${minutes}` != 00) {
    refs.minutesEl.textContent =
      refs.counterBoxEl.lastElementChild.previousElementSibling.style.display =
        'flex';
    refs.minutesEl.textContent = `${minutes}`;
  } else {
    refs.counterBoxEl.lastElementChild.previousElementSibling.style.display =
      'none';
  }

  refs.secondsEl.textContent = `${seconds}`;
}
// add zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
flatpickr('#datetime-picker', options);
