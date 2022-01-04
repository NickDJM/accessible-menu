/**
 * Test the DisclosureMenu class to make sure it "just works".
 */

import { DisclosureMenu } from "../../../index";
import { singleLevelSanity, twoLevelSanity } from "../_common/sanity";

singleLevelSanity(DisclosureMenu);
twoLevelSanity(DisclosureMenu);
