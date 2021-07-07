/**
 * Test the Treeview class to make sure it functions correctly.
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { openClose } from "../_common/functional";

openClose(Treeview);
