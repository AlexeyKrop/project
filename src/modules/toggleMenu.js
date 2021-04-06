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
    } else if (
      target.closest("body") &&
      !target.matches("menu") &&
      !target.matches("li")
    ) {
      modalMenu.classList.remove("active-menu");
    }
  });
};
export default toggleMenu;
