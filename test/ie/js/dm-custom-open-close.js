"use strict";

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
    closeClass: ""
  }));
});