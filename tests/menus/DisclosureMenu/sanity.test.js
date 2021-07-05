/**
 * Test the DisclosureMenu class to make sure it "just works".
 *
 * @jest-environment jsdom
 */

import { DisclosureMenu } from "../../../index";
import { singleLevelSanity, twoLevelSanity } from "../_common/sanity";

singleLevelSanity(DisclosureMenu);
twoLevelSanity(DisclosureMenu);
