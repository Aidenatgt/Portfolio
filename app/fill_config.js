export default async function fill() {
  try {
    const res = await fetch("./config.json");
    const data = await res.json();
    console.log("Config loaded:", data);

    async function format_element(element) {
      for (const format of data.formats) {
        const pattern = new RegExp(`\\{${format.key}\\}`, "g");
        element.innerHTML = element.innerHTML.replace(pattern, format.value);
        console.log(`{${format.key}} replaced with ${format.value}`);
      }
    }

    const formatable = Array.from(document.getElementsByClassName("format"));
    console.log(`${formatable.length} formatable items`);

    await Promise.all(formatable.map(format_element));
  } catch (err) {
    console.error("Failed to load config.json:", err);
  }
}
