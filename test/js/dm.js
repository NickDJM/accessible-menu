import DisclosureMenu from "../../src/disclosureMenu.js";

const menus = [];

document.addEventListener("DOMContentLoaded", () => {
  menus.push(
    new DisclosureMenu({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
    })
  );
});
