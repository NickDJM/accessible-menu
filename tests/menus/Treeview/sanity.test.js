/**
 * Test the Treeview class to make sure it "just works".
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { singleLevelSanity, twoLevelSanity } from "../_common/sanity";

singleLevelSanity(Treeview);
twoLevelSanity(Treeview);
