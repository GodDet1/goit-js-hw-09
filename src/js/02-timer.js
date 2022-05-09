import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let today = new Date();
let selectedDate = null;
let deltaTime = null;
let startCount = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - today < 0) {
      if (startCount === false) {
        window.alert('Nice try, but no!!! You can change data after restart!');
        return;
      }

      window.alert('Please choose a date in the future');
      refs.button.setAttribute('disabled', '');
      renderTimer();
      return;
    }

    if (startCount === false) {
      window.alert('Nice try, but no!!! You can change data after restart!');
      return;
    }

    selectedDate = selectedDates[0];
    deltaTime = selectedDate - today;

    isValidBtn();
    timer();
  },
};
let flatpickrDate = flatpickr('#datetime-picker', options);

// ============= Check btn =================

function isValidBtn() {
  if (startCount === true) {
    refs.button.removeAttribute('disabled');
  } else {
    refs.button.setAttribute('disabled', '');
  }
}

refs.button.addEventListener('click', onClick);

function onClick() {
  intervalId = setInterval(timer, 1000);
  startCount = false;
  refs.button.setAttribute('disabled', '');
  refs.input.classList.add('hidden');
  refs.button.classList.add('hidden');
}

function timer() {
  today = new Date();
  deltaTime = selectedDate - today;
  const { days, hours, minutes, seconds } = getTimeComponents(deltaTime);
  renderTimer(days, hours, minutes, seconds);

  if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
    clearInterval(intervalId);
    intervalId = null;
    startCount = true;
    renderTimer();
    window.alert('You can choose anoter date!');
    refs.input.classList.remove('hidden');
    refs.button.classList.remove('hidden');
    return;
  }
}

function renderTimer(days = '00', hours = '00', minutes = '00', seconds = '00') {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function getTimeComponents(time) {
  const seconds = pad(Math.floor((time / 1000) % 60));
  const minutes = pad(Math.floor((time / (1000 * 60)) % 60));
  const hours = pad(Math.floor((time / (1000 * 60 * 60)) % 24));
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
