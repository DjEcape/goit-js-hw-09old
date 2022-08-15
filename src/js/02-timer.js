import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
//   stopBtnEl: document.querySelector('[data-stop]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
// refs.stopBtnEl.disabled = true;
refs.startBtnEl.disabled = true;

// flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDate) {
    if (selectedDate[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        Notiflix.Notify.success('Good!');
      refs.startBtnEl.disabled = false;
    //   refs.stopBtnEl.disabled = true;
      refs.startBtnEl.addEventListener('click', onBtnClickStartCount);
      console.log(selectedDate[0]);
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
    const currentTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      let selectedDateMS = new Date(
        refs.inputDateEl.value.replace(/-/g, '/')
      ).getTime();
      let timeLeft = selectedDateMS - currentTime;
      let timeComponents = getTimeComponents(timeLeft);
      updateClockFace(timeComponents);
      console.log(timeComponents);
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
      refs.stopBtnEl.disabled = true;  
  }
}

const timer = new Timer();

// start counter timeleft
function onBtnClickStartCount(e) {
  refs.startBtnEl.disabled = true;
  timer.start();
//   refs.stopBtnEl.addEventListener('click', onBtnClickStopCount);
  refs.stopBtnEl.disabled = false;
}

//stop counter timeleft
// function onBtnClickStopCount(e) {
//   timer.stop();
// }

// calculating second,minute,hour,day
function getTimeComponents(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let days = addLeadingZero(Math.floor(ms / day));
  let hours = addLeadingZero(Math.floor((ms % day) / hour));
  let minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  let seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// show my timer
function updateClockFace ({days, hours, minutes, seconds}){
    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minutesEl.textContent = `${minutes}`;
    refs.secondsEl.textContent = `${seconds}`;
    
}
// add zero 
function addLeadingZero(value){
        return String(value).padStart(2, '0');
}
flatpickr('#datetime-picker', options);
