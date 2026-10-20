import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Component from "@accessible-ecosystem/core";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { twoLevel } from "../../../demo/menus.js";

describe("BaseMenuItem initialization", () => {
  describe("inheritance", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.innerHTML = "";
    });

    it("should inherit Core initialization", () => {
      expect(BaseMenuItem.prototype.initialize).toBe(
        Component.prototype.initialize
      );
    });
  });
});
