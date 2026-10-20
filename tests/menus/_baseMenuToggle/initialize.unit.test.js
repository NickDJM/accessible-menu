import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { twoLevel } from "../../../demo/menus.js";

describe("BaseMenuToggle initialization", () => {
  describe("inheritance", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.innerHTML = "";
    });

    it("should inherit Core initialization", () => {
      expect(BaseMenuToggle.prototype.initialize).toBe(
        CollapsibleComponent.prototype.initialize
      );
    });
  });
});
