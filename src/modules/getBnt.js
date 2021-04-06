const getBnt = (bool) => {
  const allBtn = document.querySelectorAll(".form-btn");
  allBtn.forEach((item) => {
    item.disabled = bool;
  });
};
export default getBnt;
