/**
 * Initialization tests for the TransactionalValue class.
 */

import { describe, it, expect } from "vitest";
import TransactionalValue from "../../src/TransactionalValue.js";

// Test the TransactionalValue initialization.
describe("TransactionalValue", () => {
  // Test that the TransactionalValue will initialize with the initial value.
  it("should initialize with the initial value", () => {
    const value = new TransactionalValue("Test");

    expect(value.value).toBe("Test");
    expect(value.committed).toBe("Test");
    expect(value.isDirty).toBe(false);
  });
});
