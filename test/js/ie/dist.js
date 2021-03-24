"use strict";

var navs = document.querySelectorAll("nav");
var menus = [];
Array.from(navs).forEach(function (nav) {
  var menuElement = nav.querySelector("ul");
  var menuItemSelector = "li";
  var submenuItemSelector = "li.dropdown";
  var submenuToggleSelector = "a";
  var submenuSelector = "ul.dropdown";
  var openClass = "show";

  if (nav.id === "main-menu") {
    var controllerElement = nav.querySelector("button");
    var containerElement = nav;
    menus.push(new AccessibleMenu({
      menuElement: menuElement,
      menuItemSelector: menuItemSelector,
      submenuItemSelector: submenuItemSelector,
      submenuToggleSelector: submenuToggleSelector,
      submenuSelector: submenuSelector,
      openClass: openClass,
      controllerElement: controllerElement,
      containerElement: containerElement
    }));
  } else {
    menus.push(new AccessibleMenu({
      menuElement: menuElement,
      menuItemSelector: menuItemSelector,
      submenuItemSelector: submenuItemSelector,
      submenuToggleSelector: submenuToggleSelector,
      submenuSelector: submenuSelector,
      openClass: openClass
    }));
  }
});