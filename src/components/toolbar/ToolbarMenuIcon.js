import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import ToolbarStyle from "@material/toolbar/mdc-toolbar";

class MaterialToolbarMenuIcon extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      ToolbarStyle.host,
      ToolbarStyle.slotted
    ]
  }

  get classes() {
    return [
      'material-icons',
      'mdc-toolbar__menu-icon'
    ]
  }

}

customElements.define(MaterialToolbarMenuIcon.is, MaterialToolbarMenuIcon);