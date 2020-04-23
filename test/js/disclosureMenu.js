const { DisclosureMenu } = AccessibleMenu;
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
    menu = new DisclosureMenu({
      menuElement,
      ...menuSettings,
      controllerElement,
      containerElement: nav
    });
  } else {
    menu = new DisclosureMenu({
      menuElement,
      ...menuSettings
    });
  }

  menus.push(menu);
});

console.log(menus);