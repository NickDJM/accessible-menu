const navs = document.querySelectorAll("nav");
const menus = [];

Array.from(navs).forEach(nav => {
  const menuElement = nav.querySelector("ul");
  const submenuItemSelector = "li.dropdown";
  const controllerElement = nav.id === "main-menu" ? nav.querySelector("button") : null;
  const containerElement = nav.id === "main-menu" ? nav : null;

  menus.push(new AccessibleMenu.DisclosureMenu({
    menuElement,
    submenuItemSelector,
    controllerElement,
    containerElement,
  }));
});