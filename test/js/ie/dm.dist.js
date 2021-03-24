"use strict";

/**
 * Toggles the hover state of a menu and its submenus.
 *
 * @param {AccessibleMenu.DisclosureMenu} menu - The menu to toggle.
 * @param {string}                        type - The type of hover to toggle.
 */
function toggleHover(menu, type) {
  menu.elements.submenuToggles.forEach(function (toggle) {
    toggle.elements.controlledMenu.hoverType = type;
  });
  menu.hoverType = type;
}

var navs = document.querySelectorAll("nav");
var menus = [];
Array.from(navs).forEach(function (nav) {
  var menuElement = nav.querySelector("ul");
  var submenuItemSelector = "li.dropdown";
  var controllerElement = nav.id === "main-menu" ? nav.querySelector("button") : null;
  var containerElement = nav.id === "main-menu" ? nav : null;
  menus.push(new AccessibleMenu.DisclosureMenu({
    menuElement: menuElement,
    submenuItemSelector: submenuItemSelector,
    controllerElement: controllerElement,
    containerElement: containerElement,
    openClass: ["show", "open"],
    hoverType: window.innerWidth >= 1070 ? "dynamic" : "off"
  }));
});
window.addEventListener("resize", function () {
  if (window.innerWidth >= 1070 && menus[0].hoverType === "off") {
    toggleHover(menus[0], "dynamic");
  } else if (window.innerWidth < 1070 && menus[0].hoverType === "dynamic") {
    toggleHover(menus[0], "off");
  }
});
document.addEventListener("accessibleMenuExpand", function (event) {
  console.log(event);
});
document.addEventListener("accessibleMenuCollapse", function (event) {
  console.log(event);
});