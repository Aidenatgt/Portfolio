import fill from "./app/fill_config.js";
console.log("script loaded");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded");

  fill();

  const test_element = document.getElementById("test");

  const project_html = await fetch("./app/project_html.html");
  test_element.innerHTML = await project_html.text();
});
