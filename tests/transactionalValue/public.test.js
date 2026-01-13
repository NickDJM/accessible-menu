/**
 * Tests for public methods of the TransactionalValue class.
 */

import { describe, it, expect, vi } from "vitest";
import TransactionalValue from "../../src/TransactionalValue.js";

// Test TransactionalValue public methods.
describe("TransactionalValue public methods", () => {
  // Test TransactionalValue commit().
  describe("commit", () => {
    // Test that commit updates the committed value.
    it("should commit the current value", () => {
      const value = new TransactionalValue(1);
      value.value = 2;

      const result = value.commit();

      expect(result).toBe(value);
      expect(value.committed).toBe(2);
      expect(value.isDirty).toBe(false);
    });
  });

  // Test TransactionalValue reset().
  describe("reset", () => {
    // Test that reset restores the committed value.
    it("should reset the current value to the committed value", () => {
      const value = new TransactionalValue("initial");
      value.value = "updated";

      const result = value.reset();

      expect(result).toBe(value);
      expect(value.value).toBe("initial");
      expect(value.isDirty).toBe(false);
    });
  });

  // Test TransactionalValue update().
  describe("update", () => {
    // Test that update applies a functional update.
    it("should update the current value with a function", () => {
      const value = new TransactionalValue(2);

      const result = value.update((current) => current + 1);

      expect(result).toBe(value);
      expect(value.value).toBe(3);
      expect(value.committed).toBe(2);
      expect(value.isDirty).toBe(true);
    });
  });

  // Test TransactionalValue equals.
  describe("equals", () => {
    // Test that equals is used to determine dirty state.
    it("should use the custom equality comparator", () => {
      const equals = vi.fn(
        (left, right) =>
          String(left).toLowerCase() === String(right).toLowerCase()
      );
      const value = new TransactionalValue("Test", { equals });

      value.value = "test";

      expect(value.isDirty).toBe(false);
      expect(equals).toHaveBeenCalled();
    });
  });
});
