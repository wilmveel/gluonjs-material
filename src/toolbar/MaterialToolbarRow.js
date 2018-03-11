import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCToolbarFoundation, util} from "@material/toolbar";

import ToolbarStyle from "@material/toolbar/mdc-toolbar";

class MaterialToolbarRow extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      ToolbarStyle.host,
      ToolbarStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-toolbar__row',
    ]
  }

}

customElements.define(MaterialToolbarRow.is, MaterialToolbarRow);