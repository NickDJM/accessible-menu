/**
 * Test the DisclosureMenu class for proper ARIA attributes.
 *
 * @jest-environment jsdom
 */

import { DisclosureMenu } from "../../../index";
import { aria } from "../_common/aria";

aria(DisclosureMenu);
