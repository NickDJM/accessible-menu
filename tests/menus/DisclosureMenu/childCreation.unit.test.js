import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";

class SeparateLinkMenu extends DisclosureMenu {
  _MenuType = SeparateLinkMenu;
  _splitMenuLinks = true;

  constructor({ initialize = true, ...options }) {
    super({ ...options, initialize: false });

    if (initialize) {
      this.initialize();
    }
  }
}

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

beforeEach(() => {
  document.body.innerHTML = markup;
});

afterEach(() => {
  for (const menu of menus.splice(0)) {
    menu.dispose();
  }

  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("DisclosureMenu menu item creation", () => {
  it("keeps one submenu item when links and toggles match different elements", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
    });
    menus.push(menu);
    const toggle = menu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(2);
    expect(menu.elements.menuItems[0].dom.link).toBe(toggle.dom.controller);
    expect(menu.elements.menuItems[0].elements.toggle).toBe(toggle);
  });

  it("creates only one item when the link and toggle are the same", () => {
    const menu = new SeparateLinkMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
      submenuTogglesSelector: "a",
    });
    menus.push(menu);

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(2);
    expect(menu.elements.menuItems[0].dom.link).toBe(
      document.querySelector("a")
    );
    expect(menu.elements.menuItems[0].isSubmenuItem).toBe(true);
  });

  it("lets a subclass create separate items without changing link activation", () => {
    const menu = new SeparateLinkMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
    });
    menus.push(menu);
    const [linkItem, toggleItem] = menu.elements.menuItems;
    const toggle = toggleItem.elements.toggle;
    const linkClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    const toggleClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    const toggleAction = vi.spyOn(toggle, "toggle");

    linkItem.dom.link.dispatchEvent(linkClick);

    expect(linkClick.defaultPrevented).toBe(false);
    expect(toggleAction).not.toHaveBeenCalled();
    expect(toggle.isExpanded).toBe(false);

    toggleItem.dom.link.querySelector("span").dispatchEvent(toggleClick);

    expect(toggleClick.defaultPrevented).toBe(true);
    expect(toggleAction).toHaveBeenCalledOnce();
    expect(toggle.isExpanded).toBe(true);
    expect(toggle.dom.controlled).toBe(toggle.elements.controlledMenu.dom.menu);
    expect(toggle.dom.controller.getAttribute("aria-controls")).toBe(
      toggle.dom.controlled.id
    );
  });

  it("uses the subclass's item and menu types at deeper levels", () => {
    document.body.innerHTML = markup;
    document.querySelector("ul ul li").innerHTML = `
      <a href="#child">Child</a>
      <button type="button">Show child</button>
      <ul><li><a href="#grandchild">Grandchild</a></li></ul>
    `;
    const menu = new SeparateLinkMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
    });
    menus.push(menu);
    const childMenu = menu.elements.submenuToggles[0].elements.controlledMenu;
    const [linkItem, toggleItem] = childMenu.elements.menuItems;

    expect(childMenu).toBeInstanceOf(SeparateLinkMenu);
    expect(linkItem).toBeInstanceOf(DisclosureMenuItem);
    expect(toggleItem).toBeInstanceOf(DisclosureMenuItem);
    expect(linkItem.elements.sibling).toBe(toggleItem);
    expect(toggleItem.elements.childMenu.isInitialized).toBe(true);
  });

  it.each(["a", "a,button"])(
    "finds the navigation link after its toggle with selector %s",
    (selector) => {
      const menu = new SeparateLinkMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "button",
        transitionClass: "",
        menuLinksSelector: selector,
        initialize: false,
      });
      menus.push(menu);
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
    const menu = new SeparateLinkMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);
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
});
