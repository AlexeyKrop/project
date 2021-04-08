import getBnt from "./getBnt";
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
        if (target.value.length === 0) {
          target.style.border = "2px solid red";
          getBnt(true);
        }
        target.value = target.value.replace(/[^\w\s+\@\ \-]|(.)(?=\1)/gi, "");
      } else if (
        target.placeholder === "Номер телефона" ||
        target.placeholder === "Ваш номер телефона"
      ) {
        if (target.value.length !== 18) {
          target.style.border = "2px solid red";
          alert("Введите корректный номер телефона");
          getBnt(true);
        }
      }
    });
  });
};
export default checkData;
