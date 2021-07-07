import DisclosureMenu from "../../src/disclosureMenu.js";
import { triggerEvent } from "../../tests/menus/_common/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  const menu = new DisclosureMenu({
    menuElement: document.querySelector("#menu-0"),
    submenuItemSelector: "li.dropdown",
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("#toggle-0"),
    hoverType: "on",
  });

  setTimeout(() => {
    triggerEvent("mouseenter", menu.elements.submenuToggles[0].dom.toggle);

    setTimeout(() => {
      triggerEvent("mouseleave", menu.elements.submenuToggles[0].dom.toggle);
      console.log(menu.elements.submenuToggles[0]);
    }, 1000);
  }, 2000);
});
