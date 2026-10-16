import { afterEach, describe, expect, it, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";

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

  const menu = new TopLinkDisclosureMenu({
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

describe("TopLinkDisclosureMenu menu item creation", () => {
  it("keeps separate link and toggle items in Top Link Disclosure", () => {
    const menu = createMenu();
    const [linkItem, toggleItem] = menu.elements.menuItems;

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(3);
    expect(linkItem.dom.link).toBe(document.querySelector("a"));
    expect(linkItem.isSubmenuItem).toBe(false);
    expect(linkItem.elements.sibling).toBe(toggleItem);
    expect(toggleItem.dom.link).toBe(document.querySelector("button"));
    expect(toggleItem.isSubmenuItem).toBe(true);
    expect(toggleItem.elements.toggle).toBe(menu.elements.submenuToggles[0]);
  });

  it("creates only one item when the link and toggle are the same", () => {
    const menu = createMenu({
      submenuTogglesSelector: "a",
    });

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(2);
    expect(menu.elements.menuItems[0].dom.link).toBe(
      document.querySelector("a")
    );
    expect(menu.elements.menuItems[0].isSubmenuItem).toBe(true);
  });

  it("keeps Top Link Disclosure's separate root toggles and combined submenu links", () => {
    document.body.innerHTML = markup;
    document.querySelector("ul ul li").innerHTML = `
      <a href="#child">Child</a>
      <ul><li><a href="#grandchild">Grandchild</a></li></ul>
    `;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
    });
    menus.push(menu);
    const childMenu = menu.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(3);
    expect(childMenu.isInitialized).toBe(true);
    expect(childMenu.elements.menuItems).toHaveLength(1);
    expect(childMenu.elements.menuItems[0].elements.toggle.dom.controller).toBe(
      childMenu.elements.menuItems[0].dom.link
    );
    expect(childMenu.selectors.submenuToggles).toBe("a");
  });

  it("reads the current child toggle selector when children are created", () => {
    document.body.innerHTML = markup;
    document.querySelector("ul ul li").innerHTML = `
      <a href="#child">Child</a>
      <button type="button">Show child</button>
      <ul><li><a href="#grandchild">Grandchild</a></li></ul>
    `;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);

    menu._selectors.submenuSubtoggles = "button";
    menu.initialize();

    const childMenu = menu.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(childMenu.isInitialized).toBe(true);
    expect(childMenu.elements.menuItems).toHaveLength(2);
    expect(childMenu.elements.submenuToggles[0].dom.controller).toBe(
      childMenu.dom.menu.querySelector("button")
    );
  });

  it.each(["a", "a,button"])(
    "finds the navigation link after its toggle with selector %s",
    (selector) => {
      const menu = createMenu({
        menuLinksSelector: selector,
        initialize: false,
      });
      const item = menu.dom.menu.querySelector("li");
      const button = item.querySelector("button");
      const link = item.querySelector("a");
      item.prepend(button);

      menu.initialize();

      const [linkItem, toggleItem] = menu.elements.menuItems;

      expect(menu.isInitialized).toBe(true);
      expect(menu.elements.menuItems).toHaveLength(3);
      expect(linkItem.dom.link).toBe(link);
      expect(linkItem.elements.sibling).toBe(toggleItem);
      expect(toggleItem.dom.link).toBe(button);
    }
  );

  it("uses the toggle when the only navigation link is inside its child menu", () => {
    const menu = createMenu({ initialize: false });
    const item = menu.dom.menu.querySelector("li");
    const button = item.querySelector("button");
    item.querySelector("a").remove();

    menu.initialize();

    const toggleItem = menu.elements.menuItems[0];
    const child = toggleItem.elements.childMenu;

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(2);
    expect(toggleItem.dom.link).toBe(button);
    expect(toggleItem.isSubmenuItem).toBe(true);
    expect(child.elements.menuItems[0].dom.link).toBe(
      item.querySelector("ul a")
    );
  });

  it("keeps standalone buttons as menu items", () => {
    const menu = createMenu({ initialize: false });
    const lastItem = menu.dom.menu.lastElementChild;
    lastItem.innerHTML = '<button type="button">Action</button>';

    menu.initialize();

    const item = menu.elements.menuItems.at(-1);

    expect(menu.isInitialized).toBe(true);
    expect(item.dom.link).toBe(lastItem.querySelector("button"));
    expect(item.isSubmenuItem).toBe(false);
  });
});
