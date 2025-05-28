document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch("./config.json");
  const data = await res.json();

  document.title = `${data.name}'s Page`;
  const header = document.getElementById("header");
  header.innerHTML = `${data.name}'s ${header.innerHTML}`;
});
