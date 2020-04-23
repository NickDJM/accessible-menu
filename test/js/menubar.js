const { Menubar } = AccessibleMenu;
const navs = document.querySelectorAll("nav");
const menuSettings = {
  submenuItemSelector: ".menu-item.dropdown",
  isHoverable: true
};

const menus = [];

Array.from(navs).forEach(nav => {
  const menuElement = nav.querySelector(".menu");
  let menu = null;

  if (nav.id === "main-menu") {
    const controllerElement = nav.querySelector(".menu-toggle");
    menu = new Menubar({
      menuElement,
      ...menuSettings,
      controllerElement,
      containerElement: nav
    });
  } else {
    menu = new Menubar({
      menuElement,
      ...menuSettings
    });
  }

  menus.push(menu);
});

console.log(menus);