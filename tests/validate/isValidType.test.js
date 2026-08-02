/**
 * Tests for the isValidType() function.
 */

import { describe, it, expect } from "vitest";
import { isValidType } from "../../src/validate.js";

describe("isValidType", () => {
  // Test checking for a string.
  it("should return true when checking if a string is a string", () => {
    const string = "string";
    const result = isValidType("string", { string });

    expect(result.status).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  // Test checking for multiple strings.
  it("should return true when checking if multiple strings are strings", () => {
    const string1 = "string";
    const string2 = "string";
    const result = isValidType("string", { string1, string2 });

    expect(result.status).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  // Test checking for a non-string.
  it("should return false when checking if a non-string is a string", () => {
    const string = 1;
    expect(() => {
      isValidType("string", { string });
    }).toThrow(TypeError);
  });

  // Test checking for multiple non-strings.
  it("should return false when checking if multiple non-strings are strings", () => {
    const string1 = 1;
    const string2 = 1;
    expect(() => {
      isValidType("string", { string1, string2 });
    }).toThrow(TypeError);
  });

  // Test checking for a mixed string and non-string.
  it("should return false when checking if a mixed string and non-string are strings", () => {
    const string1 = "string";
    const string2 = 1;
    expect(() => {
      isValidType("string", { string1, string2 });
    }).toThrow(TypeError);
  });

  // Test passing a non-valid type.
  it("should return false when checking for a non-valid type", () => {
    const string = "string";
    expect(() => {
      isValidType(1, { string });
    }).toThrow(TypeError);
  });

  // Test passing a non-object as the values argument.
  it("should return false when passing a non-object as the values argument", () => {
    const string = "string";
    expect(() => {
      isValidType("string", string);
    }).toThrow(TypeError);
  });

  // Test that shouldThrow will throw on invalid values.
  it("should throw the first error when shouldThrow is true", () => {
    expect(() => {
      isValidType("string", { value: 1 }, { shouldThrow: true });
    }).toThrow(TypeError);
  });

  // Test that shouldThrow can be disabled.
  it("should not throw when shouldThrow is false", () => {
    const result = isValidType("string", { value: 1 }, { shouldThrow: false });

    expect(result.status).toBeFalsy();
    expect(result.errors[0]).toBeInstanceOf(TypeError);
  });
});
