/**
 * Test the TopLinkDisclosureMenu class to make sure it "just works".
 */

import { TopLinkDisclosureMenu } from "../../../index";
import { singleLevelSanity, twoLevelSanity } from "../_common/sanity";

singleLevelSanity(TopLinkDisclosureMenu);
twoLevelSanity(TopLinkDisclosureMenu);
