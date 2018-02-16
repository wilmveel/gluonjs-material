import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCTemporaryDrawerFoundation, util} from "@material/drawer/temporary";

import DrawerTemporaryStyle from "@material/drawer/temporary/mdc-temporary-drawer";

class MaterialDrawerHeaderContent extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.host,
      DrawerTemporaryStyle.host,
      DrawerTemporaryStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-drawer__header-content',
    ]
  }

}

customElements.define(MaterialDrawerHeaderContent.is, MaterialDrawerHeaderContent);
