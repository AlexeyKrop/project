const zeroFormat = (x) => {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
};
export default zeroFormat;
