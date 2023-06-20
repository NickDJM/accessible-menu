/**
 * Tests for the keyPress() function.
 */

import { describe, it, expect } from "vitest";
import { keyPress } from "../../src/eventHandlers.js";

describe("keyPress", () => {
  // Test the Enter key.
  it("should return Enter when the Enter key is pressed", () => {
    const event = { key: "Enter" };

    expect(keyPress(event)).toBe("Enter");
  });
  it("should return Enter when the Enter key code is pressed", () => {
    const event = { keyCode: 13 };

    expect(keyPress(event)).toBe("Enter");
  });

  // Test the Space key.
  it("should return Space when the Space key is pressed", () => {
    const event = { key: " " };

    expect(keyPress(event)).toBe("Space");
  });
  it("should return Space when the Spacebar key is pressed", () => {
    const event = { key: "Spacebar" };

    expect(keyPress(event)).toBe("Space");
  });
  it("should return Space when the Space key code is pressed", () => {
    const event = { keyCode: 32 };

    expect(keyPress(event)).toBe("Space");
  });

  // Test the Escape key.
  it("should return Escape when the Escape key is pressed", () => {
    const event = { key: "Escape" };

    expect(keyPress(event)).toBe("Escape");
  });
  it("should return Escape when the Esc key is pressed", () => {
    const event = { key: "Esc" };

    expect(keyPress(event)).toBe("Escape");
  });
  it("should return Escape when the Escape key code is pressed", () => {
    const event = { keyCode: 27 };

    expect(keyPress(event)).toBe("Escape");
  });

  // Test the ArrowUp key.
  it("should return ArrowUp when the ArrowUp key is pressed", () => {
    const event = { key: "ArrowUp" };

    expect(keyPress(event)).toBe("ArrowUp");
  });
  it("should return ArrowUp when the Up key is pressed", () => {
    const event = { key: "Up" };

    expect(keyPress(event)).toBe("ArrowUp");
  });
  it("should return ArrowUp when the ArrowUp key code is pressed", () => {
    const event = { keyCode: 38 };

    expect(keyPress(event)).toBe("ArrowUp");
  });

  // Test the ArrowRight key.
  it("should return ArrowRight when the ArrowRight key is pressed", () => {
    const event = { key: "ArrowRight" };

    expect(keyPress(event)).toBe("ArrowRight");
  });
  it("should return ArrowRight when the Right key is pressed", () => {
    const event = { key: "Right" };

    expect(keyPress(event)).toBe("ArrowRight");
  });
  it("should return ArrowRight when the ArrowRight key code is pressed", () => {
    const event = { keyCode: 39 };

    expect(keyPress(event)).toBe("ArrowRight");
  });

  // Test the ArrowDown key.
  it("should return ArrowDown when the ArrowDown key is pressed", () => {
    const event = { key: "ArrowDown" };

    expect(keyPress(event)).toBe("ArrowDown");
  });
  it("should return ArrowDown when the Down key is pressed", () => {
    const event = { key: "Down" };

    expect(keyPress(event)).toBe("ArrowDown");
  });
  it("should return ArrowDown when the ArrowDown key code is pressed", () => {
    const event = { keyCode: 40 };

    expect(keyPress(event)).toBe("ArrowDown");
  });

  // Test the ArrowLeft key.
  it("should return ArrowLeft when the ArrowLeft key is pressed", () => {
    const event = { key: "ArrowLeft" };

    expect(keyPress(event)).toBe("ArrowLeft");
  });
  it("should return ArrowLeft when the Left key is pressed", () => {
    const event = { key: "Left" };

    expect(keyPress(event)).toBe("ArrowLeft");
  });
  it("should return ArrowLeft when the ArrowLeft key code is pressed", () => {
    const event = { keyCode: 37 };

    expect(keyPress(event)).toBe("ArrowLeft");
  });

  // Test the Home key.
  it("should return Home when the Home key is pressed", () => {
    const event = { key: "Home" };

    expect(keyPress(event)).toBe("Home");
  });
  it("should return Home when the Home key code is pressed", () => {
    const event = { keyCode: 36 };

    expect(keyPress(event)).toBe("Home");
  });

  // Test the End key.
  it("should return End when the End key is pressed", () => {
    const event = { key: "End" };

    expect(keyPress(event)).toBe("End");
  });
  it("should return End when the End key code is pressed", () => {
    const event = { keyCode: 35 };

    expect(keyPress(event)).toBe("End");
  });

  // Test the Tab key.
  it("should return Tab when the Tab key is pressed", () => {
    const event = { key: "Tab" };

    expect(keyPress(event)).toBe("Tab");
  });
  it("should return Tab when the Tab key code is pressed", () => {
    const event = { keyCode: 9 };

    expect(keyPress(event)).toBe("Tab");
  });

  // Test the Asterisk key.
  it("should return Asterisk when the Asterisk key is pressed", () => {
    const event = { key: "*" };

    expect(keyPress(event)).toBe("Asterisk");
  });
  it("should return Asterisk when the Asterisk key code is pressed", () => {
    const event = { keyCode: 56 };

    expect(keyPress(event)).toBe("Asterisk");
  });

  // Test all character keys (A through Z both lowercase and captial).
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  it.each(characters.split(""))(
    "should return Character when the %s key is pressed",
    (character) => {
      const event = { key: character };

      expect(keyPress(event)).toBe("Character");
    }
  );

  // Test an unsupported key.
  it("should return an empty string when an unsupported key is pressed", () => {
    const event = { key: "~" };

    expect(keyPress(event)).toBe("");
  });
});
