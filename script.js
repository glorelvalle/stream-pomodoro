const lengths = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,
}

let mode;
let remainingTime;
let interval;

document.querySelector('.btn-group').addEventListener('click', function (event) {
  const { mode: newMode } = event.target.dataset;
  if (!newMode) return;

  mode = newMode;
  remainingTime = lengths[mode];

  document.querySelectorAll('button[data-mode]').forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  startTimer();
});

function updateClock() {
  const minutes = `${Number.parseInt(remainingTime / 60)}`.padStart(2, '0');
  const seconds = `${Number.parseInt(remainingTime % 60)}`.padStart(2, '0');
  const time = `${minutes}:${seconds}`;

  document.getElementById('clock').textContent = time;

  const text = mode === 'pomodoro' ? 'until break' : 'left in break';
  document.title = `${time} ${text}`;
  document.getElementById('text').textContent = text;

  document.getElementById('progress-value').style.width =
    ((lengths[mode] - remainingTime) / lengths[mode]) * 100 + "vw";
}

function startTimer() {
  const endTime = Date.now() + remainingTime * 1000;

  updateClock();
  clearInterval(interval);
  interval = setInterval(function () {
    remainingTime = (endTime - Date.now()) / 1000;
    updateClock();
    if (remainingTime <= 0) clearInterval(interval);
  }, 1000);
}