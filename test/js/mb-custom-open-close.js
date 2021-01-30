const navs = document.querySelectorAll("nav");
const menus = [];

Array.from(navs).forEach(nav => {
  const menuElement = nav.querySelector("ul");
  const submenuItemSelector = "li.dropdown";
  const controllerElement = nav.id === "main-menu" ? nav.querySelector("button") : null;
  const containerElement = nav.id === "main-menu" ? nav : null;

  menus.push(new AccessibleMenu.Menubar({
    menuElement,
    submenuItemSelector,
    controllerElement,
    containerElement,
    openClass: ["show", "open"],
    closeClass: "",
  }));
});

document.addEventListener("accessibleMenuExpand", event => {
  console.log(event);
});

document.addEventListener("accessibleMenuCollapse", event => {
  console.log(event);
});
