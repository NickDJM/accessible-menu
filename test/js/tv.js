import Treeview from "../../src/treeview.js";

const navs = document.querySelectorAll("nav");
const menus = [];

Array.from(navs).forEach((nav) => {
  const menuElement = nav.querySelector("ul");
  const submenuItemSelector = "li.dropdown";
  const controllerElement =
    nav.id === "main-menu" ? nav.querySelector("button") : null;
  const containerElement = nav.id === "main-menu" ? nav : null;

  menus.push(
    new Treeview({
      menuElement,
      submenuItemSelector,
      controllerElement,
      containerElement,
      openClass: ["show", "open"],
      hoverType: "off",
    })
  );
});

document.addEventListener("accessibleMenuExpand", (event) => {
  console.log(event);
});

document.addEventListener("accessibleMenuCollapse", (event) => {
  console.log(event);
});
