const sendForm = () => {
  const errorMessage = "Что то пошло не так...",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо...Мы скоро с вами свяжемся";
  const form = document.querySelectorAll("form"),
    statusMessage = document.createElement("div");
  statusMessage.style.color = "red";
  const image = document.createElement("img");
  image.src = "./images/load.gif";
  statusMessage.append(image);
  const inputs = document.querySelectorAll("input"),
    popup = document.querySelector(".popup");

  const cleanInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });
  };
  // настройка отправки
  const postData = (body) => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // const request = new XMLHttpRequest();
    // return new Promise((resolve, reject) => {
    //   request.addEventListener("readystatechange", () => {
    //     if (request.readyState !== 4) {
    //       return;
    //     }
    //     if (request.status === 200) {
    //       resolve();
    //     } else {
    //       reject(request.status);
    //     }
    //   });
    //   request.open("POST", "./server.php");
    //   request.setRequestHeader("Content-Type", "application/json");
    //   request.send(JSON.stringify(body));
    // });
  };

  form.forEach((item) => {
    item.addEventListener("submit", (event) => {
      event.preventDefault();
      item.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(item);
      let body = {};
      formData.forEach((item, key) => {
        body[key] = item;
      });
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("status network not 200");
          }
          statusMessage.textContent = successMessage;
          cleanInputs();
          setTimeout(() => {
            statusMessage.textContent = "";
          }, 2000);
          if (item.matches("#form3")) {
            setTimeout(() => {
              popup.style.display = "none";
            }, 2000);
          }
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });
  });
};
export default sendForm;
