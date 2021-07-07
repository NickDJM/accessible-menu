import DisclosureMenu from "../../src/disclosureMenu.js";
import { click } from "../../tests/menus/_common/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  const menu = new DisclosureMenu({
    menuElement: document.querySelector("#menu-0"),
    submenuItemSelector: "li.dropdown",
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("#toggle-0"),
  });

  setTimeout(() => {
    menu.elements.controller.close();
    click(menu.dom.controller);
    console.log(menu);
  }, 2000);
});
