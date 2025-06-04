export default async function add_all() {
  const entries = document.getElementsByClassName("entry");
  const promises = [...entries].map(async entry => {
    const div = await add_project(entry.getAttribute("dir"));
    entry.appendChild(div);
  });

  await Promise.all(promises);
}

async function add_project(project_dir /*string*/) {
  const project_div = document.createElement("div");
  project_div.classList.add("project");

  const project = await (await fetch(project_dir + "/data.json")).json();


  const title_div = document.createElement("div");
  title_div.dataset.group = project_dir;
  title_div.classList.add("project-title");
  title_div.innerHTML = `<h3><b>${project.title}</b></h3>`;
  project_div.appendChild(title_div);

  if (project.image != null) {
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.image_desc;
    project_div.appendChild(image);
  }

  const short_desc = document.createElement("div");
  short_desc.innerHTML = `<p>${project.short}</p>`;
  short_desc.classList.add("short-desc");
  project_div.appendChild(short_desc);

  const long_desc = document.createElement("div");
  long_desc.innerHTML = `<p>${project.long}</p>`;
  long_desc.classList.add("long-desc");
  long_desc.dataset.group = project_dir;
  project_div.appendChild(long_desc);
  console.log("added stuv");

  return project_div;
}
