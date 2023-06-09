/**
 * Tests for the addClass() function.
 */

import { describe, it, expect } from "vitest";
import { addClass } from "../../src/domHelpers.js";

describe("addClass", () => {
  // Test adding a single class.
  it("should add a single class to an element", () => {
    const element = document.createElement("div");

    addClass("test", element);

    expect(element.classList.contains("test")).toBeTruthy();
  });

  // Test adding multiple classes.
  it("should add multiple classes to an element", () => {
    const element = document.createElement("div");

    addClass(["test", "test2"], element);

    expect(element.classList.contains("test")).toBeTruthy();
    expect(element.classList.contains("test2")).toBeTruthy();
  });

  // Test not passing a class.
  it("should error if no class is passed", () => {
    const element = document.createElement("div");

    expect(() => addClass(undefined, element)).toThrow();
  });

  // Test not passing an element.
  it("should error if no element is passed", () => {
    expect(() => addClass("test", undefined)).toThrow();
  });

  // Test not passing a class or element.
  it("should error if no class or element is passed", () => {
    expect(() => addClass(undefined, undefined)).toThrow();
  });

  // Test passing an element that doesn't have a classList.
  it("should error if the element doesn't have a classList", () => {
    const element = {};

    expect(() => addClass("test", element)).toThrow();
  });

  // Test passing a non-string class.
  it("should error if the class isn't a string", () => {
    const element = document.createElement("div");

    expect(() => addClass(1, element)).toThrow();
  });

  // Test passing multiple non-string classes.
  it("should error if the classes aren't strings", () => {
    const element = document.createElement("div");

    expect(() => addClass([{}, "test"], element)).toThrow();
  });
});
