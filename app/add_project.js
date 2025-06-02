
export default async function add_all(projects_dir /*string*/) {
  // TODO: Iterate through the directories in "projects_dir" and call `add_project` for each of them.
}

export async function add_project(project_dir /*string*/) {
  const template = await (await fetch("./app/project_html.html")).text();
  const project = await (await fetch(project_dir + "data.json")).json();

  const title_pat = new RegExp("\\{title\\}", "g");
  const short_pat = new RegExp("\\{short\\}", "g");
  const long_pat = new RegExp("\\{long\\}", "g");

  let html = template;
  html = html.replace(title_pat, project.title);
  html = html.replace(short_pat, project.short);
  html = html.replace(long_pat, project.long);

  const zone = document.getElementById("test_zone");
  zone.innerHTML = html;
}
