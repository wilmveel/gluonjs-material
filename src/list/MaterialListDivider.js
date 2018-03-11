import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import ListStyle from "@material/list/mdc-list";

class MaterialListDivider extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      ListStyle.host,
      ListStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-list-divider'
    ]
  }
}

customElements.define(MaterialListDivider.is, MaterialListDivider);