window.addEventListener('DOMContentLoaded', () => {
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

// меню
const toggleMenu = () => {
  const openModalBtn = document.querySelector('.menu'),
    modalMenu = document.querySelector('menu'),
    closeModalBtn = document.querySelector('.close-btn'),
    menuItems = document.querySelectorAll('ul>li');

  const handlerMenu = () => {
    if (!modalMenu.style.transform || modalMenu.style.transform === 'translate(-100%)') {
        modalMenu.style.transform = 'translate(0)';
      } else {
        modalMenu.style.transform = 'translate(-100%)';
      }
  };

    openModalBtn.addEventListener('click', handlerMenu);
    closeModalBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(element => {
      element.addEventListener('click', handlerMenu);
    });
};
toggleMenu();

// popup
const togglePopup = () => {
    const popupBtn = document.querySelectorAll('.popup-btn'),
          popup = document.querySelector('.popup'),
          closePopup = document.querySelector('.popup-close'),
          popupContent = document.querySelector('.popup-content');
    let count = 0,
        animationInterval;  
     // Анимация  
    const animation = () => {
      count++;
      animationInterval = requestAnimationFrame(animation); 
      popupContent.style.position = 'absolute';
      popupContent.style.left = count * 8 + 'px';
      if (count > 69) {
        cancelAnimationFrame(animationInterval);
      }
      if (document.documentElement.clientWidth < 768) {
        cancelAnimationFrame(animationInterval);
        popupContent.style.left = (document.documentElement.clientWidth / 4) + 'px';
      }
  };       
    popupBtn.forEach(element => {
      element.addEventListener('click', function(){
        popup.style.display = 'block';
        animation();
      });
    });
     
    popup.addEventListener('click', (event)=>{
      let target = event.target;
      if(target.classList.contains('popup-close')){
        popup.style.display = 'none';
        count = 0;
      }else{
        target = target.closest('.popup-content');
        if(!target){
          popup.style.display = 'none';
        }
      }
    });
    
};
togglePopup();

// табы
const tabs = () => {
const tabHeader =  document.querySelector('.service-header'),
      tabContents = document.querySelectorAll('.service-tab'),
      tabs = tabHeader.querySelectorAll('.service-header-tab');

let toggleTabContent = (index) => {
  tabContents.forEach((item,i) => {
    if(index === i){
      tabs[i].classList.add('active');
      tabContents[i].classList.remove('d-none');
    } else{
      tabs[i].classList.remove('active');
      tabContents[i].classList.add('d-none');
    }
  });
};    

  tabHeader.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.service-header-tab');
    if(target.classList.contains('service-header-tab')){
      tabs.forEach((item, i) => {
        if (target === item) {
          toggleTabContent(i);
        }
      });
    }
  });

};
tabs();








});

