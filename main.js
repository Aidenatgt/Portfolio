import fill from "./app/fill_config.js";
import add_all from "./app/add_project.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded");
  await add_all();
  fill();


});

function adjustBodyPadding() {
  const bar = document.querySelector('.bottom-bar');
  if (!bar) return;
  document.body.style.paddingBottom = bar.offsetHeight + 'px';
}

// Run on load and when resized
window.addEventListener('load', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);
