const navs = document.querySelectorAll("nav");
const menus = [];

Array.from(navs).forEach(nav => {
  const menuElement = nav.querySelector("ul");
  const menuItemSelector = "li";
  const submenuItemSelector = "li.dropdown";
  const submenuToggleSelector = "a";
  const submenuSelector = "ul.dropdown";
  const openClass = "show";

  if (nav.id === "main-menu") {
    const controllerElement = nav.querySelector("button");
    const containerElement = nav;
    menus.push(
      new AccessibleMenu({
        menuElement,
        menuItemSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
        openClass,
        controllerElement,
        containerElement,
      })
    );
  } else {
    menus.push(
      new AccessibleMenu({
        menuElement,
        menuItemSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
        openClass,
      })
    );
  }
});
