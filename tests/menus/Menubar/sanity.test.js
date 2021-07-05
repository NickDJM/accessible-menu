/**
 * Test the Menubar class to make sure it "just works".
 *
 * @jest-environment jsdom
 */

import { Menubar } from "../../../index";
import { sanity } from "../_common/sanity";

sanity(Menubar);
