/**
 * Test the Menubar class's internal methods.
 *
 * @jest-environment jsdom
 */

import { Menubar } from "../../../index";
import { setDOMElements, resetDOMElements } from "../_common/internal";

setDOMElements(Menubar);
resetDOMElements(Menubar);
