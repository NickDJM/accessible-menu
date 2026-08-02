/**
 * Getter/Setter tests for the StorageManager class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import StorageManager from "../../src/StorageManager.js";
import * as validation from "../../src/validate.js";

const scope = "TestStorage";

beforeEach(() => {
  delete window[scope];
});

afterEach(() => {
  delete window[scope];
  vi.restoreAllMocks();
});

// Test StorageManager getter/setters.
describe("StorageManager getter/setters", () => {
  // Test StorageManager scope.
  describe("scope", () => {
    // Test that scope gets the scope value.
    it("should get the storage scope", () => {
      const storage = new StorageManager({ scope, initialize: false });

      expect(storage.scope).toBe(storage._scope);
    });

    // Test that scope cannot be set.
    it("should not set the storage scope", () => {
      const storage = new StorageManager({ scope, initialize: false });

      expect(() => {
        storage.scope = "NewScope";
      }).toThrow();
    });
  });

  // Test StorageManager type.
  describe("type", () => {
    // Test that type gets the type value.
    it("should get the storage type", () => {
      const storage = new StorageManager({ scope, initialize: false });

      expect(storage.type).toBe(storage._type);
    });

    // Test that type can be set.
    it("should set the storage type", () => {
      const storage = new StorageManager({ scope, initialize: false });
      const spy = vi.spyOn(validation, "isValidType");

      storage.type = "custom";

      expect(spy).toHaveBeenCalledWith("string", { type: "custom" });
      expect(storage._type).toBe("custom");
    });
  });

  // Test StorageManager storage.
  describe("storage", () => {
    // Test that storage gets the storage object.
    it("should get the storage object", () => {
      const storage = new StorageManager({ scope, initialize: false });

      expect(storage.storage).toBe(storage._storage);
    });

    // Test that storage cannot be set.
    it("should not set the storage object", () => {
      const storage = new StorageManager({ scope, initialize: false });

      expect(() => {
        storage.storage = {};
      }).toThrow();
    });
  });
});
