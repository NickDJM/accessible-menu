/**
 * Test the Treeview class to make sure it functions correctly.
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { openClose, clickTests } from "../_common/functional";

openClose(Treeview);
clickTests(Treeview);
