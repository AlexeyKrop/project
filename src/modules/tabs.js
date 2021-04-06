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
export default tabs;
