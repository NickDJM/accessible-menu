/**
 * Test the Menubar class to make sure it can initialize under various scenarios.
 */

import { Menubar } from "../../../index";
import {
  defaultInitialization,
  controlledMenu,
  customizedMenu,
} from "../_common/initialize";

defaultInitialization(Menubar);
controlledMenu(Menubar);
customizedMenu(Menubar);
