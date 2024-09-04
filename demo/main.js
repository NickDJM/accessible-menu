import AccessibleMenu from "../index.js";
import menus from "./menus.js";

const menuSettings = {
  native: {
    structure: {
      one: menus.singleLevel,
      two: menus.twoLevel,
      three: menus.threeLevel,
    },
    class: "native",
  },
  DisclosureMenu: {
    structure: {
      one: menus.singleLevel,
      two: menus.twoLevelDisclosure,
      three: menus.threeLevelDisclosure,
    },
    class: "disclosure-menu",
  },
  Menubar: {
    structure: {
      one: menus.singleLevel,
      two: menus.twoLevel,
      three: menus.threeLevel,
    },
    class: "menubar",
  },
  TopLinkDisclosureMenu: {
    structure: {
      one: menus.singleLevel,
      two: menus.twoLevelDisclosureTopLink,
      three: menus.threeLevelDisclosureTopLink,
    },
    class: "top-link-disclosure-menu",
  },
  Treeview: {
    structure: {
      one: menus.singleLevel,
      two: menus.twoLevel,
      three: menus.threeLevel,
    },
    class: "treeview",
  },
};
const options = {
  hoverType: "off",
  hoverDelay: 250,
  enterDelay: -1,
  leaveDelat: -1,
  transitionClass: "transitioning",
  transitionDuration: 250,
  openDuration: -1,
  closeDuration: -1,
  optionalKeySupport: true,
};
const container = document.querySelector("header");

let type = "native";
let structure = "one";

/**
 * Generates an accessible-menu.
 */
function generateMenu() {
  // Remove the last menu from the stack.
  if (window.AccessibleMenu) {
    window.AccessibleMenu.menus = {};
  }

  // Get the menu class and structure.
  const MenuClass = AccessibleMenu[type] || null;
  const menuStructure = menuSettings[type].structure[structure];

  // Set the menu structure.
  container.innerHTML = menuStructure;

  // Get the nav element.
  const nav = container.querySelector("nav");

  // Set the classes.
  document.body.classList.remove(
    ...Object.values(menuSettings).map((setting) => setting.class)
  );
  document.body.classList.add(menuSettings[type].class);
  nav.classList.add(menuSettings[type].class);

  if (MenuClass === null) {
    return;
  }

  new MenuClass({
    menuElement: nav.querySelector("ul"),
    containerElement: nav,
    controllerElement: nav.querySelector("button"),
    ...options,
  });
}

// Set up menu structure buttons.
const domButtons = document.querySelectorAll("#domButtons button");

domButtons.forEach((button) => {
  button.addEventListener("click", () => {
    structure = button.dataset.menuStructure;
    generateMenu();

    domButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Setup the menu type buttons.
const menuButtons = document.querySelectorAll("#menuButtons button");

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    type = button.dataset.menuType;
    generateMenu();

    menuButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Set up the optional key support settings.
const keySupport = document.querySelectorAll("#keyButtons button");

keySupport.forEach((button) => {
  button.addEventListener("click", () => {
    options.optionalKeySupport = button.dataset.optionalKeySupport === "true";
    generateMenu();

    keySupport.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Set up the hover type buttons.
const hoverButtons = document.querySelectorAll("#hoverButtons button");

hoverButtons.forEach((button) => {
  button.addEventListener("click", () => {
    options.hoverType = button.dataset.hoverType;
    generateMenu();

    hoverButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Set up the hover delay input.
const hoverDelay = document.querySelector("#hoverDelay");

hoverDelay.addEventListener("input", () => {
  options.hoverDelay = Number(hoverDelay.value);
  generateMenu();
});

// Set up the enter delay input.
const enterDelay = document.querySelector("#enterDelay");

enterDelay.addEventListener("input", () => {
  options.enterDelay = Number(enterDelay.value);
  generateMenu();
});

// Set up the leave delay input.
const leaveDelay = document.querySelector("#leaveDelay");

leaveDelay.addEventListener("input", () => {
  options.leaveDelay = Number(leaveDelay.value);
  generateMenu();
});

// Set up transition buttons.
const transitionButtons = document.querySelectorAll(
  "#transitionButtons button"
);

transitionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    options.transitionClass = button.dataset.transitionClass;
    generateMenu();

    transitionButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Set up transition duration input.
const transitionDuration = document.querySelector("#transitionDuration");

transitionDuration.addEventListener("change", () => {
  options.transitionDuration = Number(transitionDuration.value);
  generateMenu();
});

// Set up the open duration input.
const openDuration = document.querySelector("#openDuration");

openDuration.addEventListener("change", () => {
  options.openDuration = Number(openDuration.value);
  generateMenu();
});

// Set up the close duration input.
const closeDuration = document.querySelector("#closeDuration");

closeDuration.addEventListener("change", () => {
  options.closeDuration = Number(closeDuration.value);
  generateMenu();
});

// Set up the theme switcher.
// Theme setup.
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const setTheme = window.localStorage.getItem("setTheme") || preferredTheme;
const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    window.localStorage.setItem("setTheme", "light");
    themeToggle.innerHTML = "Dark Mode";
  } else {
    document.body.classList.add("dark-mode");
    window.localStorage.setItem("setTheme", "dark");
    themeToggle.innerHTML = "Light Mode";
  }
});

// Generate the menu and set the preferred theme.
document.addEventListener("DOMContentLoaded", () => {
  generateMenu();

  if (setTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = "Light Mode";
  }
});
