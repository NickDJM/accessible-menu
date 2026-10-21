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
  leaveDelay: -1,
  transitionClass: "transitioning",
  transitionDuration: 250,
  expandDuration: -1,
  collapseDuration: -1,
  optionalKeySupport: false,
  breakpoint: "116ch",
  mediaQuery: "",
  expandInsideBreakpoint: false,
  expandOutsideBreakpoint: true,
  collapseInsideBreakpoint: true,
  collapseOutsideBreakpoint: false,
  lockInsideBreakpoint: false,
  lockOutsideBreakpoint: true,
  unlockInsideBreakpoint: true,
  unlockOutsideBreakpoint: false,
};
const container = document.querySelector("header");

let type = "native";
let structure = "one";
let currentMenu = null;

/**
 * Generates an accessible-menu.
 */
function generateMenu() {
  // Dispose of the current menu before replacing its HTML.
  if (currentMenu) {
    currentMenu.dispose();
    currentMenu = null;
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

  currentMenu = new MenuClass({
    menuElement: nav.querySelector("ul"),
    containerElement: nav,
    controllerElement: nav.querySelector("button"),
    ...options,
  });

  // Clean up any work started by a menu that could not initialize.
  if (!currentMenu.isInitialized) {
    currentMenu.dispose();
    currentMenu = null;
  }
}

// Set up menu structure buttons.
const domButtons = document.querySelectorAll("#domButtons button");

domButtons.forEach((button) => {
  button.addEventListener("click", () => {
    structure = button.dataset.menuStructure;
    generateMenu();

    domButtons.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
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
      button.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
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
      button.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
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
      button.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
  });
});

// Set up the hover delay input.
const hoverDelay = document.querySelector("#hoverDelay");

hoverDelay.addEventListener("input", () => {
  if (hoverDelay.value === "" || !hoverDelay.validity.valid) {
    return;
  }

  options.hoverDelay = hoverDelay.valueAsNumber;
  generateMenu();
});

// Set up the enter delay input.
const enterDelay = document.querySelector("#enterDelay");

enterDelay.addEventListener("input", () => {
  if (enterDelay.value === "" || !enterDelay.validity.valid) {
    return;
  }

  options.enterDelay = enterDelay.valueAsNumber;
  generateMenu();
});

// Set up the leave delay input.
const leaveDelay = document.querySelector("#leaveDelay");

leaveDelay.addEventListener("input", () => {
  if (leaveDelay.value === "" || !leaveDelay.validity.valid) {
    return;
  }

  options.leaveDelay = leaveDelay.valueAsNumber;
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
      button.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
  });
});

// Set up transition duration input.
const transitionDuration = document.querySelector("#transitionDuration");

transitionDuration.addEventListener("change", () => {
  if (transitionDuration.value === "" || !transitionDuration.validity.valid) {
    return;
  }

  options.transitionDuration = transitionDuration.valueAsNumber;
  generateMenu();
});

// Set up the expand duration input.
const expandDuration = document.querySelector("#expandDuration");

expandDuration.addEventListener("change", () => {
  if (expandDuration.value === "" || !expandDuration.validity.valid) {
    return;
  }

  options.expandDuration = expandDuration.valueAsNumber;
  generateMenu();
});

// Set up the collapse duration input.
const collapseDuration = document.querySelector("#collapseDuration");

collapseDuration.addEventListener("change", () => {
  if (collapseDuration.value === "" || !collapseDuration.validity.valid) {
    return;
  }

  options.collapseDuration = collapseDuration.valueAsNumber;
  generateMenu();
});

// Update responsive settings on the current menu so its controller can replace
// the listener without rebuilding the preview.
const breakpoint = document.querySelector("#breakpoint");

breakpoint.addEventListener("change", () => {
  options.breakpoint = breakpoint.value.trim();

  if (currentMenu) currentMenu.breakpoint = options.breakpoint;
});

const mediaQuery = document.querySelector("#mediaQuery");

mediaQuery.addEventListener("change", () => {
  options.mediaQuery = mediaQuery.value.trim();

  if (currentMenu) currentMenu.mediaQuery = options.mediaQuery;
});

// Action flags take effect when the controller next handles its media query.
const responsiveActions = document.querySelectorAll(
  "#responsiveActions input[type='checkbox']"
);

responsiveActions.forEach((input) => {
  input.addEventListener("change", () => {
    options[input.id] = input.checked;

    if (currentMenu) currentMenu[input.id] = input.checked;
  });
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

/**
 * Generates the menu and sets the preferred theme.
 */
function initializeDemo() {
  generateMenu();

  if (setTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = "Light Mode";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDemo, { once: true });
} else {
  initializeDemo();
}
