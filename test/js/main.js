const navs = document.querySelectorAll("nav");
const menuSettings = {
  menuItemSelector: ".menu-item",
  submenuItemSelector: ".menu-item.dropdown",
  submenuToggleSelector: ".dropdown-toggle",
  submenuSelector: ".menu.dropdown",
  openClass: "show",
  isHoverable: true
};

Array.from(navs).forEach(nav => {
  const menuElement = nav.querySelector(".menu");

  if (nav.id === "main-menu") {
    const controllerElement = nav.querySelector(".menu-toggle");
    const menu = new AccessibleMenu({
      menuElement,
      ...menuSettings,
      controllerElement,
      containerElement: nav
    });
  } else {
    const menu = new AccessibleMenu({
      menuElement,
      ...menuSettings
    });
  }
});
