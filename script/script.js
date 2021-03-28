window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  let idInterval;

  function zeroFormat(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }

  const countTimer = (deadline) => {
    const timeHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

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
  idInterval = setInterval(countTimer, 1000, "20 march 2100");

  // прокуртка
  const scrolling = () => {
    let btnServiceBlock = document.querySelector("main>a>img"),
      anchors = document.querySelectorAll("menu>ul>li>a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        const blockToId = anchor.getAttribute("href").substr(1);
        document.getElementById(blockToId).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    btnServiceBlock.addEventListener("click", (event) => {
      event.preventDefault();
      btnServiceBlock = document.querySelector("main>a");
      const blockID = btnServiceBlock.getAttribute("href").substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };
  scrolling();

  // меню
  const toggleMenu = () => {
    const modalMenu = document.querySelector("menu"),
      globalMenu = document.querySelector("body");

    const handlerMenu = () => {
      modalMenu.classList.toggle("active-menu");
    };

    globalMenu.addEventListener("click", (event) => {
      let target = event.target;
      if (target.closest(".menu")) {
        handlerMenu();
      } else if (target.closest("body") && !target.matches("menu")) {
        modalMenu.classList.remove("active-menu");
      }
    });
  };
  toggleMenu();

  // popup
  const togglePopup = () => {
    const popupBtn = document.querySelectorAll(".popup-btn"),
      popup = document.querySelector(".popup"),
      popupContent = document.querySelector(".popup-content");
    let count = 0,
      animationInterval;
    // Анимация
    const animation = () => {
      count++;
      animationInterval = requestAnimationFrame(animation);
      popupContent.style.position = "absolute";
      popupContent.style.left = count * 8 + "px";
      if (count > 69) {
        cancelAnimationFrame(animationInterval);
      }
      if (document.documentElement.clientWidth < 768) {
        cancelAnimationFrame(animationInterval);
        popupContent.style.left =
          document.documentElement.clientWidth / 4 + "px";
      }
    };
    popupBtn.forEach((element) => {
      element.addEventListener("click", function () {
        popup.style.display = "block";
        animation();
      });
    });

    popup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
        count = 0;
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "none";
          count = 0;
        }
      }
    });
  };
  togglePopup();

  // табы
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tabContents = document.querySelectorAll(".service-tab"),
      tabs = tabHeader.querySelectorAll(".service-header-tab");

    let toggleTabContent = (index) => {
      tabContents.forEach((item, i) => {
        if (index === i) {
          tabs[i].classList.add("active");
          tabContents[i].classList.remove("d-none");
        } else {
          tabs[i].classList.remove("active");
          tabContents[i].classList.add("d-none");
        }
      });
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target.classList.contains("service-header-tab")) {
        tabs.forEach((item, i) => {
          if (target === item) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // слайдер
  const porfolioSlider = () => {
    const potfolioContent = document.querySelector(".portfolio-content"),
      portfolioItem = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-btn");
    let currentIndex = 0,
      dots = document.querySelector(".portfolio-dots"),
      interval;

    const newDots = () => {
      for (let i = 0; i < portfolioItem.length; i++) {
        let li = document.createElement("li");
        li.classList.add("dot");
        dots.append(li);
      }
    };
    newDots();
    const dot = document.querySelectorAll(".dot");
    const prevSlide = (element, index, strClass) => {
      element[index].classList.remove(strClass);
    };

    const nextSlide = (element, index, strClass) => {
      element[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(portfolioItem, currentIndex, "portfolio-item-active");
      prevSlide(dot, currentIndex, "dot-active");
      currentIndex++;
      if (currentIndex >= portfolioItem.length) {
        currentIndex = 0;
      }
      nextSlide(portfolioItem, currentIndex, "portfolio-item-active");
      nextSlide(dot, currentIndex, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    potfolioContent.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;
      if (!target.matches("#arrow-left, #arrow-right, .dot")) {
        return;
      }
      prevSlide(portfolioItem, currentIndex, "portfolio-item-active");
      prevSlide(dot, currentIndex, "dot-active");

      if (target.matches("#arrow-left")) {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = portfolioItem.length - 1;
        }
      } else if (target.matches("#arrow-right")) {
        currentIndex++;
        if (currentIndex >= portfolioItem.length) {
          currentIndex = 0;
        }
      } else if (target.matches(".dot")) {
        dot.forEach((element, index) => {
          if (target === element) {
            currentIndex = index;
          }
        });
      }

      nextSlide(portfolioItem, currentIndex, "portfolio-item-active");
      nextSlide(dot, currentIndex, "dot-active");
    });

    const stopSlide = () => {
      clearInterval(interval);
    };

    potfolioContent.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });

    potfolioContent.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });
    startSlide(2000);
  };
  porfolioSlider();

  // функция смена фотографий
  const changePhoto = () => {
    const commandImg = document.getElementById("command");
    let currentSrc;
    commandImg.addEventListener("mouseover", (event) => {
      let target = event.target;
      if (target.matches("img")) {
        currentSrc = target.src;
        target.src = target.dataset.img;
        target.dataset.img = currentSrc;
      }
    });
    commandImg.addEventListener("mouseout", (event) => {
      let target = event.target;
      if (target.matches("img")) {
        currentSrc = target.src;
        target.src = target.dataset.img;
        target.dataset.img = currentSrc;
      }
    });
  };
  changePhoto();

  // функция валидации
  const validation = () => {
    const form = document.querySelectorAll("form");
    form.forEach((item) => {
      item.addEventListener("input", (event) => {
        let target = event.target;
        if (target.placeholder === "Ваше имя") {
          target.value = target.value.replace(/[^А-Яа-яЁё\ ]/, "");
        } else if (target.placeholder === "Ваше сообщение") {
          target.value = target.value.replace(/[^А-Яа-яЁё0-9\.\,\!\?\-\:]/, "");
        } else if (
          target.placeholder === "E-mail" ||
          target.placeholder === "Ваш E-mail"
        ) {
          target.value = target.value.replace(/[^A-Za-z\!.@_~\-'*]/, "");
        } else if (
          target.placeholder === "Номер телефона" ||
          target.placeholder === "Ваш номер телефона"
        ) {
          maskPhone(".form-phone");
          if (target.value.length === 18) {
            target.style.border = "2px solid green";
          }
        }
      });
    });
  };
  validation();

  // функция коррекции введенных данных
  const checkData = () => {
    const form = document.querySelectorAll("form");
    form.forEach((item) => {
      item.addEventListener("focusout", (event) => {
        let target = event.target;
        if (target.placeholder === "Ваше имя") {
          target.value = target.value
            .trim()
            .replace(/[^\s\da-zа-я]/gi, "")
            .replace(/\s+/g, " ");
          if (target.value !== "") {
            target.value = target.value
              .split(" ")
              .map(function (word) {
                return word[0].toUpperCase() + word.substr(1);
              })
              .join(" ");
          }
          if (target.value.search(/[^A-Za-z]/)) {
            // alert("Необходимо ввести имя на русском языке");
            target.value = "";
          }
        } else if (
          target.placeholder === "E-mail" ||
          target.placeholder === "Ваш E-mail"
        ) {
          target.value = target.value.replace(/[^\w\s+\@\ \-]|(.)(?=\1)/gi, "");
        } else if (
          target.placeholder === "Номер телефона" ||
          target.placeholder === "Ваш номер телефона"
        ) {
          if (target.value.length !== 18) {
            target.style.border = "2px solid red";
            alert("Введите корректный номер телефона");
          }
        }
      });
    });
  };
  checkData();

  // калькулятор
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
  calc(100);

  // отправка формы на сервер
  const sendForm = () => {
    const errorMessage = "Что то пошло не так...",
      loadMessage = "Загрузка...",
      successMessage = "Мы скоро с вами свяжемся";
    const form = document.querySelectorAll("form"),
      statusMessage = document.createElement("div");
    statusMessage.style.color = "red";

    const inputs = document.querySelectorAll("input"),
      popup = document.querySelector(".popup");

    const cleanInputs = () => {
      inputs.forEach((item) => {
        item.value = "";
      });
    };
    // настройка отправки
    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open("POST", "./server.php");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(body));
    };

    form.forEach((item) => {
      item.addEventListener("submit", (event) => {
        event.preventDefault();
        item.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(item);
        let body = {};
        formData.forEach((item, key) => {
          body[key] = item;
        });
        postData(
          body,
          () => {
            statusMessage.textContent = successMessage;
            cleanInputs();
            setTimeout(() => {
              statusMessage.textContent = "";
            }, 2500);
            if (item.matches("#form3")) {
              popup.style.display = "none";
            }
          },
          (error) => {
            statusMessage.textContent = errorMessage;
          }
        );
      });
    });
  };
  sendForm();
});
