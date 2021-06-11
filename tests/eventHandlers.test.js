/**
 * Test the eventHandler.js functions to make sure the expected values are returned.
 */

import { keyPress } from "../src/eventHandlers.js";

// Keys for keyPress().
const keys = [
  // Enter keys.
  { key: "Enter", expected: "Enter" },
  { key: 13, expected: "Enter" },
  // Space keys.
  { key: " ", expected: "Space" },
  { key: "Spacebar", expected: "Space" },
  { key: 32, expected: "Space" },
  // Escape keys.
  { key: "Escape", expected: "Escape" },
  { key: "Esc", expected: "Escape" },
  { key: 27, expected: "Escape" },
  // ArrowUp keys.
  { key: "ArrowUp", expected: "ArrowUp" },
  { key: "Up", expected: "ArrowUp" },
  { key: 38, expected: "ArrowUp" },
  // ArrowRight keys.
  { key: "ArrowRight", expected: "ArrowRight" },
  { key: "Right", expected: "ArrowRight" },
  { key: 39, expected: "ArrowRight" },
  // ArrowDown keys.
  { key: "ArrowDown", expected: "ArrowDown" },
  { key: "Down", expected: "ArrowDown" },
  { key: 40, expected: "ArrowDown" },
  // ArrowLeft keys.
  { key: "ArrowLeft", expected: "ArrowLeft" },
  { key: "Left", expected: "ArrowLeft" },
  { key: 37, expected: "ArrowLeft" },
  // Home keys.
  { key: "Home", expected: "Home" },
  { key: 36, expected: "Home" },
  // End keys.
  { key: "End", expected: "End" },
  { key: 35, expected: "End" },
  // Tab keys.
  { key: "Tab", expected: "Tab" },
  { key: 9, expected: "Tab" },
  // Asterisk keys.
  { key: "*", expected: "Asterisk" },
  { key: 56, expected: "Asterisk" },
  // Character keys.
  { key: "a", expected: "Character" },
  { key: "A", expected: "Character" },
  { key: "b", expected: "Character" },
  { key: "B", expected: "Character" },
  { key: "c", expected: "Character" },
  { key: "C", expected: "Character" },
  { key: "d", expected: "Character" },
  { key: "D", expected: "Character" },
  { key: "e", expected: "Character" },
  { key: "E", expected: "Character" },
  { key: "f", expected: "Character" },
  { key: "F", expected: "Character" },
  { key: "g", expected: "Character" },
  { key: "G", expected: "Character" },
  { key: "h", expected: "Character" },
  { key: "H", expected: "Character" },
  { key: "i", expected: "Character" },
  { key: "I", expected: "Character" },
  { key: "j", expected: "Character" },
  { key: "J", expected: "Character" },
  { key: "k", expected: "Character" },
  { key: "K", expected: "Character" },
  { key: "l", expected: "Character" },
  { key: "L", expected: "Character" },
  { key: "m", expected: "Character" },
  { key: "M", expected: "Character" },
  { key: "n", expected: "Character" },
  { key: "N", expected: "Character" },
  { key: "o", expected: "Character" },
  { key: "O", expected: "Character" },
  { key: "p", expected: "Character" },
  { key: "P", expected: "Character" },
  { key: "q", expected: "Character" },
  { key: "Q", expected: "Character" },
  { key: "r", expected: "Character" },
  { key: "R", expected: "Character" },
  { key: "s", expected: "Character" },
  { key: "S", expected: "Character" },
  { key: "t", expected: "Character" },
  { key: "T", expected: "Character" },
  { key: "u", expected: "Character" },
  { key: "U", expected: "Character" },
  { key: "v", expected: "Character" },
  { key: "V", expected: "Character" },
  { key: "w", expected: "Character" },
  { key: "W", expected: "Character" },
  { key: "x", expected: "Character" },
  { key: "X", expected: "Character" },
  { key: "y", expected: "Character" },
  { key: "Y", expected: "Character" },
  { key: "z", expected: "Character" },
  { key: "Z", expected: "Character" },
  // Unsupported key.
  { key: "~", expected: "" },
];

// Test keyPress().
test.each(keys)("Key value '$key' returns '$expected'", ({ key, expected }) => {
  expect(keyPress({ key })).toBe(expected);
});
