import fill from "./app/fill_config.js";

console.log("script loaded");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded");

  fill();
});
