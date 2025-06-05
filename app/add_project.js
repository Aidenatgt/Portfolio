/**
  * Add every project specified in the registry to the document.
  */
export default async function add_all() {
  // Read the registry to get a list of project directories.
  const registry = await (await fetch("projects/registry.json")).json();

  const ordered = await (await fetch("config.json")).json().ordered;

  // Find the place for the projects in the document, and then add each one to it.
  // Bonus: mapping them all to promises instead of awaiting them in the iteration means this will run them concurrently. 
  const content_div = document.getElementById("content-div");

  if (ordered) {
    const promises = [...registry].map(async dir => {
      const div = await create_project(`projects/${dir}`);
      content_div.appendChild(div);
    });

    // await each promise to make sure they actually get added to the document.
    await Promise.all(promises);

    // If the config specifies order matters then this can't be done concurrently.
  } else {
    for (const dir of registry) {
      const div = await create_project(`projects/${dir}`);
      content_div.appendChild(div);
    }
  }
}

/**
  * Add HTML for a project to the document.
  * @param project_dir The directory holding the project data.
  * @return The HTML element for the project
  */
async function create_project(project_dir) {
  // Start the HTML element.
  const project_div = document.createElement("div");
  project_div.classList.add("project");

  // Read the data JSON for the given project.
  const project = await (await fetch(project_dir + "/data.json")).json();

  // Create a div for the title bar content.
  const title_div = document.createElement("div");
  title_div.classList.add("project-title");
  const heading = document.createElement("h3");
  const span = document.createElement("span");
  span.innerHTML = `<b>${project.title}</b>`
  if (project.repo != null)
    span.innerHTML += ` (<a href=\'${project.repo}\' target=_blank>Repo</a>)`
  heading.appendChild(span);

  // If the project has a long description include an image to expand the description.
  if (project.long != null) {
    const img = document.createElement("img");
    img.src = 'assets/expand.png';
    img.classList.add('expand');
    img.alt = "expand description";
    img.dataset.group = project_dir;

    // Create a listener to give the image functionality. Basically, make it a button.
    img.addEventListener('click', () => {

      // Look for long descriptions in the same group as the button.
      // There should only ever be one but it returns an array so might as well iterate.
      const group = img.dataset.group;
      console.log("running");
      document.querySelectorAll(`.long-desc[data-group="${group}"]`)
        .forEach(detail => {
          const isExpanded = detail.classList.contains('expanded');

          // If the details are already expanded...
          if (isExpanded) {

            // Begin an animation to go from full height to nothing.
            detail.style.height = detail.scrollHeight + "px";
            requestAnimationFrame(() => {
              detail.style.height = "0px";

              //Mark the detail as expanded.
              detail.classList.remove("expanded");
            });

            // Otherwise..
          } else {

            // Mark it as expanded
            detail.classList.add("expanded");

            // Start a transition to make it full height.
            detail.style.height = detail.scrollHeight + "px";
            detail.addEventListener("transitioned", function tidy() {
              detail.style.height = "auto";
              detail.removeEventListener("transitioned", tidy);
            })
          }
        });
    });

    // Add the image to the heading.
    heading.appendChild(img);
  }

  // Put the title all together.
  title_div.appendChild(heading);
  project_div.appendChild(title_div);

  // If the project has an image include it below the title.
  if (project.image != null) {
    const image = document.createElement("img");
    image.src = `${project_dir}/${project.image}`;
    image.alt = project.image_desc;

    project_div.appendChild(image);
  }

  // If the project has a short description, include it.
  if (project.short != null) {
    const short_desc = document.createElement("div");
    short_desc.innerHTML = `<p>${project.short}</p>`;
    short_desc.classList.add("short-desc");
    project_div.appendChild(short_desc);
  }

  // If there is a long description include it at the bottom.
  if (project.long != null) {
    const long_desc = document.createElement("div");
    long_desc.innerHTML = `<p>${project.long}</p>`;
    long_desc.classList.add("long-desc");
    long_desc.dataset.group = project_dir;
    project_div.appendChild(long_desc);
  }

  return project_div;
}
