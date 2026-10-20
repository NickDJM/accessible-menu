// @vitest-environment node

import { describe, it, expect } from "vitest";
import * as entry from "../build.js";
import config from "../rolldown.config.js";
import packageInfo from "../package.json";
import {
  DisclosureMenu,
  Menubar,
  TopLinkDisclosureMenu,
  Treeview,
} from "../index.js";

describe("Combined library exports", () => {
  it.each([
    ["DisclosureMenu", DisclosureMenu],
    ["Menubar", Menubar],
    ["TopLinkDisclosureMenu", TopLinkDisclosureMenu],
    ["Treeview", Treeview],
  ])("should expose the documented named %s export", (name, Type) => {
    expect(entry[name]).toBe(Type);
  });

  it.each(["DisclosureMenu", "Menubar", "TopLinkDisclosureMenu", "Treeview"])(
    "should preserve %s on the default export",
    (name) => {
      expect(entry.default[name]).toBe(entry[name]);
    }
  );
});

describe("CommonJS package entry", () => {
  it("should use a CommonJS extension inside the module package", () => {
    const output = config[0].output.find((output) => output.format === "cjs");

    expect(output.entryFileNames).toMatch(/\.cjs$/);
  });

  it("should point require exports to the emitted artifact", () => {
    const output = config[0].output.find((output) => output.format === "cjs");

    expect(packageInfo.exports["."].require).toBe(
      `./${output.dir}/${output.entryFileNames}`
    );
  });
});
