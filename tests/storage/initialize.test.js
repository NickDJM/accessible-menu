/**
 * Initialization tests for the StorageManager class.
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

// Test StorageManager initialization.
describe("StorageManager initialization", () => {
  // Test that the storage is registered on the window.
  it("should register itself on the window using the provided scope", () => {
    const storage = new StorageManager({ scope });

    expect(window[scope]).toBe(storage);
  });

  // Test that storage can be initialized manually.
  it("should not register on the window when initialize is false", () => {
    const storage = new StorageManager({ scope, initialize: false });

    expect(window[scope]).toBeUndefined();

    storage.initialize();

    expect(window[scope]).toBe(storage);
  });

  // Test that storage sets the default type.
  it('should initialize with the default type of "_default"', () => {
    const storage = new StorageManager({ scope });

    expect(storage.type).toBe("_default");
  });

  // Test that storage sets a custom type.
  it("should initialize with a provided type", () => {
    const storage = new StorageManager({ scope, type: "menus" });

    expect(storage.type).toBe("menus");
  });
});
