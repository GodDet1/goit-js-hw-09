import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-aio-3.2.5.min.js';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onClick);

function onClick(event) {
  event.preventDefault();

  const { delay, step, amount } = getData(event);
  promises(Number(delay.value), Number(step.value), Number(amount.value));
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function getData(event) {
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  return { delay, step, amount };
}

function promises(delay, step, amount) {
  for (let i = 1; i <= amount; i++) {
    let totalTimeDelay = delay + step * i;
    createPromise(i, totalTimeDelay).then(promiseSucces).catch(promiseFailure);
  }
}

function promiseSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function promiseFailure({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
