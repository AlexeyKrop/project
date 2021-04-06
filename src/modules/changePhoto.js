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
export default changePhoto;
