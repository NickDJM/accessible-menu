/**
 * Tests for the preventEvent() function.
 */

import { describe, it, expect, vi } from "vitest";
import { preventEvent } from "../../src/eventHandlers.js";

describe("preventEvent", () => {
  // Make sure the event is prevented.
  it("should prevent the default action and stop propagation.", () => {
    const event = { preventDefault: vi.fn(), stopPropagation: vi.fn() };

    preventEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
