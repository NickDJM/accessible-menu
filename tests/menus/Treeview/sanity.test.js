/**
 * Test the Treeview class to make sure it "just works".
 */

import { Treeview } from "../../../index";
import { singleLevelSanity, twoLevelSanity } from "../_common/sanity";

singleLevelSanity(Treeview);
twoLevelSanity(Treeview);
