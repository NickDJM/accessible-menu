/**
 * Tests for protected methods of Treeview class.
 */

import { describe, it, expect, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test Treeview protected methods.
describe("Treeview protected methods", () => {
  // Test Treeview _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that Treeview implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(Treeview.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test Treeview _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that Treeview implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(Treeview.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test Treeview _handleFocus().
  describe("_handleFocus", () => {
    // Test that Treeview implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(Treeview.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test Treeview _handleClick().
  describe("_handleClick", () => {
    // https://github.com/NickDJM/accessible-menu/issues/554
    it("should activate a link without calling closeChildren", () => {
      document.body.innerHTML = twoLevel;
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
      });
      const submenu = menu.elements.menuItems[1].elements.childMenu;
      const link = submenu.elements.menuItems[0].dom.link;
      const close = vi.spyOn(menu, "closeChildren");
      const activate = vi.fn();
      link.addEventListener("click", activate);

      link.click();

      expect(activate).toHaveBeenCalledTimes(1);
      expect(close).not.toHaveBeenCalled();

      close.mockRestore();
      document.body.innerHTML = "";
    });

    // Test that Treeview implements the BaseMenu _handleClick() method.
    it("should implement the BaseMenu _handleClick() method", () => {
      expect(Treeview.prototype._handleClick).toBe(
        BaseMenu.prototype._handleClick
      );
    });
  });

  // Test Treeview _setIds().
  describe("_setIds", () => {
    // Test that Treeview implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(Treeview.prototype._setIds).toBe(BaseMenu.prototype._setIds);
    });
  });
});
