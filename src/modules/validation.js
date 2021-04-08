import maskPhone from "./maskPhone";
import getBnt from "./getBnt";
const validation = () => {
  const form = document.querySelectorAll("form"),
    input = document.querySelectorAll("input");
  input.forEach((item) => {
    item.setAttribute("required", true);
  });
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
        if (target.value.length > 4) {
          target.style.border = "2px solid green";
          getBnt(false);
        }
        target.value = target.value.replace(/[^A-Za-z\!.@_~\-'*]/, "");
      } else if (
        target.placeholder === "Номер телефона" ||
        target.placeholder === "Ваш номер телефона"
      ) {
        maskPhone(".form-phone");
        if (target.value.length === 18) {
          target.style.border = "2px solid green";
          getBnt(false);
        }
      }
    });
  });
};
export default validation;
