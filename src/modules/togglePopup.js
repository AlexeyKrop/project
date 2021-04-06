const togglePopup = () => {
  const popupBtn = document.querySelectorAll(".popup-btn"),
    popup = document.querySelector(".popup"),
    popupContent = document.querySelector(".popup-content");
  let count = 0,
    animationInterval;
  // Анимация
  const animation = () => {
    count += 1.5;
    animationInterval = requestAnimationFrame(animation);
    popupContent.style.position = "absolute";
    popupContent.style.left = count * 8 + "px";
    if (count > 69) {
      cancelAnimationFrame(animationInterval);
    }
    if (document.documentElement.clientWidth < 768) {
      cancelAnimationFrame(animationInterval);
      popupContent.style.left = document.documentElement.clientWidth / 4 + "px";
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
export default togglePopup;
