/**
 * Test the DisclosureMenu class's internal methods.
 *
 * @jest-environment jsdom
 */

import { DisclosureMenu } from "../../../index";
import { setDOMElements, resetDOMElements } from "../_common/internal";

setDOMElements(DisclosureMenu);
resetDOMElements(DisclosureMenu);
