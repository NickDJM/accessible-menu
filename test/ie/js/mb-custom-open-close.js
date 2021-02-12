"use strict";

/**
 * Toggles the hover state of a menu and its submenus.
 *
 * @param {AccessibleMenu.Menubar} menu - The menu to toggle.
 */
function toggleHover(menu) {
  menu.elements.submenuToggles.forEach(function (toggle) {
    toggle.elements.controlledMenu.isHoverable = !menu.isHoverable;
  });
  menu.isHoverable = !menu.isHoverable;
}

var navs = document.querySelectorAll("nav");
var menus = [];
Array.from(navs).forEach(function (nav) {
  var menuElement = nav.querySelector("ul");
  var submenuItemSelector = "li.dropdown";
  var controllerElement = nav.id === "main-menu" ? nav.querySelector("button") : null;
  var containerElement = nav.id === "main-menu" ? nav : null;
  menus.push(new AccessibleMenu.Menubar({
    menuElement: menuElement,
    submenuItemSelector: submenuItemSelector,
    controllerElement: controllerElement,
    containerElement: containerElement,
    openClass: ["show", "open"],
    closeClass: "",
    isHoverable: true
  }));
});
window.addEventListener("resize", function () {
  if (window.innerWidth >= 1070 && !menus[0].isHoverable) {
    toggleHover(menus[0]);
  } else if (window.innerWidth < 1070 && menus[0].isHoverable) {
    toggleHover(menus[0]);
  }
});
document.addEventListener("accessibleMenuExpand", function (event) {
  console.log(event);
});
document.addEventListener("accessibleMenuCollapse", function (event) {
  console.log(event);
});