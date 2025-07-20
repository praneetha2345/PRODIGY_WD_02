let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 60);

  display.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function startStop() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
    document.querySelector('.controls button').textContent = 'Pause';
  } else {
    isRunning = false;
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    document.querySelector('.controls button').textContent = 'Start';
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  document.querySelector('.controls button').textContent = 'Start';
  laps.innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = display.textContent;
  laps.appendChild(li);
}
