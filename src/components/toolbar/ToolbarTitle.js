import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import ToolbarStyle from "@material/toolbar/mdc-toolbar";

class MaterialToolbarTitle extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      ToolbarStyle.host,
      ToolbarStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-toolbar__title'
    ]
  }

}

customElements.define(MaterialToolbarTitle.is, MaterialToolbarTitle);