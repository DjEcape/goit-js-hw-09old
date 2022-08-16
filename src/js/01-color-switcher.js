function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;
// const hexRandomiser = getRandomHexColor()

function changerEventLestener(){
  refs.stopBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.removeAttribute('disabled', 'disabled');
  refs.startBtn.addEventListener('click', onStartBtnClick);
  refs.stopBtn.removeEventListener('click', onStopBtnClick);

}
changerEventLestener()


function onStartBtnClick(e) {
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  refs.stopBtn.addEventListener('click', onStopBtnClick);
  refs.stopBtn.removeAttribute('disabled', 'disabled');
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function onStopBtnClick(e) {
  refs.startBtn.removeEventListener('click', onStopBtnClick);
  clearInterval(intervalId);
  changerEventLestener()
}
