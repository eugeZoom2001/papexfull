document.addEventListener("DOMContentLoaded", () => {
  init();
});

export const init = () => {
  const div = document.querySelector("div");
  div.innerHTML = "My new text!";
};
