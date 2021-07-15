import Menubar from "../../src/menubar.js";

const menus = [];

document.addEventListener("DOMContentLoaded", () => {
  menus.push(
    new Menubar({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
    })
  );
});
