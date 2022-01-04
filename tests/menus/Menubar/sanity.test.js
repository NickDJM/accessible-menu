/**
 * Test the Menubar class to make sure it "just works".
 */

import { Menubar } from "../../../index";
import { singleLevelSanity, twoLevelSanity } from "../_common/sanity";

singleLevelSanity(Menubar);
twoLevelSanity(Menubar);
