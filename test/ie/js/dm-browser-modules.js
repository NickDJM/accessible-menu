"use strict";

var _disclosureMenu = _interopRequireDefault(require("../../src/disclosureMenu.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Toggles the hover state of a menu and its submenus.
 *
 * @param {DisclosureMenu} menu - The menu to toggle.
 */
function toggleHover(menu) {
  menu.isHoverable = !menu.isHoverable;
}

var navs = document.querySelectorAll("nav");
var menus = [];
Array.from(navs).forEach(function (nav) {
  var menuElement = nav.querySelector("ul");
  var submenuItemSelector = "li.dropdown";
  var controllerElement = nav.id === "main-menu" ? nav.querySelector("button") : null;
  var containerElement = nav.id === "main-menu" ? nav : null;
  menus.push(new _disclosureMenu["default"]({
    menuElement: menuElement,
    submenuItemSelector: submenuItemSelector,
    controllerElement: controllerElement,
    containerElement: containerElement,
    isHoverable: window.innerWidth >= 1070
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