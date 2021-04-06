import zeroFormat from "./zeroFormat";
const countTimer = (deadline) => {
  const timeHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds");
  let idInterval;
  // добавляет 0 если число меньше 10
  function zeroFormat(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }
  const getRemaining = () => {
    const dateNow = new Date().getTime(),
      dateStop = new Date(deadline).getTime(),
      timeRemaining = (dateStop - dateNow) / 1000;
    if (timeRemaining < 0) {
      clearInterval(idInterval);
      timeHours.textContent = "00";
      timeHours.style.color = "red";
      timerMinutes.textContent = "00";
      timerMinutes.style.color = "red";
      timerSeconds.textContent = "00";
      timerSeconds.style.color = "red";
    } else {
      let seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600);
      return { timeRemaining, seconds, minutes, hours };
    }
  };

  const updateTimer = () => {
    let timer = getRemaining();
    timeHours.textContent = zeroFormat(timer.hours);
    timerMinutes.textContent = zeroFormat(timer.minutes);
    timerSeconds.textContent = zeroFormat(timer.seconds);
  };
  updateTimer();

  function checkTimer() {}
};
export default countTimer;
