/**
 * Tests for the isValidClassList() function.
 */

import { describe, it, expect } from "vitest";
import { isValidClassList } from "../../src/validate.js";

describe("isValidClassList", () => {
  // Test a valid single class.
  it("should return true when checking if a valid single class is a valid class list", () => {
    const classList = "class";
    const result = isValidClassList({ classList });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test a valid multiple classes.
  it("should return true when checking if valid multiple classes are a valid class list", () => {
    const classList = ["class1", "class2"];
    const result = isValidClassList({ classList });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test an invalid single class.
  it("should return false when checking if an invalid single class is a valid class list", () => {
    const classList = 1;
    const result = isValidClassList({ classList });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test an invalid multiple classes.
  it("should return false when checking if invalid multiple classes are a valid class list", () => {
    const classList = [1, 2];
    const result = isValidClassList({ classList });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test a mixed valid and invalid classes.
  it("should return false when checking if a mixed valid and invalid classes are a valid class list", () => {
    const classList = ["class", 1];
    const result = isValidClassList({ classList });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const classList = "class";
    const result = isValidClassList(classList);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
