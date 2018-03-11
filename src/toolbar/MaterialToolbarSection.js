import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCToolbarFoundation, util} from "@material/toolbar";

import ToolbarStyle from "@material/toolbar/mdc-toolbar";

class MaterialToolbarSection extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      ToolbarStyle.host,
      ToolbarStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-toolbar__section',
      'mdc-toolbar__section--align-start'
    ]
  }

}

customElements.define(MaterialToolbarSection.is, MaterialToolbarSection);