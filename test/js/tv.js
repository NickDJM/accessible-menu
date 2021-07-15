import Treeview from "../../src/treeview.js";

const menus = [];

document.addEventListener("DOMContentLoaded", () => {
  menus.push(
    new Treeview({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
    })
  );
});
