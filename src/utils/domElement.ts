export function rootInDarkMode() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}
