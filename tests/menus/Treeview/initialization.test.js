/**
 * Test the Treeview class to make sure it can initialize under various scenarios.
 */

import { Treeview } from "../../../index";
import {
  defaultInitialization,
  controlledMenu,
  customizedMenu,
} from "../_common/initialize";

defaultInitialization(Treeview);
controlledMenu(Treeview);
customizedMenu(Treeview);
