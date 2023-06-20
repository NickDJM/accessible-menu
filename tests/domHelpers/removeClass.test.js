/**
 * Tests for the removeClass() function.
 */

import { describe, it, expect, vi } from "vitest";
import { removeClass } from "../../src/domHelpers.js";

describe("removeClass", () => {
  // Test if classList.remove is called.
  it("should call classList.remove", () => {
    const element = {
      classList: {
        remove: vi.fn(),
      },
    };

    removeClass("test", element);

    expect(element.classList.remove).toHaveBeenCalledWith("test");
  });

  // Test adding a single class.
  it("should add a single class to an element", () => {
    const element = document.createElement("div");
    element.classList.add("test");

    removeClass("test", element);

    expect(element.classList.contains("test")).toBeFalsy();
  });

  // Test adding multiple classes.
  it("should add multiple classes to an element", () => {
    const element = document.createElement("div");
    element.classList.add("test", "test2");

    removeClass(["test", "test2"], element);

    expect(element.classList.contains("test")).toBeFalsy();
    expect(element.classList.contains("test2")).toBeFalsy();
  });

  // Test not passing a class.
  it("should error if no class is passed", () => {
    const element = document.createElement("div");

    expect(() => removeClass(undefined, element)).toThrow();
  });

  // Test not passing an element.
  it("should error if no element is passed", () => {
    expect(() => removeClass("test", undefined)).toThrow();
  });

  // Test not passing a class or element.
  it("should error if no class or element is passed", () => {
    expect(() => removeClass(undefined, undefined)).toThrow();
  });

  // Test passing an element that doesn't have a classList.
  it("should error if the element doesn't have a classList", () => {
    const element = {};

    expect(() => removeClass("test", element)).toThrow();
  });

  // Test passing a non-string class.
  it("should error if the class isn't a string", () => {
    const element = document.createElement("div");

    expect(() => removeClass(1, element)).toThrow();
  });

  // Test passing multiple non-string classes.
  it("should error if the classes aren't strings", () => {
    const element = document.createElement("div");

    expect(() => removeClass([{}, "test"], element)).toThrow();
  });
});
