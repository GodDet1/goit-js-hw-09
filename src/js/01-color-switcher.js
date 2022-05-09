function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
const INTERVAL = 1000;
let intervalId;

refs.start.addEventListener('click', onClickStart);
refs.stop.addEventListener('click', onClickStop);

function changeBackGroundColor() {
  return (refs.body.style.backgroundColor = getRandomHexColor());
}

function onClickStart() {
  intervalId = setInterval(changeBackGroundColor, INTERVAL);
  refs.start.setAttribute('disabled', '');
  refs.stop.removeAttribute('disabled', '');
}

function onClickStop() {
  clearInterval(intervalId);
  refs.start.removeAttribute('disabled', '');
  refs.stop.setAttribute('disabled', '');
  re;
}
