/**
 * Test the Treeview class for proper ARIA attributes.
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { aria } from "../_common/aria";

aria(Treeview);
