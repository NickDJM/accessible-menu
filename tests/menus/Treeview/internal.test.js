/**
 * Test the Treeview class's internal methods.
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { setDOMElements, resetDOMElements } from "../_common/internal";

setDOMElements(Treeview);
resetDOMElements(Treeview);
