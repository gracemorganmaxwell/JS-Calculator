/** @format */
const calculatorKeys = document.querySelector(".calculator-keys");
const toggleDarkMode = document.querySelector(".theme-toggle");
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".calculator").classList.toggle("dark");
});
module.exports = "toggleDarkMode";
module.exports = "calculatorKeys";