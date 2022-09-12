import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let timerId = null;
let selectedTime = null;
let remainingTime = null;

const refs = {
  button: document.querySelector('button'),
  input: document.querySelector('#datetime-picker'),
  clockTimer: document.querySelector('.timer'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};
refs.button.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedTime = selectedDates[0];
    if (options.defaultDate.getTime() > selectedTime.getTime()) {
      refs.button.setAttribute('disabled', 'disabled');
      refs.button.style.backgroundColor = '#a7c7e0';
      Notify.warning('Please choose a date in the future');
      // refs.button.disabled = false;
    } else {
      refs.button.removeAttribute('disabled', 'disabled');
      refs.button.style.backgroundColor = '#2196f3';
      refs.input.style.backgroundColor = '#ffffff';
    }
  },
};

flatpickr(refs.input, options);

function startTimer() {
  // refs.button.disabled = true;
  timerId = setInterval(() => {
    const currentTime = Date.now();
    remainingTime = selectedTime - currentTime;

    if (remainingTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      updateTimer({ days, hours, minutes, seconds });
      console.log(`${days}: ${hours}: ${minutes}: ${seconds}`);
    } else {
      clearInterval(timerId);
      Notify.info('Time over!!!');
    }
  }, 1000);
  refs.button.setAttribute('disabled', 'disabled');
  refs.button.style.backgroundColor = '#a7c7e0';
  refs.input.setAttribute('disabled', 'disabled');
  refs.input.style.backgroundColor = '#a7c7e0';
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${days}`;
  refs.hoursValue.textContent = `${hours}`;
  refs.minutesValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.button.style.marginTop = '10px';
refs.button.style.marginLeft = '10px';
