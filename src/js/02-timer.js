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
let selectedDate;
let startCount = false;
let deltaTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - today < 0) {
      if (selectedDate !== undefined) {
        window.alert('Nice try, but no!!! You can change data after restart!');
        return;
      }
      window.alert('Please choose a date in the future');
      return;
    }

    if (selectedDate !== undefined) {
      window.alert('Nice try, but no!!! You can change data after restart!');
      return;
    }

    selectedDate = selectedDates[0];
    deltaTime = selectedDate - today;
    deltaTime > 0 ? (startCount = true) : (startCount = false);
    isValidBtn();
  },
};
const flatpickrDate = flatpickr('#datetime-picker', options);

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
  setInterval(() => {
    today = new Date();
    deltaTime = selectedDate - today;
    const timeComponents = getTimeComponents(deltaTime);
    refs.days.textContent = timeComponents.days;
    refs.hours.textContent = timeComponents.hours;
    refs.minutes.textContent = timeComponents.minutes;
    refs.seconds.textContent = timeComponents.seconds;
  }, 1000);

  refs.button.setAttribute('disabled', '');
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
