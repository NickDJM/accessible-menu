import AccessibleMenu from "../index";
import {
  singleLevel,
  twoLevel,
  twoLevelTopLink,
  threeLevel,
  threeLevelTopLink,
} from "./menus";

/**
 * Generates an accessible-menu.
 *
 * @param {string}      type           - The type of menu to use.
 * @param {string}      structure      - The DOM structure to use.
 * @param {string}      hover          - The hover type for the menu.
 * @param {HTMLElement} container      - The container to generate the menu in.
 * @param {object}      [options = {}] - Option overrides.
 */
function generateMenu(type, structure, hover, container, options = {}) {
  menus.pop();
  const MenuClass = AccessibleMenu[type] || null;
  const menuDOM = menuStructures[structure];

  if (type === "TopLinkDisclosureMenu") {
    container.innerHTML = menuDOM.topLink;
  } else {
    container.innerHTML = menuDOM.default;
  }

  const nav = container.querySelector("nav");

  nav.classList.remove("disclosure-menu");
  nav.classList.remove("menubar");
  nav.classList.remove("top-link-disclosure-menu");
  nav.classList.remove("treeview");

  if (MenuClass !== null) {
    switch (type) {
      case "TopLinkDisclosureMenu":
        nav.classList.add("top-link-disclosure-menu");

        break;

      case "DisclosureMenu":
        nav.classList.add("disclosure-menu");

        break;

      case "Menubar":
        nav.classList.add("menubar");

        break;

      case "Treeview":
        nav.classList.add("treeview");

        break;
    }

    const menu = new MenuClass({
      menuElement: nav.querySelector("ul"),
      submenuToggleSelector: ".dropdown-toggle",
      submenuItemSelector: ".dropdown",
      containerElement: nav,
      controllerElement: nav.querySelector("button"),
      hoverType: hover,
      ...options,
    });

    menus.push(menu);
  }
}

// Menu setup.
const menus = [];
const header = document.querySelector("header");
const menuButtons = document.querySelectorAll("#menuButtons button");
const domButtons = document.querySelectorAll("#domButtons button");
const hoverButtons = document.querySelectorAll("#hoverButtons button");
const menuStructures = {
  one: {
    default: singleLevel,
    topLink: singleLevel,
  },
  two: {
    default: twoLevel,
    topLink: twoLevelTopLink,
  },
  three: {
    default: threeLevel,
    topLink: threeLevelTopLink,
  },
};
const menuOptions = {
  DisclosureMenu: {
    optionalKeySupport: true,
  },
  Menubar: {},
  TopLinkDisclosureMenu: {
    optionalKeySupport: true,
  },
  Treeview: {},
};

// Theme setup.
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const setTheme = window.localStorage.getItem("setTheme") || preferredTheme;
const body = document.querySelector("body");
const themeToggle = document.querySelector("#themeToggle");

// Menu options.
let menuType = "";
let menuStructure = "one";
let hoverType = "off";

// Set up menu type switching.
menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    menuType = button.dataset.menuType;
    const options = menuOptions[menuType] || {};

    generateMenu(menuType, menuStructure, hoverType, header, options);
    document
      .querySelector("#menuButtons button.active")
      .classList.remove("active");
    button.classList.add("active");
  });
});

// Set up menu structure switching.
domButtons.forEach((button) => {
  button.addEventListener("click", () => {
    menuStructure = button.dataset.menuStructure;
    const options = menuOptions[menuType] || {};

    generateMenu(menuType, menuStructure, hoverType, header, options);
    document
      .querySelector("#domButtons button.active")
      .classList.remove("active");
    button.classList.add("active");
  });
});

// Set up hover type switching.
hoverButtons.forEach((button) => {
  button.addEventListener("click", () => {
    hoverType = button.dataset.hoverType;
    const options = menuOptions[menuType] || {};

    generateMenu(menuType, menuStructure, hoverType, header, options);
    document
      .querySelector("#hoverButtons button.active")
      .classList.remove("active");
    button.classList.add("active");
  });
});

// Set up theme switching.
document.querySelector("#themeToggle").addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    window.localStorage.setItem("setTheme", "light");
    themeToggle.innerHTML = "Dark Mode";
  } else {
    body.classList.add("dark-mode");
    window.localStorage.setItem("setTheme", "dark");
    themeToggle.innerHTML = "Light Mode";
  }
});

// Generate an initial menu and set theme.
document.addEventListener("DOMContentLoaded", () => {
  const options = menuOptions[menuType] || {};

  generateMenu(menuType, menuStructure, hoverType, header, options);

  if (setTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = "Light Mode";
  }
});
