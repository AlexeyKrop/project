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
export default porfolioSlider;
