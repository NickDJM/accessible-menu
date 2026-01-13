/**
 * Getter/Setter tests for the TransactionalValue class.
 */

import { describe, it, expect } from "vitest";
import TransactionalValue from "../../src/TransactionalValue.js";

// Test all getter/setter methods in the TransactionalValue class.
describe("TransactionalValue getter/setters", () => {
  // Test TransactionalValue value.
  describe("value", () => {
    // Test that value gets the current value.
    it("should get the current value", () => {
      const value = new TransactionalValue(1);

      expect(value.value).toBe(1);
    });

    // Test that value sets the current value.
    it("should set the current value", () => {
      const value = new TransactionalValue(1);

      value.value = 2;

      expect(value.value).toBe(2);
    });
  });

  // Test TransactionalValue committed.
  describe("committed", () => {
    // Test that committed gets the committed value.
    it("should get the committed value", () => {
      const value = new TransactionalValue("initial");

      expect(value.committed).toBe("initial");
    });

    // Test that committed cannot be set manually.
    it("should not set the committed value", () => {
      const value = new TransactionalValue("initial");

      expect(() => {
        value.committed = "updated";
      }).toThrowError(
        "Cannot set property committed of #<TransactionalValue> which has only a getter"
      );
    });
  });

  // Test TransactionalValue isDirty.
  describe("isDirty", () => {
    // Test that isDirty gets the dirty state.
    it("should get the dirty state", () => {
      const value = new TransactionalValue("initial");

      value.value = "updated";

      expect(value.isDirty).toBe(true);
    });

    // Test that isDirty cannot be set manually.
    it("should not set the dirty state", () => {
      const value = new TransactionalValue("initial");

      expect(() => {
        value.isDirty = true;
      }).toThrowError(
        "Cannot set property isDirty of #<TransactionalValue> which has only a getter"
      );
    });
  });
});
