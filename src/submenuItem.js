import MenuItem from "./menuItem";
import Submenu from "./submenu";
import MenuToggle from "./menuToggle";

const validate = {
  childMenu: value => {
    if (!(value instanceof Submenu)) {
      throw new TypeError("childMenu must be a Submenu.");
    }
  },
  toggle: toggle => {
    if (!(toggle instanceof MenuToggle)) {
      throw new TypeError("toggle must be a MenuToggle.");
    }
  }
};

/**
 * A navigation link containing a submenu.
 */
class submenuItem extends MenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}       param0                 - The menu item object.
   * @param {HTMLElement}  param0.menuItemElement - The menu item in the DOM.
   * @param {Menu|Submenu} param0.parentMenu      - The parent menu.
   * @param {Submenu}      param0.childMenu       - The child menu.
   * @param {MenuToggle}   param0.toggle          - The controller for the child menu.
   */
  constructor({ menuItemElement, parentMenu, childMenu, toggle }) {
    validate.childMenu(childMenu);
    validate.toggle(toggle);

    super({ menuItemElement, parentMenu });

    this.elements = {
      ...this.elements,
      childMenu,
      toggle
    };
  }

  /**
   * The link element inside the menu item.
   *
   * @returns {HTMLElement} - The link.
   */
  get linkElement() {
    return this.toggle.element;
  }

  /**
   * The item's child menu.
   *
   * @returns {Submenu} - The menu.
   */
  get childMenu() {
    return this.elements.childMenu;
  }

  /**
   * The item's toggle.
   *
   * @returns {MenuToggle} - The toggle.
   */
  get toggle() {
    return this.elements.toggle;
  }
}

export default submenuItem;
