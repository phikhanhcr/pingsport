// initial time
const maxDay = 7;
document.getElementById("day-base-timer-label").textContent = maxDay;
const PIR2 = 283;


init(maxDay)
function init(day) {
  const maxDay = day;
  const maxSecond = 60;
  const maxMin = 60;
  const maxHour = 24;
  let timePassedSecond = 0;
  let timeLeftSecond = maxSecond;
  let timerInterval = null;
  let timePassedMin = 0;
  let timeLeftMin = maxMin;
  let timePassedHour = 0;
  let timeLeftHour = maxHour;
  let timePassedDay = 0;
  let timeLeftDay = maxDay;

  const timeType = {
    second: "second",
    min: "min",
    hour: "hour",
    day: "day",
  };

  startTimer();
  let checkFirstTime = true;
  function startTimer() {
    timerInterval = setInterval(() => {
      if (checkFirstTime) {
        onFirstTime();
        checkFirstTime = false;
      }
      timePassedSecond = timePassedSecond += 1;
      timeLeftSecond = maxSecond - timePassedSecond;
      document.getElementById(
        `${timeType.second}-base-timer-label`
      ).innerHTML = formatTime(timeLeftSecond);
      setCircleDasharray(timeLeftSecond, timeType.second, maxSecond);

      if (timeLeftSecond === 0) {
        // decrease
        timePassedMin = timePassedMin += 1;
        timeLeftMin = maxMin - timePassedMin;
        document.getElementById(
          `${timeType.min}-base-timer-label`
        ).innerHTML = formatTime(timeLeftMin);
        setCircleDasharray(timeLeftMin, timeType.min, maxMin);
        if (timeLeftMin === 0) {
          timePassedHour = timePassedHour += 1;
          timeLeftHour = maxHour - timePassedHour;
          document.getElementById(
            `${timeType.hour}-base-timer-label`
          ).innerHTML = formatTime(timeLeftHour);
          setCircleDasharray(timeLeftHour, timeType.hour, maxHour);

          if (timeLeftHour === 0) {
            timePassedDay = timePassedDay += 1;
            timeLeftDay = maxHour - timePassedDay;
            document.getElementById(
              `${timeType.hour}-base-timer-label`
            ).innerHTML = formatTime(timeLeftDay);
            setCircleDasharray(timeLeftDay, timeType.day, maxDay);

            if (timeLeftDay === 0) {
              clearInterval(timerInterval);
            }

            resetTime(timeType.hour);
          }
          resetTime(timeType.min);
        }
        resetTime(timeType.second);
      }
    }, 1000);
  }

  function resetTime(type) {
    switch (type) {
      case timeType.second:
        timePassedSecond = 0;
        timeLeftSecond = maxSecond;
        break;
      case timeType.min:
        timePassedMin = 0;
        timeLeftMin = maxSecond;
        break;
      case timeType.hour:
        timePassedHour = 0;
        timeLeftHour = maxHour;
        break;
      case timeType.day:
        break;
    }
  }
  function onFirstTime() {
    document.getElementById("day-base-timer-label").textContent =
      maxDay - 1;
    document.getElementById("hour-base-timer-label").textContent =
      maxHour - 1;
    document.getElementById("min-base-timer-label").textContent =
      maxMin - 1;
    timeLeftSecond = maxSecond - 1;
    timeLeftMin = maxMin - 1;
    timeLeftHour = maxHour - 1;
    timeLeftDay = maxDay - 1;
    setCircleDasharray(timeLeftSecond, timeType.second, maxSecond);
    setCircleDasharray(timeLeftMin, timeType.min, maxMin);
    setCircleDasharray(timeLeftHour, timeType.hour, maxHour);
    setCircleDasharray(timeLeftDay, timeType.day, maxDay);
  }
}


function formatTime(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return `${time}`;
}

function calculateTimeFraction(timeLeft, maxValue) {
  const rawTimeFraction = timeLeft / maxValue;
  return rawTimeFraction - (1 / maxValue) * (1 - rawTimeFraction);
}

function setCircleDasharray(timeLeft, type, maxValue) {
  const circleDasharray = `${(
    calculateTimeFraction(timeLeft, maxValue) * PIR2
  ).toFixed(0)} 283`;
  document
    .getElementById(`${type}-base-timer-path-remaining`)
    .setAttribute("stroke-dasharray", circleDasharray);
}
