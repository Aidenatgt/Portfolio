import fill from "./app/fill_config.js";
import add_all from "./app/add_project.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded");
  await add_all();
  fill();


  const expandables = [...document.querySelectorAll('.project-title')];
  console.log(`Expandable elements: ${expandables}`);
  expandables.forEach(async el => {
    console.log(el);

    el.addEventListener('click', () => {
      const group = el.dataset.group;
      console.log(group);
      document.querySelectorAll(`.long-desc[data-group="${group}"]`)
        .forEach(detail => {
          console.log(detail);
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

function adjustBodyPadding() {
  const bar = document.querySelector('.bottom-bar');
  if (!bar) return;
  document.body.style.paddingBottom = bar.offsetHeight + 'px';
}

// Run on load and when resized
window.addEventListener('load', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);
