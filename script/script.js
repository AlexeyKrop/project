"use strict";

function zeroFormat(x) {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
}

function countTimer(deadline) {
  let timeHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds");

  function getRemaining() {
    let dateNow = new Date().getTime(),
      dateStop = new Date(deadline).getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 3600);
    return { timeRemaining, seconds, minutes, hours };
  }

  function updateTimer() {
    let timer = getRemaining();
    timeHours.textContent = zeroFormat(timer.hours);
    timerMinutes.textContent = zeroFormat(timer.minutes);
    timerSeconds.textContent = zeroFormat(timer.seconds);
  }
  updateTimer();

  function checkTimer() {}
}
setInterval(countTimer, 1000, "9 march 2021");
