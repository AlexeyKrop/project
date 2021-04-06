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
export default scrolling;
