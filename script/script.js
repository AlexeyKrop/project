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
      } else if (target.closest("body")) {
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
    const arrAtr = [];
    const img = document.querySelectorAll(".command__photo");
    img.forEach((item) => {
      arrAtr.push(item.src);
    });

    img.forEach((item, index) => {
      item.addEventListener("mouseover", (event) => {
        let target = event.target;
        if (event.type === "mouseover") {
          target.src = target.dataset.img;
        }
      });
      item.addEventListener("mouseout", (event) => {
        let target = event.target;
        if (event.type === "mouseout") {
          target.src = arrAtr[index];
        }
      });
    });
  };
  changePhoto();
});
