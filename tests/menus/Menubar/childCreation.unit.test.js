import { afterEach, describe, expect, it, vi } from "vitest";
import Menubar from "../../../src/menubar.js";

const menus = [];

const markup = `
  <nav>
    <ul>
      <li>
        <a href="#section">Section</a>
        <button type="button" aria-label="Show section"><span>More</span></button>
        <ul>
          <li><a href="#child">Child</a></li>
        </ul>
      </li>
      <li><a href="#last">Last</a></li>
    </ul>
  </nav>
`;

const createMenu = (options = {}) => {
  document.body.innerHTML = markup;

  const menu = new Menubar({
    menuElement: document.querySelector("ul"),
    submenuTogglesSelector: "button",
    transitionClass: "",
    ...options,
  });

  menus.push(menu);

  return menu;
};

afterEach(() => {
  for (const menu of menus.splice(0)) {
    menu.dispose();
  }

  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("Menubar menu item creation", () => {
  it("keeps one submenu item when links and toggles match different elements", () => {
    const menu = createMenu();
    const toggle = menu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(2);
    expect(menu.elements.menuItems[0].dom.link).toBe(toggle.dom.controller);
    expect(menu.elements.menuItems[0].elements.toggle).toBe(toggle);
  });
});
