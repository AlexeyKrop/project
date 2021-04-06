const calc = (price) => {
  const calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcCount = document.querySelector(".calc-count"),
    calcDay = document.querySelector(".calc-day"),
    calcTotal = document.getElementById("total");
  // Функция проверки корректного ввода в калькулятор
  const validationCalc = () => {
    calcBlock.addEventListener("input", (event) => {
      let target = event.target;
      if (target.matches("input")) {
        target.value = target.value.replace(/\D+/, "");
      }
    });
  };
  validationCalc();
  const calcSum = () => {
    let total = 0,
      dayValue = 1,
      countValue = 1,
      typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;
    if (typeValue === "") {
      calcDay.value = "";
      calcSquare.value = "";
      calcCount.value = "";
      calcTotal.textContent = 0;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (squareValue && typeValue) {
      total = typeValue * squareValue * price * dayValue * countValue;
    }

    // функция плавного вывода итогового результата
    const time = 0.01;
    function outNum(num, elem) {
      let step;
      if (calcSquare.value < 100) {
        step = 100;
      } else if (calcSquare.value >= 100) {
        step = 4000;
      }
      let n = 0;
      let t = Math.round(time / (num / step));
      let interval = setInterval(() => {
        n = n + step;
        if (n >= Math.round(num)) {
          clearInterval(interval);
        }
        elem.textContent = n;
      }, t);
    }
    if (total > 0) {
      outNum(total, calcTotal);
    }
  };

  calcBlock.addEventListener("change", (event) => {
    let target = event.target;
    if (target.matches("input") || target.matches("select")) {
      calcSum();
    }
  });
};
export default calc;
