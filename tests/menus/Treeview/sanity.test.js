/**
 * Test the Treeview class to make sure it "just works".
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { sanity } from "../_common/sanity";

sanity(Treeview);
