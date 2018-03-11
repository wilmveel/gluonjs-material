import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCTemporaryDrawerFoundation} from "@material/drawer/temporary";

import DrawerTemporaryStyle from "@material/drawer/temporary/mdc-temporary-drawer";

class MaterialDrawer extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.host,
      DrawerTemporaryStyle.host,
      DrawerTemporaryStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-drawer__drawer',
    ]
  }



}

customElements.define(MaterialDrawer.is, MaterialDrawer);
