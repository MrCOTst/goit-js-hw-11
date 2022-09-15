import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector('button'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};
refs.button.addEventListener('click', startProm);

function startProm(e) {
  e.preventDefault();
  let amount = Number(refs.inputAmount.value);
  let delay = Number(refs.inputDelay.value);
  let step = Number(refs.inputStep.value);
  let position = null;

  for (position = 1; position <= amount; position += 1) {
    console.log('step:', step);
    console.log('delay:', delay);
    console.log('position:', position);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(objectPromise);
      } else {
        reject(objectPromise);
        console.log(delay);
      }
    }, delay);
  });
}

refs.button.style.marginTop = '10px';
refs.button.style.marginLeft = '10px';
refs.button.style.maxHeight = '50px';
