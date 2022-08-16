import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  firstDelayMsEl: document.querySelector('[name="delay"]'),
  delayStepMsEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
};

refs.formEl.addEventListener('submit', onFormSubmitTocreatePromise);

function onFormSubmitTocreatePromise(e) {
  e.preventDefault();
  let delay = refs.firstDelayMsEl.valueAsNumber;
  let delayStepMs = refs.delayStepMsEl.valueAsNumber;
  let amount = refs.amountEl.valueAsNumber;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += delayStepMs;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}


