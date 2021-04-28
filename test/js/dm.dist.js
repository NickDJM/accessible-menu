/**
 * Toggles the hover state of a menu and its submenus.
 *
 * @param {AccessibleMenu.DisclosureMenu} menu - The menu to toggle.
 * @param {string}                        type - The type of hover to toggle.
 */
function toggleHover(menu, type) {
  menu.elements.submenuToggles.forEach(toggle => {
    toggle.elements.controlledMenu.hoverType = type;
  });

  menu.hoverType = type;
}

const navs = document.querySelectorAll("nav");
const menus = [];

Array.from(navs).forEach(nav => {
  const menuElement = nav.querySelector("ul");
  const submenuItemSelector = "li.dropdown";
  const controllerElement =
    nav.id === "main-menu" ? nav.querySelector("button") : null;
  const containerElement = nav.id === "main-menu" ? nav : null;

  menus.push(
    new DisclosureMenu({
      menuElement,
      submenuItemSelector,
      controllerElement,
      containerElement,
      openClass: ["show", "open"],
      hoverType: window.innerWidth >= 1070 ? "dynamic" : "off",
    })
  );
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1070 && menus[0].hoverType === "off") {
    toggleHover(menus[0], "dynamic");
  } else if (window.innerWidth < 1070 && menus[0].hoverType === "dynamic") {
    toggleHover(menus[0], "off");
  }
});

document.addEventListener("accessibleMenuExpand", event => {
  console.log(event);
});

document.addEventListener("accessibleMenuCollapse", event => {
  console.log(event);
});
