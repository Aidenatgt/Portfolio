import fill from "./app/fill_config.js";
console.log("script loaded");


document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded");

  fill();

  const test_element = document.getElementById("test");

  const project_html = await fetch("./app/project_html.html");
  test_element.innerHTML = await project_html.text();

  document.querySelectorAll('.expandable').forEach(async el => {

    el.addEventListener('click', () => {
      const group = el.dataset.group;
      document.querySelectorAll(`.long-desc[data-group="${group}"]`)
        .forEach(detail => {
          const isExpanded = detail.classList.contains('expanded');

          if (isExpanded) {
            detail.style.height = detail.scrollHeight + "px";

            requestAnimationFrame(() => {
              detail.style.height = "0px";
              detail.classList.remove("expanded");
            });
          } else {
            detail.style.height = detail.scrollHeight + "px";
            detail.classList.add("expanded");

            detail.addEventListener("transitioned", function tidy() {
              detail.style.height = "auto";
              detail.removeEventListener("transitioned", tidy);
            })
          }
        });
    });
  });
});

