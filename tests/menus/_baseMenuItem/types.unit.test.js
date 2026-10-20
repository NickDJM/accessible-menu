import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import Component from "@accessible-ecosystem/core";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import BaseMenu from "../../../src/_baseMenu.js";

describe("BaseMenuItem types", () => {
  describe("inheritance", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevelDisclosureTopLink;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should inherit from Core Component", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance).toBeInstanceOf(Component);
    });
  });
});
