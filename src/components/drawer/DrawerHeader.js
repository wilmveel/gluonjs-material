import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCTemporaryDrawerFoundation, util} from "@material/drawer/temporary";

import DrawerTemporaryStyle from "@material/drawer/temporary/mdc-temporary-drawer";

class MaterialDrawerHeader extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.host,
      DrawerTemporaryStyle.host,
      DrawerTemporaryStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-drawer__header',
    ]
  }

}

customElements.define(MaterialDrawerHeader.is, MaterialDrawerHeader);
