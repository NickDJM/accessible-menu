/**
 * Tests for the TransactionalValue class.
 */

import { describe, it, expect, vi } from "vitest";
import TransactionalValue from "../../src/TransactionalValue.js";

describe("TransactionalValue", () => {
  describe("initialization", () => {
    it("should set current and committed to the initial value", () => {
      const value = new TransactionalValue("Nick");

      expect(value.value).toBe("Nick");
      expect(value.committed).toBe("Nick");
      expect(value.isDirty).toBe(false);
    });
  });

  describe("value", () => {
    it("should update the current value", () => {
      const value = new TransactionalValue(1);

      value.value = 2;

      expect(value.value).toBe(2);
      expect(value.committed).toBe(1);
      expect(value.isDirty).toBe(true);
    });
  });

  describe("commit", () => {
    it("should commit the current value and clear dirty state", () => {
      const value = new TransactionalValue(1);
      value.value = 2;

      const result = value.commit();

      expect(result).toBe(value);
      expect(value.committed).toBe(2);
      expect(value.isDirty).toBe(false);
    });
  });

  describe("reset", () => {
    it("should reset the current value to the committed value", () => {
      const value = new TransactionalValue("initial");
      value.value = "updated";

      const result = value.reset();

      expect(result).toBe(value);
      expect(value.value).toBe("initial");
      expect(value.isDirty).toBe(false);
    });
  });

  describe("update", () => {
    it("should apply a functional update to the current value", () => {
      const value = new TransactionalValue(2);

      const result = value.update((current) => current + 1);

      expect(result).toBe(value);
      expect(value.value).toBe(3);
      expect(value.committed).toBe(2);
      expect(value.isDirty).toBe(true);
    });
  });

  describe("equals", () => {
    it("should use the custom equality comparator", () => {
      const equals = vi.fn(
        (left, right) =>
          String(left).toLowerCase() === String(right).toLowerCase()
      );
      const value = new TransactionalValue("Nick", { equals });

      value.value = "nick";

      expect(equals).toHaveBeenCalled();
      expect(value.isDirty).toBe(false);
    });
  });
});
