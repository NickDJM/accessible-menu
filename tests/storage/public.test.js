/**
 * Tests for public methods of the StorageManager class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import StorageManager from "../../src/StorageManager.js";

const scope = "TestStorage";

beforeEach(() => {
  delete window[scope];
});

afterEach(() => {
  delete window[scope];
});

// Test StorageManager public methods.
describe("StorageManager public methods", () => {
  // Test StorageManager get().
  describe("get", () => {
    // Test that get returns a type's data.
    it("should return the storage for a given type", () => {
      const storage = new StorageManager({ scope, type: "menus" });
      const data = { main: { id: 1 } };
      storage.set({ data });

      expect(storage.get()).toEqual(data);
    });

    // Test that get returns data for a key.
    it("should return the data for a given key", () => {
      const storage = new StorageManager({ scope, type: "menus" });
      const data = { id: 1 };
      storage.set({ key: "main", data });

      expect(storage.get({ key: "main" })).toEqual(data);
    });

    // Test that get throws an error if the type is not initialized.
    it("should throw an error if the type is not initialized", () => {
      const storage = new StorageManager({ scope, type: "menus" });

      expect(() => {
        storage.get();
      }).toThrowError(
        'StorageManager (TestStorage): Type "menus" is not initialized.'
      );
    });
  });

  // Test StorageManager set().
  describe("set", () => {
    // Test that set creates a type when no key is provided.
    it("should set data for a type when no key is provided", () => {
      const storage = new StorageManager({ scope });
      const data = { id: 1 };
      storage.set({ data });

      expect(storage.storage._default).toEqual(data);
    });

    // Test that set creates a key/value pair when a key is provided.
    it("should set data for a key when a key is provided", () => {
      const storage = new StorageManager({ scope, type: "menus" });
      const data = { id: 1 };
      storage.set({ key: "main", data });

      expect(storage.storage.menus.main).toEqual(data);
    });

    // Test that set can add multiple keys to the same type.
    it("should add additional data to an existing type", () => {
      const storage = new StorageManager({ scope, type: "menus" });
      const mainMenu = { id: 1 };
      const sideMenu = { id: 2 };
      storage.set({ key: "main", data: mainMenu });
      storage.set({ key: "side", data: sideMenu });

      expect(storage.storage.menus).toEqual({
        main: mainMenu,
        side: sideMenu,
      });
    });
  });

  // Test StorageManager clear().
  describe("clear", () => {
    // Test that clear deletes a specific key's data.
    it("should clear data for a given key", () => {
      const storage = new StorageManager({ scope, type: "menus" });
      storage.set({ key: "main", data: { id: 1 } });
      storage.set({ key: "side", data: { id: 2 } });

      storage.clear({ key: "main" });

      expect(storage.storage.menus.main).toBeUndefined();
      expect(storage.storage.menus.side).toEqual({ id: 2 });
    });

    // Test that clear deletes a type's data.
    it("should clear data for a given type", () => {
      const storage = new StorageManager({ scope, type: "menus" });
      storage.set({ data: { main: { id: 1 } } });

      storage.clear();

      expect(storage.storage.menus).toBeUndefined();
    });
  });

  // Test StorageManager dispose().
  describe("dispose", () => {
    // Test that dispose removes the storage object.
    it("should remove the storage object from the instance", () => {
      const storage = new StorageManager({ scope });
      storage.set({ data: { id: 1 } });

      storage.dispose();

      expect(storage._storage).toBeUndefined();
    });
  });
});
