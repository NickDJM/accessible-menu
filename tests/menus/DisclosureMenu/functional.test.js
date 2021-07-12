/**
 * Test the DisclosureMenu class to make sure it functions correctly.
 *
 * @jest-environment jsdom
 */

import { DisclosureMenu } from "../../../index";
import {
  openClose,
  clickTests,
  hoverTests,
  baseKeypressTests,
} from "../_common/functional";

openClose(DisclosureMenu);
clickTests(DisclosureMenu);
hoverTests(DisclosureMenu);
baseKeypressTests(DisclosureMenu);
