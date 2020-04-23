"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _AccessibleMenu = AccessibleMenu,
    Menubar = _AccessibleMenu.Menubar;
var navs = document.querySelectorAll("nav");
var menuSettings = {
  submenuItemSelector: ".menu-item.dropdown",
  isHoverable: true
};
var menus = [];
Array.from(navs).forEach(function (nav) {
  var menuElement = nav.querySelector(".menu");
  var menu = null;

  if (nav.id === "main-menu") {
    var controllerElement = nav.querySelector(".menu-toggle");
    menu = new Menubar(_objectSpread({
      menuElement: menuElement
    }, menuSettings, {
      controllerElement: controllerElement,
      containerElement: nav
    }));
  } else {
    menu = new Menubar(_objectSpread({
      menuElement: menuElement
    }, menuSettings));
  }

  menus.push(menu);
});
console.log(menus);