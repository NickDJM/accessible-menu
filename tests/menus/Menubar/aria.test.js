/**
 * Test the Menubar class for proper ARIA attributes.
 *
 * @jest-environment jsdom
 */

import { Menubar } from "../../../index";
import { aria } from "../_common/aria";

aria(Menubar);
